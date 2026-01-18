// src/hooks/useFocusTrap.ts
'use client';

import { useRef, useEffect, useCallback } from 'react';

/**
 * Focusable element selector
 */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
].join(',');

export interface UseFocusTrapOptions {
  /** Enable/disable the trap */
  enabled?: boolean;
  /** Auto-focus first focusable element on mount */
  autoFocus?: boolean;
  /** Return focus to previously focused element on unmount */
  returnFocus?: boolean;
  /** Initial element to focus (by selector or element) */
  initialFocus?: string | HTMLElement | null;
}

export interface UseFocusTrapReturn<T extends HTMLElement = HTMLElement> {
  /** Ref to attach to the container element */
  ref: React.RefObject<T>;
}

/**
 * useFocusTrap - Trap keyboard focus within a container
 *
 * Features:
 * - Traps Tab/Shift+Tab within container
 * - Returns focus on unmount
 * - Auto-focuses first focusable element
 * - Handles edge cases (no focusable elements)
 *
 * @param options - Configuration options
 * @returns Ref to attach to container
 *
 * @example
 * function Modal({ children }) {
 *   const { ref } = useFocusTrap<HTMLDivElement>({ enabled: isOpen });
 *   return <div ref={ref}>{children}</div>;
 * }
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  options: UseFocusTrapOptions = {},
): UseFocusTrapReturn<T> {
  const {
    enabled = true,
    autoFocus = true,
    returnFocus = true,
    initialFocus,
  } = options;

  const containerRef = useRef<T>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Get all focusable elements within container
  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return [];
    const elements =
      containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    return Array.from(elements).filter((el) => {
      // Additional visibility check
      return el.offsetParent !== null && !el.hasAttribute('hidden');
    });
  }, []);

  // Handle keydown for tab trapping
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled || event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement;

      if (event.shiftKey) {
        // Shift+Tab: go to last element if at first
        if (
          activeElement === firstElement ||
          !containerRef.current?.contains(activeElement)
        ) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: go to first element if at last
        if (
          activeElement === lastElement ||
          !containerRef.current?.contains(activeElement)
        ) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    },
    [enabled, getFocusableElements],
  );

  // Setup effect
  useEffect(() => {
    if (!enabled) return;

    // Store previously focused element
    if (returnFocus) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement;
    }

    // Auto-focus
    if (autoFocus) {
      requestAnimationFrame(() => {
        if (!containerRef.current) return;

        let elementToFocus: HTMLElement | null = null;

        // Try initial focus
        if (initialFocus) {
          if (typeof initialFocus === 'string') {
            elementToFocus =
              containerRef.current.querySelector<HTMLElement>(initialFocus);
          } else {
            elementToFocus = initialFocus;
          }
        }

        // Fallback to first focusable
        if (!elementToFocus) {
          const focusableElements = getFocusableElements();
          elementToFocus = focusableElements[0] || null;
        }

        // Focus element or container
        if (elementToFocus) {
          elementToFocus.focus();
        } else if (containerRef.current) {
          // Make container focusable if no elements found
          containerRef.current.setAttribute('tabindex', '-1');
          containerRef.current.focus();
        }
      });
    }

    // Add keydown listener
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      // Return focus
      if (returnFocus && previouslyFocusedRef.current) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [
    enabled,
    autoFocus,
    returnFocus,
    initialFocus,
    handleKeyDown,
    getFocusableElements,
  ]);

  return { ref: containerRef };
}

export default useFocusTrap;
