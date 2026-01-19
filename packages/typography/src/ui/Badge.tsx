'use client';

import React, { ReactNode } from 'react';
import { cn } from '@tahoe-ui/core';
import type { BadgeVariant, BadgeColor, BadgeSize } from '../types';
import { badgeVariantClasses, badgeSizeClasses } from '../classes';

/**
 * Badge - Status and label badge component
 *
 * Compact visual indicators for status, categories, or counts.
 * Supports multiple variants and colors.
 *
 * @example
 * ```tsx
 * <Badge color="success">Active</Badge>
 * <Badge variant="outlined" color="warning">Pending</Badge>
 * <Badge variant="ghost" color="error">3 errors</Badge>
 * ```
 */
export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  className?: string;
}

function Badge({
  children,
  variant = 'filled',
  color = 'primary',
  size = 'sm',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium',
        badgeVariantClasses[variant][color],
        badgeSizeClasses[size],
        className,
      )}
    >
      {children}
    </span>
  );
}

Badge.displayName = 'Badge';

export { Badge };
export default Badge;
