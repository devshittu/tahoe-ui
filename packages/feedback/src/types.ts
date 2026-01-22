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
// Style Mappings (CSS Variable-backed)
// ============================================================================

/**
 * Background colors for filled variants
 * Maps to CSS variables via @tahoe-ui/tailwind-preset
 */
export const FEEDBACK_COLORS: Record<FeedbackColor, string> = {
  default: 'bg-gray-200 dark:bg-gray-700',
  primary: 'bg-brand-primary-500',
  secondary: 'bg-gray-500',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-info',
};

/**
 * Text colors for labels and content
 * Maps to CSS variables via @tahoe-ui/tailwind-preset
 */
export const FEEDBACK_TEXT_COLORS: Record<FeedbackColor, string> = {
  default: 'text-text-secondary',
  primary: 'text-brand-primary-600 dark:text-brand-primary-400',
  secondary: 'text-gray-600 dark:text-gray-400',
  success: 'text-success-dark dark:text-success',
  warning: 'text-warning-dark dark:text-warning',
  error: 'text-error-dark dark:text-error',
  info: 'text-info-dark dark:text-info',
};

/**
 * Border colors for outlined variants
 * Maps to CSS variables via @tahoe-ui/tailwind-preset
 */
export const FEEDBACK_BORDER_COLORS: Record<FeedbackColor, string> = {
  default: 'border-border-default',
  primary: 'border-brand-primary-500',
  secondary: 'border-gray-500',
  success: 'border-success',
  warning: 'border-warning',
  error: 'border-error',
  info: 'border-info',
};

/**
 * Soft/muted background colors
 * Maps to CSS variables via @tahoe-ui/tailwind-preset
 */
export const FEEDBACK_BG_SOFT: Record<FeedbackColor, string> = {
  default: 'bg-bg-secondary dark:bg-gray-800',
  primary: 'bg-brand-primary-50 dark:bg-brand-primary-950',
  secondary: 'bg-gray-100 dark:bg-gray-800',
  success: 'bg-success-light dark:bg-success-dark/20',
  warning: 'bg-warning-light dark:bg-warning-dark/20',
  error: 'bg-error-light dark:bg-error-dark/20',
  info: 'bg-info-light dark:bg-info-dark/20',
};

export const SIZE_SCALE: Record<FeedbackSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};
