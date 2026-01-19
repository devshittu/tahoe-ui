'use client';

import React, { forwardRef } from 'react';
import { cn } from '@tahoe-ui/core';
import type { SpanProps, TextColor } from '../types';
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
} from '../classes';

/**
 * Span - Inline text styling component
 *
 * Uses the semantic <span> element with full typography controls.
 * Functionally similar to Text but with more explicit naming.
 *
 * @example
 * ```tsx
 * <Span fontWeight="bold" color="accent">
 *   Highlighted inline text
 * </Span>
 * ```
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

export { Span };
export default Span;
