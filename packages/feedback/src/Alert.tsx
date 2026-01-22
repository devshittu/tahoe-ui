'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import type { AlertProps, AlertVariant, FeedbackColor } from './types';

// Variant + Color style mappings (CSS variable-backed via @tahoe-ui/tailwind-preset)
const getAlertStyles = (
  variant: AlertVariant,
  color: FeedbackColor,
): string => {
  const styles: Record<AlertVariant, Record<FeedbackColor, string>> = {
    filled: {
      default: 'bg-gray-600 text-white',
      primary: 'bg-brand-primary-600 text-white',
      secondary: 'bg-gray-500 text-white',
      success: 'bg-success text-white',
      warning: 'bg-warning text-white',
      error: 'bg-error text-white',
      info: 'bg-info text-white',
    },
    outlined: {
      default: 'border border-border-default text-text-secondary',
      primary:
        'border border-brand-primary-500 text-brand-primary-700 dark:text-brand-primary-400',
      secondary: 'border border-gray-400 text-gray-600 dark:text-gray-400',
      success: 'border border-success text-success-dark dark:text-success',
      warning: 'border border-warning text-warning-dark dark:text-warning',
      error: 'border border-error text-error-dark dark:text-error',
      info: 'border border-info text-info-dark dark:text-info',
    },
    soft: {
      default: 'bg-bg-secondary text-text-secondary',
      primary:
        'bg-brand-primary-50 dark:bg-brand-primary-950 text-brand-primary-800 dark:text-brand-primary-300',
      secondary:
        'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
      success:
        'bg-success-light dark:bg-success-dark/20 text-success-dark dark:text-success',
      warning:
        'bg-warning-light dark:bg-warning-dark/20 text-warning-dark dark:text-warning',
      error:
        'bg-error-light dark:bg-error-dark/20 text-error-dark dark:text-error',
      info: 'bg-info-light dark:bg-info-dark/20 text-info-dark dark:text-info',
    },
  };

  return styles[variant][color];
};

// Default icons for each color (inline SVG to avoid dependencies)
const AlertIcons: Record<FeedbackColor, React.ReactNode> = {
  default: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  primary: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  secondary: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  success: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  error: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  info: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

// Close icon
const CloseIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

/**
 * Alert component for displaying feedback messages.
 *
 * @example
 * ```tsx
 * // Basic alert
 * <Alert color="success">Operation completed successfully!</Alert>
 *
 * // With title and icon
 * <Alert color="error" title="Error" showIcon>
 *   Something went wrong. Please try again.
 * </Alert>
 *
 * // Dismissible
 * <Alert color="info" dismissible onDismiss={() => setVisible(false)}>
 *   This alert can be dismissed.
 * </Alert>
 *
 * // Different variants
 * <Alert variant="outlined" color="warning">Warning message</Alert>
 * <Alert variant="soft" color="success">Success message</Alert>
 * ```
 */
export function Alert({
  variant = 'soft',
  color = 'default',
  title,
  children,
  icon,
  showIcon = true,
  dismissible = false,
  onDismiss,
  className,
}: AlertProps) {
  const displayIcon = icon ?? (showIcon ? AlertIcons[color] : null);

  return (
    <div
      role="alert"
      className={twMerge(
        'relative flex gap-3 rounded-lg p-4',
        getAlertStyles(variant, color),
        className,
      )}
    >
      {/* Icon */}
      {displayIcon && <div className="flex-shrink-0 mt-0.5">{displayIcon}</div>}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && <h5 className="font-medium mb-1">{title}</h5>}
        <div className={title ? 'text-sm opacity-90' : ''}>{children}</div>
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          className={twMerge(
            'flex-shrink-0 p-1 rounded-md transition-colors',
            'hover:bg-black/10 dark:hover:bg-white/10',
            'focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2',
            variant === 'filled' && 'hover:bg-white/20',
          )}
          aria-label="Dismiss"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

export default Alert;
