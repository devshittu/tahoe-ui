'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { EmphasisProps, TextColor } from './typography.types';
import { textColorClasses, isNamedColor } from './typography.classes';

/**
 * Emphasis component for italic text with semantic HTML.
 * Uses the <em> element for proper accessibility and SEO.
 */
const Emphasis = forwardRef<HTMLElement, EmphasisProps>(
  ({ children, className, color = 'primary', ...props }, ref) => {
    const colorClass = isNamedColor(color as string)
      ? textColorClasses[color as TextColor]
      : '';

    return (
      <em ref={ref} className={cn('italic', colorClass, className)} {...props}>
        {children}
      </em>
    );
  },
);

Emphasis.displayName = 'Emphasis';
export default Emphasis;
export type { EmphasisProps };
