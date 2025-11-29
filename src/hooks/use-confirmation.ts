// src/hooks/use-confirmation.ts
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { create, StateCreator } from 'zustand';

interface ConfirmationState {
  confirmations: Record<
    string,
    {
      isPending: boolean;
      startTime: number;
    }
  >;
  setPending: (id: string) => void;
  confirm: (id: string) => void;
  reset: (id: string) => void;
  clearAll: () => void;
}

// Zustand store creator with proper typing
const storeCreator: StateCreator<ConfirmationState> = (set) => ({
  confirmations: {},

  setPending: (id: string) =>
    set((state) => ({
      confirmations: {
        ...state.confirmations,
        [id]: {
          isPending: true,
          startTime: Date.now(),
        },
      },
    })),

  confirm: (id: string) =>
    set((state) => {
      const { [id]: _, ...rest } = state.confirmations;
      return { confirmations: rest };
    }),

  reset: (id: string) =>
    set((state) => {
      const { [id]: _, ...rest } = state.confirmations;
      return { confirmations: rest };
    }),

  clearAll: () => set({ confirmations: {} }),
});

// Zustand store for global confirmation state
export const useConfirmationStore = create<ConfirmationState>(storeCreator);

export interface UseConfirmationOptions {
  /** Unique identifier for this confirmation instance */
  id: string;

  /** Callback to execute when confirmed */
  onConfirm: () => void;

  /** Timeout in milliseconds before auto-reset (default: 5000) */
  timeout?: number;

  /** Callback when confirmation times out */
  onTimeout?: () => void;
}

export interface UseConfirmationReturn {
  /** Whether confirmation is pending (first click done, awaiting second) */
  isPending: boolean;

  /** Start timestamp of pending confirmation */
  startTime: number;

  /** Handle the action (first click = pending, second click = confirm) */
  handleAction: () => void;

  /** Manually reset confirmation state */
  reset: () => void;

  /** Time remaining in milliseconds (live updating) */
  timeRemaining: number;

  /** Progress as percentage (0-100) */
  progress: number;
}

/**
 * Headless confirmation hook - Senior Engineer Edition
 *
 * @example
 * ```tsx
 * const confirmation = useConfirmation({
 *   id: 'delete-item-123',
 *   onConfirm: () => deleteItem(),
 *   timeout: 5000,
 * });
 *
 * <ConfirmationPopover
 *   isOpen={confirmation.isPending}
 *   startTime={confirmation.startTime}
 *   timeout={5000}
 * >
 *   <button onClick={confirmation.handleAction}>
 *     Delete
 *   </button>
 * </ConfirmationPopover>
 * ```
 */
export function useConfirmation({
  id,
  onConfirm,
  timeout = 5000,
  onTimeout,
}: UseConfirmationOptions): UseConfirmationReturn {
  const {
    confirmations,
    setPending,
    confirm,
    reset: resetStore,
  } = useConfirmationStore();
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const rafRef = useRef<number | undefined>(undefined);

  // Use lazy initialization to avoid setState in effect
  const [timeRemaining, setTimeRemaining] = useState(() => timeout);
  const [progress, setProgress] = useState(() => 100);

  const confirmation = confirmations[id];
  const isPending = confirmation?.isPending ?? false;
  const startTime = confirmation?.startTime ?? 0;

  // RAF-based time remaining calculation for smooth updates
  useEffect(() => {
    if (!isPending || !startTime) {
      // Reset using RAF to avoid sync setState in effect
      rafRef.current = requestAnimationFrame(() => {
        setTimeRemaining(timeout);
        setProgress(100);
      });
      return;
    }

    const updateTime = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const remaining = Math.max(0, timeout - elapsed);
      const progressValue = Math.round((remaining / timeout) * 100);

      setTimeRemaining(remaining);
      setProgress(progressValue);

      if (remaining > 0) {
        rafRef.current = requestAnimationFrame(updateTime);
      }
    };

    updateTime();

    return () => {
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isPending, startTime, timeout]);

  // Auto-reset timer with proper cleanup
  useEffect(() => {
    if (!isPending) return;

    timerRef.current = setTimeout(() => {
      resetStore(id);
      onTimeout?.();
    }, timeout);

    return () => {
      if (timerRef.current !== undefined) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPending, id, timeout, onTimeout, resetStore]);

  const handleAction = useCallback(() => {
    if (isPending) {
      // Second click - confirm and execute
      if (timerRef.current !== undefined) {
        clearTimeout(timerRef.current);
      }
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }
      confirm(id);
      onConfirm();
    } else {
      // First click - set pending
      setPending(id);
    }
  }, [isPending, id, onConfirm, confirm, setPending]);

  const reset = useCallback(() => {
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
    }
    if (rafRef.current !== undefined) {
      cancelAnimationFrame(rafRef.current);
    }
    resetStore(id);
  }, [id, resetStore]);

  return {
    isPending,
    startTime,
    handleAction,
    reset,
    timeRemaining,
    progress,
  };
}
