// src/hooks/useEscapeKey.ts
'use client';

import { useEffect, useRef, useCallback } from 'react';

export interface UseEscapeKeyOptions {
  /** Enable/disable the listener */
  enabled?: boolean;
  /** Priority level for stack-based handling (higher = handled first) */
  priority?: number;
  /** Prevent default keyboard behavior */
  preventDefault?: boolean;
  /** Stop event propagation */
  stopPropagation?: boolean;
}

// Global stack for priority-based ESC handling
const escapeStack: Array<{
  id: number;
  priority: number;
  callback: () => void;
}> = [];
let idCounter = 0;

/**
 * useEscapeKey - Handle ESC key with priority support
 *
 * Features:
 * - Stack-based priority handling (highest priority handles first)
 * - Integrates with modal/overlay stacking
 * - Prevents default behavior optionally
 *
 * @param callback - Function to call when ESC is pressed
 * @param options - Configuration options
 *
 * @example
 * // Basic usage
 * useEscapeKey(() => setIsOpen(false));
 *
 * @example
 * // With priority (higher = handled first)
 * useEscapeKey(() => closeConfirmDialog(), { priority: 100 });
 * useEscapeKey(() => closeModal(), { priority: 50 });
 * // Pressing ESC will call closeConfirmDialog first
 */
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

  // Keep callback ref updated
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Register/unregister from stack
  useEffect(() => {
    if (!enabled) {
      // Remove from stack if disabled
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

    // Add to stack
    idRef.current = idCounter++;
    escapeStack.push({
      id: idRef.current,
      priority,
      callback: () => callbackRef.current(),
    });

    // Sort by priority (highest first)
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

  // Global keydown handler
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (escapeStack.length === 0) return;

      // Find our position in the stack
      const ourIndex = escapeStack.findIndex(
        (item) => item.id === idRef.current,
      );
      if (ourIndex === -1) return;

      // Only handle if we're the highest priority
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

/**
 * Get current escape stack (for debugging)
 */
export function getEscapeStack(): Array<{ id: number; priority: number }> {
  return escapeStack.map(({ id, priority }) => ({ id, priority }));
}

/**
 * Clear entire escape stack (for testing/cleanup)
 */
export function clearEscapeStack(): void {
  escapeStack.length = 0;
}

export default useEscapeKey;
