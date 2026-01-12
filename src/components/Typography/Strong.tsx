'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { StrongProps, TextColor } from './typography.types';
import { textColorClasses, isNamedColor } from './typography.classes';

/**
 * Strong component for emphasized text with semantic HTML.
 * Uses the <strong> element for proper accessibility and SEO.
 */
const Strong = forwardRef<HTMLElement, StrongProps>(
  ({ children, className, color = 'primary', ...props }, ref) => {
    const colorClass = isNamedColor(color as string)
      ? textColorClasses[color as TextColor]
      : '';

    return (
      <strong
        ref={ref}
        className={cn('font-bold', colorClass, className)}
        {...props}
      >
        {children}
      </strong>
    );
  },
);

Strong.displayName = 'Strong';
export default Strong;
export type { StrongProps };
