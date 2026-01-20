'use client';

import { useRef, useEffect, useCallback } from 'react';

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
  enabled?: boolean;
  autoFocus?: boolean;
  returnFocus?: boolean;
  initialFocus?: string | HTMLElement | null;
}

export interface UseFocusTrapReturn<T extends HTMLElement = HTMLElement> {
  ref: React.RefObject<T>;
}

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

  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return [];
    const elements =
      containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    return Array.from(elements).filter((el) => {
      return el.offsetParent !== null && !el.hasAttribute('hidden');
    });
  }, []);

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
        if (
          activeElement === firstElement ||
          !containerRef.current?.contains(activeElement)
        ) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
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

  useEffect(() => {
    if (!enabled) return;

    if (returnFocus) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement;
    }

    if (autoFocus) {
      requestAnimationFrame(() => {
        if (!containerRef.current) return;

        let elementToFocus: HTMLElement | null = null;

        if (initialFocus) {
          if (typeof initialFocus === 'string') {
            elementToFocus =
              containerRef.current.querySelector<HTMLElement>(initialFocus);
          } else {
            elementToFocus = initialFocus;
          }
        }

        if (!elementToFocus) {
          const focusableElements = getFocusableElements();
          elementToFocus = focusableElements[0] || null;
        }

        if (elementToFocus) {
          elementToFocus.focus();
        } else if (containerRef.current) {
          containerRef.current.setAttribute('tabindex', '-1');
          containerRef.current.focus();
        }
      });
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

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
