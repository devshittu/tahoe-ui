'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { ParagraphProps, TextColor } from './typography.types';
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
 * Paragraph component for block-level text content.
 * Uses the semantic <p> element.
 */
const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  (
    {
      children,
      className,
      fontFamily = 'primary',
      fontWeight = 'regular',
      color = 'primary',
      align = 'left',
      lineHeight = 'normal',
      letterSpacing = 'normal',
      textTransform = 'none',
      textDecoration = 'none',
      truncate = false,
      margin = 'my-2',
      ...props
    },
    ref,
  ) => {
    const colorClass = isNamedColor(color as string)
      ? textColorClasses[color as TextColor]
      : '';

    return (
      <p
        ref={ref}
        className={cn(
          fontFamilyClasses[fontFamily],
          fontWeightClasses[fontWeight],
          colorClass,
          alignClasses[align],
          lineHeightClasses[lineHeight],
          letterSpacingClasses[letterSpacing],
          textTransformClasses[textTransform],
          textDecorationClasses[textDecoration],
          truncate && 'truncate',
          margin,
          className,
        )}
        {...props}
      >
        {children}
      </p>
    );
  },
);

Paragraph.displayName = 'Paragraph';
export default Paragraph;
export type { ParagraphProps };
