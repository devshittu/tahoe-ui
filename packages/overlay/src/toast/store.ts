'use client';

import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { ToastStore, ToastConfig, Toast, ToastPosition } from './types';
import { DEFAULT_TOAST_CONFIG } from './types';

function generateId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  position: DEFAULT_TOAST_CONFIG.position,
  maxVisible: DEFAULT_TOAST_CONFIG.maxVisible,
  gap: DEFAULT_TOAST_CONFIG.gap,

  toast: (config: ToastConfig) => {
    const id = config.id || generateId();
    const now = Date.now();
    const dismissMode = config.dismissMode ?? DEFAULT_TOAST_CONFIG.dismissMode;

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
      let toasts = [...state.toasts, newToast];
      if (toasts.length > state.maxVisible) {
        const toRemove = toasts[0];
        toRemove.onDismiss?.();
        toasts = toasts.slice(1);
      }
      return { toasts };
    });

    config.onShow?.();

    if (newToast.duration > 0) {
      scheduleAutoDismiss(id, newToast.duration, get, set);
    }

    return id;
  },

  success: (message, config) =>
    get().toast({ ...config, message, variant: 'success' }),

  error: (message, config) =>
    get().toast({ ...config, message, variant: 'error' }),

  warning: (message, config) =>
    get().toast({ ...config, message, variant: 'warning' }),

  info: (message, config) =>
    get().toast({ ...config, message, variant: 'info' }),

  dismiss: (id: string) => {
    const toast = get().toasts.find((t) => t.id === id);
    if (!toast || toast.isExiting) return;

    set((state) => ({
      toasts: state.toasts.map((t) =>
        t.id === id ? { ...t, isExiting: true } : t,
      ),
    }));

    setTimeout(() => {
      set((state) => {
        const removedToast = state.toasts.find((t) => t.id === id);
        removedToast?.onDismiss?.();
        return {
          toasts: state.toasts.filter((t) => t.id !== id),
        };
      });
    }, 200);
  },

  dismissAll: () => {
    const { toasts } = get();

    set((state) => ({
      toasts: state.toasts.map((t) => ({ ...t, isExiting: true })),
    }));

    setTimeout(() => {
      toasts.forEach((t) => t.onDismiss?.());
      set({ toasts: [] });
    }, 200);
  },

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

  setPosition: (position: ToastPosition) => {
    set({ position });
  },

  setMaxVisible: (maxVisible: number) => {
    set({ maxVisible });
  },
}));

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

export function useToastState() {
  return useToastStore(
    useShallow((state) => ({
      toasts: state.toasts,
      position: state.position,
      gap: state.gap,
    })),
  );
}
