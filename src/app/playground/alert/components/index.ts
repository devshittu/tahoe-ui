// src/app/playground/alert/components/index.ts

/**
 * Alert - Contextual feedback messages
 *
 * Displays important messages to users with semantic
 * meaning through color and iconography.
 *
 * Features:
 * - Four semantic variants (info, success, warning, error)
 * - Three visual styles (filled, soft, outline)
 * - Three sizes
 * - Optional title and description
 * - Default icons per variant
 * - Dismissible with callback
 * - Action button support
 * - Dark mode support
 *
 * @example
 * ```tsx
 * import { Alert } from './components';
 *
 * // Simple success alert
 * <Alert variant="success">Changes saved!</Alert>
 *
 * // With title, dismissible
 * <Alert
 *   variant="error"
 *   title="Error"
 *   dismissible
 *   onDismiss={() => setVisible(false)}
 * >
 *   Failed to save changes. Please try again.
 * </Alert>
 * ```
 */

export { Alert } from './Alert';
export type { AlertProps, AlertVariant, AlertStyle, AlertSize } from './types';
export { ALERT_VARIANT_CONFIG, ALERT_SIZE_CONFIG } from './types';
