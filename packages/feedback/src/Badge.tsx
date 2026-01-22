'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import type {
  BadgeProps,
  BadgeVariant,
  FeedbackColor,
  FeedbackSize,
} from './types';
import {
  FEEDBACK_COLORS,
  FEEDBACK_TEXT_COLORS,
  FEEDBACK_BORDER_COLORS,
  FEEDBACK_BG_SOFT,
} from './types';

/**
 * Badge size configuration
 */
const BADGE_SIZE_CONFIG: Record<
  FeedbackSize,
  { padding: string; fontSize: string; height: string; dotSize: string }
> = {
  sm: {
    padding: 'px-1.5',
    fontSize: 'text-[10px]',
    height: 'h-4',
    dotSize: 'w-2 h-2',
  },
  md: {
    padding: 'px-2',
    fontSize: 'text-xs',
    height: 'h-5',
    dotSize: 'w-2.5 h-2.5',
  },
  lg: {
    padding: 'px-2.5',
    fontSize: 'text-sm',
    height: 'h-6',
    dotSize: 'w-3 h-3',
  },
};

/**
 * Get badge variant styles
 */
function getBadgeVariantStyles(
  variant: BadgeVariant,
  color: FeedbackColor,
): string {
  switch (variant) {
    case 'filled':
      return twMerge(FEEDBACK_COLORS[color], 'text-white');
    case 'outlined':
      return twMerge(
        'bg-transparent border',
        FEEDBACK_BORDER_COLORS[color],
        FEEDBACK_TEXT_COLORS[color],
      );
    case 'soft':
      return twMerge(FEEDBACK_BG_SOFT[color], FEEDBACK_TEXT_COLORS[color]);
    case 'dot':
      return FEEDBACK_COLORS[color];
    default:
      return twMerge(FEEDBACK_COLORS[color], 'text-white');
  }
}

/**
 * Badge - Small status indicator
 *
 * Used for counts, labels, and status indicators.
 *
 * @example
 * ```tsx
 * <Badge>New</Badge>
 * <Badge color="error" variant="filled">5</Badge>
 * <Badge color="success" variant="soft">Active</Badge>
 * ```
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(
    {
      children,
      variant = 'filled',
      color = 'default',
      size = 'md',
      pill = true,
      className,
    },
    ref,
  ) {
    const sizeConfig = BADGE_SIZE_CONFIG[size];
    const variantStyles = getBadgeVariantStyles(variant, color);

    // Dot-only badge
    if (variant === 'dot') {
      return (
        <span
          ref={ref}
          className={twMerge(
            'inline-flex rounded-full',
            sizeConfig.dotSize,
            variantStyles,
            className,
          )}
          aria-hidden="true"
        />
      );
    }

    return (
      <span
        ref={ref}
        className={twMerge(
          // Base styles
          'inline-flex items-center justify-center',
          'font-medium leading-none whitespace-nowrap',
          pill ? 'rounded-full' : 'rounded-md',

          // Size
          sizeConfig.padding,
          sizeConfig.height,
          sizeConfig.fontSize,

          // Variant
          variantStyles,

          className,
        )}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';

/**
 * StatusDot - Simple colored dot indicator
 *
 * @example
 * ```tsx
 * <StatusDot color="success" />
 * <StatusDot color="error" pulse />
 * ```
 */
export interface StatusDotProps {
  /** Color variant */
  color?: FeedbackColor;
  /** Size variant */
  size?: FeedbackSize;
  /** Pulse animation */
  pulse?: boolean;
  /** Additional className */
  className?: string;
}

export const StatusDot = React.forwardRef<HTMLSpanElement, StatusDotProps>(
  function StatusDot(
    { color = 'default', size = 'md', pulse = false, className },
    ref,
  ) {
    const sizeConfig = BADGE_SIZE_CONFIG[size];

    return (
      <span
        ref={ref}
        className={twMerge(
          'inline-flex rounded-full',
          sizeConfig.dotSize,
          FEEDBACK_COLORS[color],
          pulse ? 'animate-pulse' : '',
          className,
        )}
        aria-hidden="true"
      />
    );
  },
);

StatusDot.displayName = 'StatusDot';

/**
 * CountBadge - Badge optimized for numeric counts
 *
 * Automatically formats numbers and shows "99+" for large values.
 *
 * @example
 * ```tsx
 * <CountBadge count={5} />
 * <CountBadge count={150} max={99} /> // Shows "99+"
 * ```
 */
export interface CountBadgeProps {
  /** Numeric count to display */
  count: number;
  /** Maximum count before showing "+" suffix */
  max?: number;
  /** Color variant */
  color?: FeedbackColor;
  /** Size variant */
  size?: FeedbackSize;
  /** Show badge when count is 0 */
  showZero?: boolean;
  /** Additional className */
  className?: string;
}

export const CountBadge = React.forwardRef<HTMLSpanElement, CountBadgeProps>(
  function CountBadge(
    {
      count,
      max = 99,
      color = 'error',
      size = 'sm',
      showZero = false,
      className,
    },
    ref,
  ) {
    // Hide if count is 0 and showZero is false
    if (count === 0 && !showZero) {
      return null;
    }

    const displayValue = count > max ? `${max}+` : String(count);

    return (
      <Badge ref={ref} color={color} size={size} className={className}>
        {displayValue}
      </Badge>
    );
  },
);

CountBadge.displayName = 'CountBadge';
