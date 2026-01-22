'use client';

import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import type { HeadlineProps } from './types';
import { HEADLINE_SIZE_CONFIG, HEADLINE_ALIGN_CLASSES } from './types';

/**
 * Headline - Apple-style page headline with fluid typography
 *
 * Features:
 * - Fluid responsive sizing
 * - CSS text-wrap: balance for optimal line breaks
 * - Semantic HTML (h1-h6)
 * - Tight letter-spacing for large text
 *
 * Design Principles:
 * - #2 Visual Hierarchy: Weight and scale establish importance
 * - #5 Typography as Interface: Type establishes voice
 * - #20 Timeless Over Trendy: Clean, enduring typography
 *
 * @example
 * ```tsx
 * <Headline size="large" level={1}>
 *   Welcome to the future
 * </Headline>
 * ```
 */
const Headline = forwardRef<HTMLHeadingElement, HeadlineProps>(
  (
    {
      children,
      size = 'large',
      level = 1,
      align = 'center',
      balanced = true,
      className,
      ...props
    },
    ref,
  ) => {
    const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    const config = HEADLINE_SIZE_CONFIG[size];

    return (
      <Tag
        ref={ref}
        className={twMerge(
          // Size and tracking
          config.headline,
          config.tracking,
          // Weight
          'font-bold',
          // Color - CSS variable-backed
          'text-text-primary dark:text-text-primary',
          // Alignment
          HEADLINE_ALIGN_CLASSES[align],
          // Text wrap balance for optimal line breaks
          balanced && 'text-balance',
          // Scroll margin for anchor navigation
          props.id && 'scroll-mt-20',
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

Headline.displayName = 'Headline';
export { Headline };
export default Headline;
