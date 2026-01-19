'use client';

import { useEffect, useRef, useCallback } from 'react';

// Simple counter-based unique ID generator
let idCounter = 0;
export function generateUniqueId(prefix: string = 'modal'): string {
  return `${prefix}-${++idCounter}-${Date.now()}`;
}

/**
 * Hook to manage focus trapping within a modal
 */
export function useFocusTrap(
  isOpen: boolean,
  enabled: boolean = true,
  containerRef: React.RefObject<HTMLElement | null>,
) {
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled || !isOpen) return;

    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    const getFocusableElements = () => {
      const selector =
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
      return Array.from(container.querySelectorAll(selector)) as HTMLElement[];
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [isOpen, enabled, containerRef]);
}

/**
 * Hook to announce state changes to screen readers
 */
export function useScreenReaderAnnouncement() {
  const announcerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const announcer = document.createElement('div');
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.overflow = 'hidden';
    document.body.appendChild(announcer);
    announcerRef.current = announcer;

    return () => {
      if (announcerRef.current) {
        document.body.removeChild(announcerRef.current);
      }
    };
  }, []);

  const announce = useCallback((message: string) => {
    if (announcerRef.current) {
      announcerRef.current.textContent = '';
      setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = message;
        }
      }, 100);
    }
  }, []);

  return announce;
}
