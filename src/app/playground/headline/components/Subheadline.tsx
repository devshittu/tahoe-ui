// src/app/playground/headline/components/Subheadline.tsx
'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { SubheadlineProps } from './types';
import { HEADLINE_SIZE_CONFIG, HEADLINE_ALIGN_CLASSES } from './types';

/**
 * Subheadline - Supporting text for headlines
 *
 * Features:
 * - Complementary sizing to Headline
 * - Muted color for visual hierarchy
 * - CSS text-wrap: balance support
 *
 * Design Principles:
 * - #2 Visual Hierarchy: Recedes to support headline
 * - #3 Intentional White Space: Proper spacing in composition
 */
const Subheadline = forwardRef<HTMLParagraphElement, SubheadlineProps>(
  (
    {
      children,
      size = 'large',
      align = 'center',
      balanced = true,
      className,
      ...props
    },
    ref,
  ) => {
    const config = HEADLINE_SIZE_CONFIG[size];

    return (
      <p
        ref={ref}
        className={cn(
          // Size
          config.subheadline,
          // Color - muted for visual hierarchy
          'text-gray-600 dark:text-gray-400',
          // Weight
          'font-normal',
          // Alignment
          HEADLINE_ALIGN_CLASSES[align],
          // Text wrap balance
          balanced && 'text-balance',
          // Max width for readability
          'max-w-3xl',
          align === 'center' && 'mx-auto',
          className,
        )}
        {...props}
      >
        {children}
      </p>
    );
  },
);

Subheadline.displayName = 'Subheadline';
export { Subheadline };
export default Subheadline;
