// src/app/playground/badge/components/Badge.tsx

'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import {
  BadgeProps,
  BADGE_SIZE_CONFIG,
  BADGE_COLOR_CONFIG,
  formatBadgeContent,
} from './types';

/**
 * Badge - Small status indicator for counts and labels
 *
 * Design Principles Applied:
 * - #2 Visual Hierarchy: Semantic colors indicate meaning
 * - #3 Intentional White Space: Compact sizing on 8pt grid
 * - #6 Purposeful Motion: Optional pulse for attention
 * - #9 Obvious Affordances: Clear visual distinction
 *
 * Features:
 * - Four variants: solid, soft, outline, dot
 * - Six semantic colors
 * - Three sizes
 * - Max number support (shows "99+")
 * - Pulse animation option
 * - Dark mode support
 *
 * @example
 * ```tsx
 * <Badge>New</Badge>
 * <Badge color="error" variant="solid">5</Badge>
 * <Badge color="success" dot />
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    children,
    color = 'default',
    variant = 'solid',
    size = 'md',
    max = 99,
    dot = false,
    pulse = false,
    className,
  },
  ref,
) {
  const sizeConfig = BADGE_SIZE_CONFIG[size];
  const colorConfig = BADGE_COLOR_CONFIG[dot ? 'dot' : variant][color];
  const content = formatBadgeContent(children, max);

  // Dot-only badge
  if (dot || variant === 'dot') {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex rounded-full',
          sizeConfig.dotSize,
          colorConfig.bg,
          pulse && 'animate-pulse',
          className,
        )}
        aria-hidden="true"
      />
    );
  }

  return (
    <span
      ref={ref}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center',
        'rounded-full font-medium leading-none',
        'whitespace-nowrap',

        // Size
        sizeConfig.padding,
        sizeConfig.minSize,
        sizeConfig.height,
        sizeConfig.fontSize,

        // Colors
        colorConfig.bg,
        colorConfig.text,
        colorConfig.border,

        // Animation
        pulse && 'animate-pulse',

        className,
      )}
    >
      {content}
    </span>
  );
});

Badge.displayName = 'Badge';
