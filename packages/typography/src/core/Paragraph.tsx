'use client';

import React, { forwardRef } from 'react';
import { cn } from '@tahoe-ui/core';
import type { ParagraphProps, TextColor } from '../types';
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
 * Paragraph - Block-level text component
 *
 * Uses the semantic <p> element for block-level text content.
 * Includes configurable margin for proper document flow.
 *
 * @example
 * ```tsx
 * <Paragraph>
 *   This is a standard paragraph with default styling.
 * </Paragraph>
 *
 * <Paragraph color="secondary" margin="my-4">
 *   Secondary paragraph with custom margin.
 * </Paragraph>
 * ```
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

export { Paragraph };
export default Paragraph;
