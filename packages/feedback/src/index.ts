/**
 * @tahoe-ui/feedback
 *
 * Feedback components for loading states, alerts, and status indicators.
 *
 * Components:
 * - Skeleton: Content placeholder for loading states
 * - Progress: Linear and circular progress indicators
 * - Spinner: Loading spinner with multiple variants
 * - Alert: Inline feedback messages
 * - Badge: Status indicators and labels
 */

// Skeleton
export {
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  SkeletonRectangle,
} from './Skeleton';

// Progress
export { Progress, CircularProgress } from './Progress';

// Spinner
export { Spinner, LoadingOverlay } from './Spinner';

// Alert
export { Alert } from './Alert';

// Badge
export { Badge, StatusDot, CountBadge } from './Badge';

// Types
export type {
  FeedbackColor,
  FeedbackSize,
  SkeletonVariant,
  SkeletonProps,
  ProgressProps,
  SpinnerVariant,
  SpinnerProps,
  AlertVariant,
  AlertProps,
  BadgeVariant,
  BadgeProps,
} from './types';

// Style constants (for customization)
export {
  FEEDBACK_COLORS,
  FEEDBACK_TEXT_COLORS,
  FEEDBACK_BORDER_COLORS,
  FEEDBACK_BG_SOFT,
  SIZE_SCALE,
} from './types';
