'use client';

import React, { forwardRef } from 'react';
import { cn } from '@tahoe-ui/core';
import type { StrongProps, TextColor } from '../types';
import { textColorClasses, isNamedColor } from '../classes';

/**
 * Strong - Semantic bold text component
 *
 * Uses the <strong> element for proper accessibility and SEO.
 * Indicates content with strong importance.
 *
 * @example
 * ```tsx
 * <Paragraph>
 *   Please read the <Strong>terms and conditions</Strong> carefully.
 * </Paragraph>
 * ```
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

export { Strong };
export default Strong;
