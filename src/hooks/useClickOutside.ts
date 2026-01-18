// src/hooks/useClickOutside.ts
'use client';

import { useRef, useEffect, useCallback } from 'react';

export interface UseClickOutsideOptions {
  /** Enable/disable the listener */
  enabled?: boolean;
  /** Refs to ignore (clicks on these elements won't trigger callback) */
  ignoreRefs?: React.RefObject<HTMLElement | null>[];
  /** Listen for touch events as well */
  includeTouch?: boolean;
}

export interface UseClickOutsideReturn<T extends HTMLElement = HTMLElement> {
  /** Ref to attach to the target element */
  ref: React.RefObject<T>;
}

/**
 * useClickOutside - Detect clicks outside an element
 *
 * Features:
 * - Detects clicks outside the target element
 * - Supports optional ignore list (refs)
 * - Touch event support for mobile
 *
 * @param callback - Function to call when click outside is detected
 * @param options - Configuration options
 * @returns Ref to attach to element
 *
 * @example
 * function Dropdown({ onClose }) {
 *   const { ref } = useClickOutside<HTMLDivElement>(onClose);
 *   return <div ref={ref}>Dropdown content</div>;
 * }
 *
 * @example
 * // With ignore refs
 * function Modal({ onClose, triggerRef }) {
 *   const { ref } = useClickOutside<HTMLDivElement>(onClose, {
 *     ignoreRefs: [triggerRef],
 *   });
 *   return <div ref={ref}>Modal content</div>;
 * }
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  callback: () => void,
  options: UseClickOutsideOptions = {},
): UseClickOutsideReturn<T> {
  const { enabled = true, ignoreRefs = [], includeTouch = true } = options;

  const targetRef = useRef<T>(null);
  const callbackRef = useRef(callback);

  // Keep callback ref updated
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const handleEvent = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!enabled || !targetRef.current) return;

      const target = event.target as Node;

      // Check if click is inside target
      if (targetRef.current.contains(target)) return;

      // Check if click is inside any ignored refs
      for (const ref of ignoreRefs) {
        if (ref.current?.contains(target)) return;
      }

      // Click was outside
      callbackRef.current();
    },
    [enabled, ignoreRefs],
  );

  useEffect(() => {
    if (!enabled) return;

    // Use mousedown for immediate response (before click fires)
    document.addEventListener('mousedown', handleEvent);

    if (includeTouch) {
      document.addEventListener('touchstart', handleEvent);
    }

    return () => {
      document.removeEventListener('mousedown', handleEvent);
      if (includeTouch) {
        document.removeEventListener('touchstart', handleEvent);
      }
    };
  }, [enabled, handleEvent, includeTouch]);

  return { ref: targetRef };
}

export default useClickOutside;
