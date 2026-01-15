'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { HeadingProps, TextColor } from './typography.types';
import {
  fontWeightClasses,
  textColorClasses,
  alignClasses,
  headingSizeClasses,
  isNamedColor,
} from './typography.classes';

/**
 * Heading component for semantic headings (h1-h6).
 * Supports anchor links via the id prop.
 */
const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      children,
      level = 1,
      size = 'xl',
      weight = 'bold',
      color = 'primary',
      align = 'left',
      margin = 'my-4',
      truncate = false,
      id,
      className,
      ...props
    },
    ref,
  ) => {
    const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    const colorClass = isNamedColor(color as string)
      ? textColorClasses[color as TextColor]
      : '';

    return (
      <Tag
        ref={ref}
        id={id}
        className={cn(
          headingSizeClasses[size],
          fontWeightClasses[weight],
          colorClass,
          alignClasses[align],
          margin,
          truncate && 'truncate',
          // Add scroll margin for anchor navigation
          id && 'scroll-mt-20',
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

Heading.displayName = 'Heading';
export default Heading;
export type { HeadingProps };
