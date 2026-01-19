'use client';

import { useRef, useEffect, useCallback } from 'react';

export interface UseClickOutsideOptions {
  enabled?: boolean;
  ignoreRefs?: React.RefObject<HTMLElement | null>[];
  includeTouch?: boolean;
}

export interface UseClickOutsideReturn<T extends HTMLElement = HTMLElement> {
  ref: React.RefObject<T>;
}

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  callback: () => void,
  options: UseClickOutsideOptions = {}
): UseClickOutsideReturn<T> {
  const { enabled = true, ignoreRefs = [], includeTouch = true } = options;

  const targetRef = useRef<T>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const handleEvent = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!enabled || !targetRef.current) return;

      const target = event.target as Node;

      if (targetRef.current.contains(target)) return;

      for (const ref of ignoreRefs) {
        if (ref.current?.contains(target)) return;
      }

      callbackRef.current();
    },
    [enabled, ignoreRefs]
  );

  useEffect(() => {
    if (!enabled) return;

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
