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

export const useConfirmationStore = create<ConfirmationState>(storeCreator);

export interface UseConfirmationOptions {
  id: string;
  onConfirm: () => void;
  timeout?: number;
  onTimeout?: () => void;
}

export interface UseConfirmationReturn {
  isPending: boolean;
  startTime: number;
  handleAction: () => void;
  reset: () => void;
  timeRemaining: number;
  progress: number;
}

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

  const [timeRemaining, setTimeRemaining] = useState(() => timeout);
  const [progress, setProgress] = useState(() => 100);

  const confirmation = confirmations[id];
  const isPending = confirmation?.isPending ?? false;
  const startTime = confirmation?.startTime ?? 0;

  useEffect(() => {
    if (!isPending || !startTime) {
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
      if (timerRef.current !== undefined) {
        clearTimeout(timerRef.current);
      }
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }
      confirm(id);
      onConfirm();
    } else {
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
