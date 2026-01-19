'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import type { AlertProps, AlertVariant, FeedbackColor } from './types';

// Variant + Color style mappings
const getAlertStyles = (
  variant: AlertVariant,
  color: FeedbackColor,
): string => {
  const styles: Record<AlertVariant, Record<FeedbackColor, string>> = {
    filled: {
      default: 'bg-gray-600 text-white',
      primary: 'bg-blue-600 text-white',
      secondary: 'bg-gray-500 text-white',
      success: 'bg-green-600 text-white',
      warning: 'bg-amber-500 text-white',
      error: 'bg-red-600 text-white',
      info: 'bg-sky-600 text-white',
    },
    outlined: {
      default:
        'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300',
      primary: 'border border-blue-500 text-blue-700 dark:text-blue-400',
      secondary: 'border border-gray-400 text-gray-600 dark:text-gray-400',
      success: 'border border-green-500 text-green-700 dark:text-green-400',
      warning: 'border border-amber-500 text-amber-700 dark:text-amber-400',
      error: 'border border-red-500 text-red-700 dark:text-red-400',
      info: 'border border-sky-500 text-sky-700 dark:text-sky-400',
    },
    soft: {
      default: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
      primary: 'bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300',
      secondary:
        'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
      success:
        'bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-300',
      warning:
        'bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300',
      error: 'bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-300',
      info: 'bg-sky-50 dark:bg-sky-950 text-sky-800 dark:text-sky-300',
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
