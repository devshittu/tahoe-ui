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

// Toast variant styles (CSS variable-backed via @tahoe-ui/tailwind-preset)
export const TOAST_VARIANT_STYLES: Record<
  ToastVariant,
  { bg: string; border: string; icon: string; text: string }
> = {
  default: {
    bg: 'bg-bg-primary',
    border: 'border-border-default',
    icon: 'text-text-muted',
    text: 'text-text-primary',
  },
  success: {
    bg: 'bg-success-light dark:bg-success-dark/20',
    border: 'border-success/30',
    icon: 'text-success',
    text: 'text-success-dark dark:text-success',
  },
  error: {
    bg: 'bg-error-light dark:bg-error-dark/20',
    border: 'border-error/30',
    icon: 'text-error',
    text: 'text-error-dark dark:text-error',
  },
  warning: {
    bg: 'bg-warning-light dark:bg-warning-dark/20',
    border: 'border-warning/30',
    icon: 'text-warning',
    text: 'text-warning-dark dark:text-warning',
  },
  info: {
    bg: 'bg-info-light dark:bg-info-dark/20',
    border: 'border-info/30',
    icon: 'text-info',
    text: 'text-info-dark dark:text-info',
  },
} as const;
