// src/app/playground/toast/components/index.ts

/**
 * Toast System - Queue-managed notifications with swipe dismiss
 *
 * A comprehensive toast/snackbar system with:
 * - Zustand store for queue management
 * - Multiple variants (success, error, warning, info)
 * - Auto-dismiss with pause on hover
 * - Swipe to dismiss gesture
 * - Action button support
 * - Configurable positions
 */

// Components
export { Toast } from './Toast';
export { ToastContainer } from './ToastContainer';

// Store and hooks
export { useToastStore, useToast, useToastState } from './store';

// Types
export type {
  ToastVariant,
  ToastPosition,
  ToastConfig,
  Toast as ToastType,
  ToastState,
  ToastActions,
  ToastStore,
  DismissMode,
} from './types';

export { DEFAULT_TOAST_CONFIG, TOAST_VARIANT_STYLES } from './types';
