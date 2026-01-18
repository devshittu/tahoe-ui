// src/components/Toast/index.ts

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
 *
 * @example
 * ```tsx
 * // In your app layout or provider
 * import { ToastContainer } from '@/components/Toast';
 *
 * function Layout({ children }) {
 *   return (
 *     <>
 *       {children}
 *       <ToastContainer />
 *     </>
 *   );
 * }
 *
 * // In any component
 * import { useToast } from '@/components/Toast';
 *
 * function MyComponent() {
 *   const { success, error } = useToast();
 *
 *   const handleSave = () => {
 *     success('Saved successfully');
 *   };
 *
 *   const handleError = () => {
 *     error('Something went wrong', {
 *       action: { label: 'Retry', onClick: () => {} }
 *     });
 *   };
 * }
 * ```
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
