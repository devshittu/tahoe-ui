'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import type { ProgressProps, FeedbackColor, FeedbackSize } from './types';

// Size mappings for height
const SIZE_HEIGHT: Record<FeedbackSize, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

// Color mappings for progress bar (CSS variable-backed via @tahoe-ui/tailwind-preset)
const PROGRESS_COLORS: Record<FeedbackColor, string> = {
  default: 'bg-gray-600 dark:bg-gray-400',
  primary: 'bg-brand-primary-600 dark:bg-brand-primary-500',
  secondary: 'bg-gray-500',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-info',
};

/**
 * Progress bar component for showing completion status.
 *
 * @example
 * ```tsx
 * // Determinate progress
 * <Progress value={75} />
 *
 * // Indeterminate (loading)
 * <Progress />
 *
 * // With label
 * <Progress value={50} showLabel />
 *
 * // Striped animated
 * <Progress value={60} striped animated color="success" />
 * ```
 */
export function Progress({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel = false,
  label,
  striped = false,
  animated = false,
  className,
}: ProgressProps) {
  const isIndeterminate = value === undefined;
  const percentage = isIndeterminate
    ? 0
    : Math.min(100, Math.max(0, (value / max) * 100));

  // Accessibility attributes
  const a11yProps = isIndeterminate
    ? {
        'aria-busy': true as const,
        'aria-valuemin': undefined,
        'aria-valuemax': undefined,
        'aria-valuenow': undefined,
      }
    : {
        'aria-busy': false as const,
        'aria-valuemin': 0,
        'aria-valuemax': max,
        'aria-valuenow': value,
      };

  return (
    <div className={twMerge('w-full', className)}>
      {/* Label row */}
      {(showLabel || label) && (
        <div className="flex justify-between mb-1 text-sm">
          <span className="text-text-primary">{label ?? 'Progress'}</span>
          {showLabel && !isIndeterminate && (
            <span className="text-text-secondary">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      {/* Progress track */}
      <div
        role="progressbar"
        {...a11yProps}
        className={twMerge(
          'w-full overflow-hidden rounded-full',
          'bg-gray-200 dark:bg-gray-700',
          SIZE_HEIGHT[size],
        )}
      >
        {/* Progress bar */}
        <div
          className={twMerge(
            'h-full rounded-full transition-all duration-300 ease-out',
            PROGRESS_COLORS[color],
            // Indeterminate animation
            isIndeterminate && 'animate-progress-indeterminate',
            // Striped pattern
            striped && 'bg-stripes bg-[length:1rem_1rem]',
            // Animated stripes
            striped && animated && 'animate-progress-stripes',
          )}
          style={{
            width: isIndeterminate ? '30%' : `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

/**
 * Circular progress indicator
 */
export function CircularProgress({
  value,
  size = 'md',
  color = 'primary',
  showLabel = false,
  className,
}: Omit<ProgressProps, 'striped' | 'animated' | 'label' | 'max'> & {
  size?: FeedbackSize | number;
}) {
  const isIndeterminate = value === undefined;
  const percentage = isIndeterminate ? 0 : Math.min(100, Math.max(0, value));

  // Size calculations
  const numericSize =
    typeof size === 'number' ? size : { sm: 24, md: 40, lg: 56 }[size];
  const strokeWidth = numericSize < 32 ? 3 : 4;
  const radius = (numericSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = isIndeterminate
    ? 0
    : circumference - (percentage / 100) * circumference;

  // Color for stroke (CSS variable-backed via @tahoe-ui/tailwind-preset)
  const strokeColors: Record<FeedbackColor, string> = {
    default: 'stroke-gray-600 dark:stroke-gray-400',
    primary: 'stroke-brand-primary-600 dark:stroke-brand-primary-500',
    secondary: 'stroke-gray-500',
    success: 'stroke-success',
    warning: 'stroke-warning',
    error: 'stroke-error',
    info: 'stroke-info',
  };

  return (
    <div
      className={twMerge('relative inline-flex', className)}
      style={{ width: numericSize, height: numericSize }}
    >
      <svg
        className={twMerge(
          'transform -rotate-90',
          isIndeterminate && 'animate-spin',
        )}
        width={numericSize}
        height={numericSize}
        role="progressbar"
        aria-valuemin={isIndeterminate ? undefined : 0}
        aria-valuemax={isIndeterminate ? undefined : 100}
        aria-valuenow={isIndeterminate ? undefined : percentage}
      >
        {/* Background track */}
        <circle
          className="stroke-gray-200 dark:stroke-gray-700"
          fill="none"
          strokeWidth={strokeWidth}
          cx={numericSize / 2}
          cy={numericSize / 2}
          r={radius}
        />
        {/* Progress arc */}
        <circle
          className={twMerge(
            'transition-all duration-300 ease-out',
            strokeColors[color],
          )}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          cx={numericSize / 2}
          cy={numericSize / 2}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={isIndeterminate ? circumference * 0.75 : offset}
        />
      </svg>

      {/* Center label */}
      {showLabel && !isIndeterminate && numericSize >= 40 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-xs font-medium text-text-primary"
            style={{ fontSize: numericSize * 0.25 }}
          >
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}

export default Progress;
