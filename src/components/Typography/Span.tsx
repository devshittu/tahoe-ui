'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { SpanProps, TextColor } from './typography.types';
import {
  fontFamilyClasses,
  fontWeightClasses,
  textColorClasses,
  alignClasses,
  lineHeightClasses,
  letterSpacingClasses,
  textTransformClasses,
  textDecorationClasses,
  isNamedColor,
} from './typography.classes';

/**
 * Span component for inline text styling.
 * Uses the semantic <span> element with forwardRef support.
 */
const Span = forwardRef<HTMLSpanElement, SpanProps>(
  (
    {
      children,
      className,
      fontFamily = 'primary',
      fontWeight = 'regular',
      color = 'primary',
      align,
      lineHeight = 'normal',
      letterSpacing = 'normal',
      textTransform = 'none',
      textDecoration = 'none',
      truncate = false,
      ...props
    },
    ref,
  ) => {
    const colorClass = isNamedColor(color as string)
      ? textColorClasses[color as TextColor]
      : '';

    return (
      <span
        ref={ref}
        className={cn(
          fontFamilyClasses[fontFamily],
          fontWeightClasses[fontWeight],
          colorClass,
          align && alignClasses[align],
          lineHeightClasses[lineHeight],
          letterSpacingClasses[letterSpacing],
          textTransformClasses[textTransform],
          textDecorationClasses[textDecoration],
          truncate && 'truncate',
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Span.displayName = 'Span';
export default Span;
export type { SpanProps };
