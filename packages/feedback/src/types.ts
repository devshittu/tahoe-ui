import type { ReactNode } from 'react';

/**
 * Common color variants for feedback components
 */
export type FeedbackColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

/**
 * Common size variants
 */
export type FeedbackSize = 'sm' | 'md' | 'lg';

// ============================================================================
// Skeleton Types
// ============================================================================

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export interface SkeletonProps {
  /** Skeleton shape variant */
  variant?: SkeletonVariant;
  /** Width (CSS value or Tailwind class) */
  width?: string | number;
  /** Height (CSS value or Tailwind class) */
  height?: string | number;
  /** Enable shimmer animation */
  animation?: 'pulse' | 'shimmer' | 'none';
  /** Number of text lines (only for variant="text") */
  lines?: number;
  /** Additional CSS classes */
  className?: string;
}

// ============================================================================
// Progress Types
// ============================================================================

export interface ProgressProps {
  /** Progress value (0-100). If undefined, shows indeterminate state */
  value?: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Size variant */
  size?: FeedbackSize;
  /** Color variant */
  color?: FeedbackColor;
  /** Show percentage label */
  showLabel?: boolean;
  /** Custom label */
  label?: ReactNode;
  /** Stripe animation */
  striped?: boolean;
  /** Animated stripes */
  animated?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// ============================================================================
// Spinner Types
// ============================================================================

export type SpinnerVariant = 'border' | 'dots' | 'ring';

export interface SpinnerProps {
  /** Spinner visual style */
  variant?: SpinnerVariant;
  /** Size variant */
  size?: FeedbackSize | number;
  /** Color variant */
  color?: FeedbackColor;
  /** Accessible label */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

// ============================================================================
// Alert Types
// ============================================================================

export type AlertVariant = 'filled' | 'outlined' | 'soft';

export interface AlertProps {
  /** Alert style variant */
  variant?: AlertVariant;
  /** Color/severity */
  color?: FeedbackColor;
  /** Alert title */
  title?: ReactNode;
  /** Alert content */
  children: ReactNode;
  /** Leading icon */
  icon?: ReactNode;
  /** Show default icon based on color */
  showIcon?: boolean;
  /** Dismissible with close button */
  dismissible?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Additional CSS classes */
  className?: string;
}

// ============================================================================
// Badge Types
// ============================================================================

export type BadgeVariant = 'filled' | 'outlined' | 'soft' | 'dot';

export interface BadgeProps {
  /** Badge content */
  children?: ReactNode;
  /** Badge style variant */
  variant?: BadgeVariant;
  /** Color variant */
  color?: FeedbackColor;
  /** Size variant */
  size?: FeedbackSize;
  /** Pill shape (full rounded) */
  pill?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// ============================================================================
// Style Mappings
// ============================================================================

export const FEEDBACK_COLORS: Record<FeedbackColor, string> = {
  default: 'bg-gray-200 dark:bg-gray-700',
  primary: 'bg-blue-500',
  secondary: 'bg-gray-500',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
  info: 'bg-sky-500',
};

export const FEEDBACK_TEXT_COLORS: Record<FeedbackColor, string> = {
  default: 'text-gray-700 dark:text-gray-300',
  primary: 'text-blue-600 dark:text-blue-400',
  secondary: 'text-gray-600 dark:text-gray-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-amber-600 dark:text-amber-400',
  error: 'text-red-600 dark:text-red-400',
  info: 'text-sky-600 dark:text-sky-400',
};

export const FEEDBACK_BORDER_COLORS: Record<FeedbackColor, string> = {
  default: 'border-gray-300 dark:border-gray-600',
  primary: 'border-blue-500',
  secondary: 'border-gray-500',
  success: 'border-green-500',
  warning: 'border-amber-500',
  error: 'border-red-500',
  info: 'border-sky-500',
};

export const FEEDBACK_BG_SOFT: Record<FeedbackColor, string> = {
  default: 'bg-gray-100 dark:bg-gray-800',
  primary: 'bg-blue-50 dark:bg-blue-950',
  secondary: 'bg-gray-100 dark:bg-gray-800',
  success: 'bg-green-50 dark:bg-green-950',
  warning: 'bg-amber-50 dark:bg-amber-950',
  error: 'bg-red-50 dark:bg-red-950',
  info: 'bg-sky-50 dark:bg-sky-950',
};

export const SIZE_SCALE: Record<FeedbackSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};
