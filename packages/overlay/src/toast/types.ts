import { ReactNode } from 'react';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type DismissMode = 'gesture' | 'action-only' | 'auto';

export interface ToastConfig {
  id?: string;
  title?: string;
  message: string | ReactNode;
  variant?: ToastVariant;
  duration?: number;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    dismissOnClick?: boolean;
  };
  onDismiss?: () => void;
  onShow?: () => void;
  dismissMode?: DismissMode;
  showHandlebar?: boolean;
  swipeEnabled?: boolean;
}

export interface Toast extends Required<
  Pick<
    ToastConfig,
    | 'id'
    | 'message'
    | 'variant'
    | 'duration'
    | 'dismissMode'
    | 'showHandlebar'
    | 'swipeEnabled'
  >
> {
  title?: string;
  icon?: ReactNode;
  action?: ToastConfig['action'];
  onDismiss?: () => void;
  onShow?: () => void;
  createdAt: number;
  isExiting: boolean;
  isPaused: boolean;
  remainingDuration: number;
}

export interface ToastState {
  toasts: Toast[];
  position: ToastPosition;
  maxVisible: number;
  gap: number;
}

export interface ToastActions {
  toast: (config: ToastConfig) => string;
  success: (message: string, config?: Partial<ToastConfig>) => string;
  error: (message: string, config?: Partial<ToastConfig>) => string;
  warning: (message: string, config?: Partial<ToastConfig>) => string;
  info: (message: string, config?: Partial<ToastConfig>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  pause: (id: string) => void;
  resume: (id: string) => void;
  update: (id: string, config: Partial<ToastConfig>) => void;
  setPosition: (position: ToastPosition) => void;
  setMaxVisible: (max: number) => void;
}

export type ToastStore = ToastState & ToastActions;

export const DEFAULT_TOAST_CONFIG = {
  variant: 'default' as ToastVariant,
  duration: 5000,
  dismissMode: 'gesture' as DismissMode,
  showHandlebar: true,
  swipeEnabled: true,
  position: 'bottom-right' as ToastPosition,
  maxVisible: 5,
  gap: 12,
} as const;

export const TOAST_VARIANT_STYLES: Record<
  ToastVariant,
  { bg: string; border: string; icon: string; text: string }
> = {
  default: {
    bg: 'bg-white dark:bg-gray-900',
    border: 'border-gray-200 dark:border-gray-800',
    icon: 'text-gray-500 dark:text-gray-400',
    text: 'text-gray-900 dark:text-gray-100',
  },
  success: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/50',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: 'text-emerald-500 dark:text-emerald-400',
    text: 'text-emerald-900 dark:text-emerald-100',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-950/50',
    border: 'border-red-200 dark:border-red-800',
    icon: 'text-red-500 dark:text-red-400',
    text: 'text-red-900 dark:text-red-100',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-950/50',
    border: 'border-amber-200 dark:border-amber-800',
    icon: 'text-amber-500 dark:text-amber-400',
    text: 'text-amber-900 dark:text-amber-100',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-950/50',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'text-blue-500 dark:text-blue-400',
    text: 'text-blue-900 dark:text-blue-100',
  },
} as const;
