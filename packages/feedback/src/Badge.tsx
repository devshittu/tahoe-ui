'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import type { BadgeProps, BadgeVariant, FeedbackColor, FeedbackSize } from './types';

// Variant + Color style mappings
const getBadgeStyles = (variant: BadgeVariant, color: FeedbackColor): string => {
  const styles: Record<BadgeVariant, Record<FeedbackColor, string>> = {
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
      default: 'border border-gray-400 text-gray-700 dark:text-gray-300',
      primary: 'border border-blue-500 text-blue-700 dark:text-blue-400',
      secondary: 'border border-gray-400 text-gray-600 dark:text-gray-400',
      success: 'border border-green-500 text-green-700 dark:text-green-400',
      warning: 'border border-amber-500 text-amber-700 dark:text-amber-400',
      error: 'border border-red-500 text-red-700 dark:text-red-400',
      info: 'border border-sky-500 text-sky-700 dark:text-sky-400',
    },
    soft: {
      default: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
      primary: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300',
      secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
      success: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300',
      warning: 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300',
      error: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300',
      info: 'bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-300',
    },
    dot: {
      default: 'bg-gray-600',
      primary: 'bg-blue-600',
      secondary: 'bg-gray-500',
      success: 'bg-green-600',
      warning: 'bg-amber-500',
      error: 'bg-red-600',
      info: 'bg-sky-600',
    },
  };

  return styles[variant][color];
};

// Size mappings
const BADGE_SIZES: Record<FeedbackSize, string> = {
  sm: 'text-xs px-1.5 py-0.5',
  md: 'text-xs px-2 py-1',
  lg: 'text-sm px-2.5 py-1',
};

const DOT_SIZES: Record<FeedbackSize, string> = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
};

/**
 * Badge component for status indicators, labels, and counts.
 *
 * @example
 * ```tsx
 * // Basic badge
 * <Badge>New</Badge>
 *
 * // Colored variants
 * <Badge color="success">Active</Badge>
 * <Badge color="error">Urgent</Badge>
 *
 * // Style variants
 * <Badge variant="outlined" color="primary">Draft</Badge>
 * <Badge variant="soft" color="warning">Pending</Badge>
 *
 * // Dot indicator
 * <Badge variant="dot" color="success" />
 *
 * // Pill shape
 * <Badge pill color="primary">99+</Badge>
 * ```
 */
export function Badge({
  children,
  variant = 'filled',
  color = 'default',
  size = 'md',
  pill = false,
  className,
}: BadgeProps) {
  // Dot variant (no children needed)
  if (variant === 'dot') {
    return (
      <span
        className={twMerge(
          'inline-block rounded-full',
          DOT_SIZES[size],
          getBadgeStyles('dot', color),
          className
        )}
        aria-hidden="true"
      />
    );
  }

  return (
    <span
      className={twMerge(
        'inline-flex items-center justify-center font-medium',
        pill ? 'rounded-full' : 'rounded',
        BADGE_SIZES[size],
        getBadgeStyles(variant, color),
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * Status dot with optional label
 */
export function StatusDot({
  color = 'default',
  size = 'md',
  label,
  className,
}: {
  color?: FeedbackColor;
  size?: FeedbackSize;
  label?: string;
  className?: string;
}) {
  return (
    <span className={twMerge('inline-flex items-center gap-1.5', className)}>
      <Badge variant="dot" color={color} size={size} />
      {label && (
        <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
      )}
    </span>
  );
}

/**
 * Count badge (e.g., notification count)
 */
export function CountBadge({
  count,
  max = 99,
  color = 'error',
  size = 'sm',
  showZero = false,
  className,
}: {
  count: number;
  max?: number;
  color?: FeedbackColor;
  size?: FeedbackSize;
  showZero?: boolean;
  className?: string;
}) {
  if (count === 0 && !showZero) {
    return null;
  }

  const displayValue = count > max ? `${max}+` : count.toString();

  return (
    <Badge
      variant="filled"
      color={color}
      size={size}
      pill
      className={twMerge('min-w-[1.25rem]', className)}
    >
      {displayValue}
    </Badge>
  );
}

export default Badge;
