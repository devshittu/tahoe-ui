// src/app/playground/section-nav/components/useScrollSpy.ts
'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import type {
  SectionItem,
  SectionVisibility,
  UseScrollSpyReturn,
  UseScrollSpyOptions,
} from './types';

/**
 * useScrollSpy - Observes page sections and tracks scroll position
 *
 * Features:
 * - True IntersectionObserver-based section detection
 * - Accurate scroll progress calculation
 * - Scroll-to-section with configurable offset
 * - Debounced scroll state tracking
 * - Handles dynamic section positions (resize-aware)
 *
 * Design Principles Applied:
 * - #7 Intuitive Interaction: Natural scroll-based highlighting
 * - #13 Predictable Navigation: Clear position awareness
 * - #19 Immediate Feedback: Real-time progress updates
 *
 * @example
 * ```tsx
 * const { activeSection, progress, scrollToSection } = useScrollSpy({
 *   sections: [
 *     { id: 'intro', label: 'Introduction', target: 'intro-section' },
 *     { id: 'features', label: 'Features', target: 'features-section' },
 *   ],
 *   onSectionChange: (section) => console.log('Now viewing:', section?.label),
 * });
 * ```
 */
export function useScrollSpy(options: UseScrollSpyOptions): UseScrollSpyReturn {
  const {
    sections,
    root = null,
    // Bias toward top of viewport - section entering top 20-60% is "active"
    rootMargin = '-20% 0px -60% 0px',
    threshold = 0.3,
    scrollBehavior = 'smooth',
    scrollOffset = 0,
    scrollDebounce = 50,
    onSectionChange,
  } = options;

  // State
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [visibilityMap, setVisibilityMap] = useState<
    Map<string, SectionVisibility>
  >(new Map());
  const [progress, setProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Refs
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousSectionRef = useRef<SectionItem | null>(null);
  const sectionElementsRef = useRef<Map<string, Element>>(new Map());

  // Memoize sections lookup
  const sectionsById = useMemo(() => {
    const map = new Map<string, SectionItem>();
    sections.forEach((section) => map.set(section.id, section));
    return map;
  }, [sections]);

  // Get active section object
  const activeSection = useMemo(() => {
    if (!activeSectionId) return null;
    return sectionsById.get(activeSectionId) || null;
  }, [activeSectionId, sectionsById]);

  /**
   * Calculate scroll progress through all sections
   */
  const calculateProgress = useCallback(() => {
    if (sections.length === 0) return 0;

    const elements = sectionElementsRef.current;
    if (elements.size === 0) return 0;

    // Get all section positions
    const positions: { id: string; top: number; bottom: number }[] = [];
    sections.forEach((section) => {
      const el = elements.get(section.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const scrollY = window.scrollY;
        positions.push({
          id: section.id,
          top: rect.top + scrollY,
          bottom: rect.bottom + scrollY,
        });
      }
    });

    if (positions.length === 0) return 0;

    // Sort by position
    positions.sort((a, b) => a.top - b.top);

    const firstTop = positions[0].top;
    const lastBottom = positions[positions.length - 1].bottom;
    const totalHeight = lastBottom - firstTop;

    if (totalHeight <= 0) return 0;

    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    // Consider progress based on where the viewport center is
    const viewportCenter = scrollY + viewportHeight * 0.4;

    const scrollProgress = (viewportCenter - firstTop) / totalHeight;
    return Math.max(0, Math.min(1, scrollProgress));
  }, [sections]);

  /**
   * Determine section position relative to viewport
   */
  const getSectionPosition = useCallback(
    (rect: DOMRectReadOnly): 'above' | 'visible' | 'below' => {
      const viewportHeight = window.innerHeight;
      const topThreshold = viewportHeight * 0.2;
      const bottomThreshold = viewportHeight * 0.6;

      if (rect.bottom < topThreshold) return 'above';
      if (rect.top > bottomThreshold) return 'below';
      return 'visible';
    },
    [],
  );

  /**
   * Handle intersection changes
   */
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const updates = new Map<string, SectionVisibility>();

      entries.forEach((entry) => {
        const sectionId = entry.target.getAttribute('data-section-id');
        if (!sectionId) return;

        const visibility: SectionVisibility = {
          id: sectionId,
          visibility: entry.intersectionRatio,
          isActive:
            entry.isIntersecting && entry.intersectionRatio >= threshold,
          position: getSectionPosition(entry.boundingClientRect),
        };

        updates.set(sectionId, visibility);
      });

      // Merge with existing visibility map
      setVisibilityMap((prev) => {
        const next = new Map(prev);
        updates.forEach((value, key) => next.set(key, value));
        return next;
      });

      // Determine active section
      // Priority: visible section with highest visibility
      let bestCandidate: { id: string; visibility: number } | null = null;

      entries.forEach((entry) => {
        const sectionId = entry.target.getAttribute('data-section-id');
        if (!sectionId) return;

        if (entry.isIntersecting) {
          if (
            !bestCandidate ||
            entry.intersectionRatio > bestCandidate.visibility
          ) {
            bestCandidate = {
              id: sectionId,
              visibility: entry.intersectionRatio,
            };
          }
        }
      });

      // If we found a visible section, update active
      if (bestCandidate) {
        setActiveSectionId((prev) => {
          if (prev !== bestCandidate!.id) {
            // Trigger callback
            const newSection = sectionsById.get(bestCandidate!.id) || null;
            const prevSection = previousSectionRef.current;

            if (onSectionChange && newSection !== prevSection) {
              onSectionChange(newSection, prevSection);
              previousSectionRef.current = newSection;
            }

            return bestCandidate!.id;
          }
          return prev;
        });
      }

      // Update progress
      setProgress(calculateProgress());
    },
    [
      threshold,
      getSectionPosition,
      sectionsById,
      onSectionChange,
      calculateProgress,
    ],
  );

  /**
   * Handle scroll events for progress and scrolling state
   */
  const handleScroll = useCallback(() => {
    setIsScrolling(true);
    setProgress(calculateProgress());

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set scrolling to false after debounce
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, scrollDebounce);
  }, [calculateProgress, scrollDebounce]);

  /**
   * Setup IntersectionObserver and find section elements
   */
  useEffect(() => {
    // Clean up existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Clear element cache
    sectionElementsRef.current.clear();

    // Find all section elements
    sections.forEach((section) => {
      // Try to find by ID first, then by data attribute
      let element = document.getElementById(section.target);
      if (!element) {
        element = document.querySelector(`[data-section="${section.target}"]`);
      }
      if (!element) {
        element = document.querySelector(`[data-section-id="${section.id}"]`);
      }

      if (element) {
        // Ensure element has section ID for observer callback
        element.setAttribute('data-section-id', section.id);
        sectionElementsRef.current.set(section.id, element);
      }
    });

    // If no elements found, bail
    if (sectionElementsRef.current.size === 0) {
      return;
    }

    // Create observer
    observerRef.current = new IntersectionObserver(handleIntersection, {
      root,
      rootMargin,
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    });

    // Observe all section elements
    sectionElementsRef.current.forEach((element) => {
      observerRef.current?.observe(element);
    });

    // Initial progress calculation
    setProgress(calculateProgress());

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [
    sections,
    root,
    rootMargin,
    handleIntersection,
    handleScroll,
    calculateProgress,
  ]);

  /**
   * Scroll to a specific section
   */
  const scrollToSection = useCallback(
    (sectionId: string, options?: ScrollToOptions) => {
      const element = sectionElementsRef.current.get(sectionId);
      if (!element) {
        console.warn(`Section element not found: ${sectionId}`);
        return;
      }

      const rect = element.getBoundingClientRect();
      const scrollY = window.scrollY;
      const targetY = rect.top + scrollY - scrollOffset;

      window.scrollTo({
        top: targetY,
        behavior: options?.behavior ?? scrollBehavior,
      });
    },
    [scrollBehavior, scrollOffset],
  );

  /**
   * Refresh section positions (call after layout changes)
   */
  const refresh = useCallback(() => {
    // Recalculate positions
    setProgress(calculateProgress());

    // Re-trigger intersection observation by disconnecting and reconnecting
    if (observerRef.current) {
      observerRef.current.disconnect();
      sectionElementsRef.current.forEach((element) => {
        observerRef.current?.observe(element);
      });
    }
  }, [calculateProgress]);

  return {
    activeSection,
    activeSectionId,
    visibilityMap,
    progress,
    isScrolling,
    scrollToSection,
    refresh,
  };
}

export default useScrollSpy;
