'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import type { SpinnerProps, FeedbackColor, FeedbackSize } from './types';
import { SIZE_SCALE } from './types';

// Spinner color mappings
const SPINNER_COLORS: Record<FeedbackColor, string> = {
  default: 'border-gray-600 dark:border-gray-400',
  primary: 'border-blue-600 dark:border-blue-500',
  secondary: 'border-gray-500',
  success: 'border-green-600 dark:border-green-500',
  warning: 'border-amber-500',
  error: 'border-red-600 dark:border-red-500',
  info: 'border-sky-600 dark:border-sky-500',
};

const DOT_COLORS: Record<FeedbackColor, string> = {
  default: 'bg-gray-600 dark:bg-gray-400',
  primary: 'bg-blue-600 dark:bg-blue-500',
  secondary: 'bg-gray-500',
  success: 'bg-green-600 dark:bg-green-500',
  warning: 'bg-amber-500',
  error: 'bg-red-600 dark:bg-red-500',
  info: 'bg-sky-600 dark:bg-sky-500',
};

/**
 * Loading spinner component with multiple visual variants.
 *
 * @example
 * ```tsx
 * // Default border spinner
 * <Spinner />
 *
 * // Dots variant
 * <Spinner variant="dots" color="primary" />
 *
 * // Ring variant with custom size
 * <Spinner variant="ring" size={48} />
 *
 * // With accessible label
 * <Spinner label="Loading content..." />
 * ```
 */
export function Spinner({
  variant = 'border',
  size = 'md',
  color = 'primary',
  label = 'Loading...',
  className,
}: SpinnerProps) {
  const numericSize = typeof size === 'number' ? size : SIZE_SCALE[size];

  // Border spinner (classic spinning circle)
  if (variant === 'border') {
    return (
      <div
        role="status"
        aria-label={label}
        className={twMerge(
          'inline-block animate-spin rounded-full',
          'border-2 border-solid border-current border-r-transparent',
          SPINNER_COLORS[color],
          className,
        )}
        style={{
          width: numericSize,
          height: numericSize,
        }}
      >
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  // Dots spinner (three bouncing dots)
  if (variant === 'dots') {
    const dotSize = Math.max(4, numericSize / 4);
    const gap = Math.max(2, numericSize / 8);

    return (
      <div
        role="status"
        aria-label={label}
        className={twMerge('inline-flex items-center', className)}
        style={{ gap }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={twMerge(
              'rounded-full animate-bounce',
              DOT_COLORS[color],
            )}
            style={{
              width: dotSize,
              height: dotSize,
              animationDelay: `${i * 150}ms`,
              animationDuration: '600ms',
            }}
          />
        ))}
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  // Ring spinner (SVG-based with gradient)
  return (
    <div
      role="status"
      aria-label={label}
      className={twMerge('inline-block', className)}
      style={{ width: numericSize, height: numericSize }}
    >
      <svg
        className="animate-spin"
        viewBox="0 0 50 50"
        width={numericSize}
        height={numericSize}
      >
        {/* Background ring */}
        <circle
          className="stroke-gray-200 dark:stroke-gray-700"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
        {/* Animated arc */}
        <circle
          className={twMerge(
            SPINNER_COLORS[color].replace('border-', 'stroke-'),
          )}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="31.4 94.2" // ~1/4 of circumference
          transform="rotate(-90 25 25)"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}

/**
 * Full-page loading overlay with spinner
 */
export function LoadingOverlay({
  label = 'Loading...',
  showLabel = false,
  color = 'primary',
  className,
}: {
  label?: string;
  showLabel?: boolean;
  color?: FeedbackColor;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        'fixed inset-0 z-50 flex flex-col items-center justify-center',
        'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm',
        className,
      )}
    >
      <Spinner size="lg" color={color} label={label} />
      {showLabel && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{label}</p>
      )}
    </div>
  );
}

export default Spinner;
