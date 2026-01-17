// src/app/playground/toast/components/store.ts
'use client';

import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { ToastStore, ToastConfig, Toast, ToastPosition } from './types';
import { DEFAULT_TOAST_CONFIG } from './types';

/**
 * Generate unique toast ID
 */
function generateId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Toast store - manages toast queue with auto-dismiss
 *
 * Features:
 * - Queue management with max visible limit
 * - Auto-dismiss with pause on hover
 * - Multiple positions
 * - Variant shortcuts (success, error, warning, info)
 *
 * Design Principles:
 * - #19 Immediate, Unambiguous Feedback: Instant visual confirmation
 * - #18 Thoughtful Empty & Loading States: Clear messaging
 * - #6 Purposeful Motion: Smooth enter/exit animations
 */
export const useToastStore = create<ToastStore>((set, get) => ({
  // Initial state
  toasts: [],
  position: DEFAULT_TOAST_CONFIG.position,
  maxVisible: DEFAULT_TOAST_CONFIG.maxVisible,
  gap: DEFAULT_TOAST_CONFIG.gap,

  // Add a new toast
  toast: (config: ToastConfig) => {
    const id = config.id || generateId();
    const now = Date.now();
    const dismissMode = config.dismissMode ?? DEFAULT_TOAST_CONFIG.dismissMode;

    // Validate action-only mode requires an action
    if (dismissMode === 'action-only' && !config.action) {
      console.warn(
        '[Toast] dismissMode "action-only" requires an action prop. Falling back to "gesture" mode.',
      );
    }

    const effectiveDismissMode =
      dismissMode === 'action-only' && !config.action ? 'gesture' : dismissMode;

    const newToast: Toast = {
      id,
      message: config.message,
      title: config.title,
      variant: config.variant ?? DEFAULT_TOAST_CONFIG.variant,
      duration: config.duration ?? DEFAULT_TOAST_CONFIG.duration,
      dismissMode: effectiveDismissMode,
      showHandlebar:
        config.showHandlebar ??
        (effectiveDismissMode === 'gesture'
          ? DEFAULT_TOAST_CONFIG.showHandlebar
          : false),
      swipeEnabled:
        config.swipeEnabled ??
        (effectiveDismissMode === 'gesture'
          ? DEFAULT_TOAST_CONFIG.swipeEnabled
          : false),
      icon: config.icon,
      action: config.action,
      onDismiss: config.onDismiss,
      onShow: config.onShow,
      createdAt: now,
      isExiting: false,
      isPaused: false,
      remainingDuration: config.duration ?? DEFAULT_TOAST_CONFIG.duration,
    };

    set((state) => {
      // Remove oldest if exceeding max
      let toasts = [...state.toasts, newToast];
      if (toasts.length > state.maxVisible) {
        const toRemove = toasts[0];
        toRemove.onDismiss?.();
        toasts = toasts.slice(1);
      }
      return { toasts };
    });

    // Fire onShow callback
    config.onShow?.();

    // Set up auto-dismiss timer
    if (newToast.duration > 0) {
      scheduleAutoDismiss(id, newToast.duration, get, set);
    }

    return id;
  },

  // Variant shortcuts
  success: (message, config) =>
    get().toast({ ...config, message, variant: 'success' }),

  error: (message, config) =>
    get().toast({ ...config, message, variant: 'error' }),

  warning: (message, config) =>
    get().toast({ ...config, message, variant: 'warning' }),

  info: (message, config) =>
    get().toast({ ...config, message, variant: 'info' }),

  // Dismiss a specific toast with exit animation
  dismiss: (id: string) => {
    const toast = get().toasts.find((t) => t.id === id);
    if (!toast || toast.isExiting) return;

    // Mark as exiting for animation
    set((state) => ({
      toasts: state.toasts.map((t) =>
        t.id === id ? { ...t, isExiting: true } : t,
      ),
    }));

    // Remove after animation
    setTimeout(() => {
      set((state) => {
        const removedToast = state.toasts.find((t) => t.id === id);
        removedToast?.onDismiss?.();
        return {
          toasts: state.toasts.filter((t) => t.id !== id),
        };
      });
    }, 200); // Match animation duration
  },

  // Dismiss all toasts
  dismissAll: () => {
    const { toasts } = get();

    // Mark all as exiting
    set((state) => ({
      toasts: state.toasts.map((t) => ({ ...t, isExiting: true })),
    }));

    // Remove after animation
    setTimeout(() => {
      toasts.forEach((t) => t.onDismiss?.());
      set({ toasts: [] });
    }, 200);
  },

  // Pause auto-dismiss (on hover)
  pause: (id: string) => {
    const now = Date.now();
    set((state) => ({
      toasts: state.toasts.map((t) => {
        if (t.id !== id || t.isPaused) return t;
        const elapsed = now - t.createdAt;
        const remaining = Math.max(0, t.duration - elapsed);
        return { ...t, isPaused: true, remainingDuration: remaining };
      }),
    }));
  },

  // Resume auto-dismiss
  resume: (id: string) => {
    set((state) => ({
      toasts: state.toasts.map((t) =>
        t.id === id ? { ...t, isPaused: false, createdAt: Date.now() } : t,
      ),
    }));

    const toast = get().toasts.find((t) => t.id === id);
    if (toast && toast.remainingDuration > 0) {
      scheduleAutoDismiss(id, toast.remainingDuration, get, set);
    }
  },

  // Update toast config
  update: (id: string, config: Partial<ToastConfig>) => {
    set((state) => ({
      toasts: state.toasts.map((t) =>
        t.id === id
          ? {
              ...t,
              ...config,
              variant: config.variant ?? t.variant,
              duration: config.duration ?? t.duration,
              dismissMode: config.dismissMode ?? t.dismissMode,
            }
          : t,
      ),
    }));
  },

  // Set global position
  setPosition: (position: ToastPosition) => {
    set({ position });
  },

  // Set max visible
  setMaxVisible: (maxVisible: number) => {
    set({ maxVisible });
  },
}));

/**
 * Schedule auto-dismiss with pause support
 */
function scheduleAutoDismiss(
  id: string,
  duration: number,
  get: () => ToastStore,
  set: (
    partial: Partial<ToastStore> | ((state: ToastStore) => Partial<ToastStore>),
  ) => void,
) {
  const checkAndDismiss = () => {
    const toast = get().toasts.find((t) => t.id === id);
    if (!toast) return;

    if (toast.isPaused) {
      // Check again later
      setTimeout(checkAndDismiss, 100);
      return;
    }

    const elapsed = Date.now() - toast.createdAt;
    const remaining = toast.remainingDuration - elapsed;

    if (remaining <= 0) {
      get().dismiss(id);
    } else {
      setTimeout(checkAndDismiss, remaining);
    }
  };

  setTimeout(checkAndDismiss, duration);
}

/**
 * Hook for using toasts - provides all toast actions
 */
export function useToast() {
  const store = useToastStore();

  return {
    toast: store.toast,
    success: store.success,
    error: store.error,
    warning: store.warning,
    info: store.info,
    dismiss: store.dismiss,
    dismissAll: store.dismissAll,
  };
}

/**
 * Hook for reading toast state (for ToastContainer)
 */
export function useToastState() {
  return useToastStore(
    useShallow((state) => ({
      toasts: state.toasts,
      position: state.position,
      gap: state.gap,
    })),
  );
}
