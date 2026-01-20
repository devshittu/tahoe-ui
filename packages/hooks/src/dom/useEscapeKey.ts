'use client';

import { useEffect, useRef, useCallback } from 'react';

export interface UseEscapeKeyOptions {
  enabled?: boolean;
  priority?: number;
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

const escapeStack: Array<{
  id: number;
  priority: number;
  callback: () => void;
}> = [];
let idCounter = 0;

export function useEscapeKey(
  callback: () => void,
  options: UseEscapeKeyOptions = {},
): void {
  const {
    enabled = true,
    priority = 0,
    preventDefault = true,
    stopPropagation = false,
  } = options;

  const callbackRef = useRef(callback);
  const idRef = useRef<number | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) {
      if (idRef.current !== null) {
        const index = escapeStack.findIndex(
          (item) => item.id === idRef.current,
        );
        if (index !== -1) {
          escapeStack.splice(index, 1);
        }
        idRef.current = null;
      }
      return;
    }

    idRef.current = idCounter++;
    escapeStack.push({
      id: idRef.current,
      priority,
      callback: () => callbackRef.current(),
    });

    escapeStack.sort((a, b) => b.priority - a.priority);

    return () => {
      if (idRef.current !== null) {
        const index = escapeStack.findIndex(
          (item) => item.id === idRef.current,
        );
        if (index !== -1) {
          escapeStack.splice(index, 1);
        }
        idRef.current = null;
      }
    };
  }, [enabled, priority]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (escapeStack.length === 0) return;

      const ourIndex = escapeStack.findIndex(
        (item) => item.id === idRef.current,
      );
      if (ourIndex === -1) return;

      if (ourIndex !== 0) return;

      if (preventDefault) {
        event.preventDefault();
      }
      if (stopPropagation) {
        event.stopPropagation();
      }

      callbackRef.current();
    },
    [preventDefault, stopPropagation],
  );

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, handleKeyDown]);
}

export function getEscapeStack(): Array<{ id: number; priority: number }> {
  return escapeStack.map(({ id, priority }) => ({ id, priority }));
}

export function clearEscapeStack(): void {
  escapeStack.length = 0;
}
