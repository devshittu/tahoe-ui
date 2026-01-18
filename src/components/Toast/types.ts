// src/components/Toast/types.ts

import { ReactNode } from 'react';

/**
 * Toast variant types following design system colors
 */
export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

/**
 * Toast position on screen
 */
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

/**
 * Dismiss interaction modes
 */
export type DismissMode = 'gesture' | 'action-only' | 'auto';

/**
 * Individual toast configuration
 */
export interface ToastConfig {
  /** Unique toast ID (auto-generated if not provided) */
  id?: string;
  /** Toast title */
  title?: string;
  /** Toast message/description */
  message: string | ReactNode;
  /** Visual variant */
  variant?: ToastVariant;
  /** Duration in ms before auto-dismiss (0 = persist until manual dismiss) */
  duration?: number;
  /** Custom icon (overrides variant icon) */
  icon?: ReactNode;
  /** Action button - required when dismissMode is 'action-only' */
  action?: {
    label: string;
    onClick: () => void;
    /** Whether clicking action also dismisses the toast (default: true) */
    dismissOnClick?: boolean;
  };
  /** Callback when toast is dismissed */
  onDismiss?: () => void;
  /** Callback when toast is shown */
  onShow?: () => void;

  // === Dismiss Configuration ===

  /**
   * Dismiss interaction mode:
   * - 'gesture': Swipe/drag to dismiss via handlebar (default)
   * - 'action-only': Must click action button to dismiss (requires action prop)
   * - 'auto': Auto-dismiss only, no manual dismiss option
   */
  dismissMode?: DismissMode;
  /** Show handlebar indicator for drag affordance (default: true for 'gesture' mode) */
  showHandlebar?: boolean;
  /** Enable swipe to dismiss (default: true for 'gesture' mode) */
  swipeEnabled?: boolean;
}

/**
 * Internal toast state with metadata
 */
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
  /** Timestamp when toast was created */
  createdAt: number;
  /** Whether toast is currently exiting */
  isExiting: boolean;
  /** Pause auto-dismiss on hover */
  isPaused: boolean;
  /** Remaining duration when paused */
  remainingDuration: number;
}

/**
 * Toast store state
 */
export interface ToastState {
  /** Active toasts */
  toasts: Toast[];
  /** Position for all toasts */
  position: ToastPosition;
  /** Maximum number of visible toasts */
  maxVisible: number;
  /** Gap between toasts in px */
  gap: number;
}

/**
 * Toast store actions
 */
export interface ToastActions {
  /** Add a new toast */
  toast: (config: ToastConfig) => string;
  /** Shorthand for success toast */
  success: (message: string, config?: Partial<ToastConfig>) => string;
  /** Shorthand for error toast */
  error: (message: string, config?: Partial<ToastConfig>) => string;
  /** Shorthand for warning toast */
  warning: (message: string, config?: Partial<ToastConfig>) => string;
  /** Shorthand for info toast */
  info: (message: string, config?: Partial<ToastConfig>) => string;
  /** Dismiss a specific toast */
  dismiss: (id: string) => void;
  /** Dismiss all toasts */
  dismissAll: () => void;
  /** Pause auto-dismiss for a toast */
  pause: (id: string) => void;
  /** Resume auto-dismiss for a toast */
  resume: (id: string) => void;
  /** Update toast configuration */
  update: (id: string, config: Partial<ToastConfig>) => void;
  /** Set global position */
  setPosition: (position: ToastPosition) => void;
  /** Set max visible toasts */
  setMaxVisible: (max: number) => void;
}

/**
 * Complete toast store type
 */
export type ToastStore = ToastState & ToastActions;

/**
 * Default toast configuration
 */
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

/**
 * Variant-specific colors for styling
 */
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
