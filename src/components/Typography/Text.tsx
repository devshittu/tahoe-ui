'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { TextProps, TextColor } from './typography.types';
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

const Text = forwardRef<HTMLSpanElement, TextProps>(
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
    // Determine color class - use named color if available, otherwise empty
    const colorClass = isNamedColor(color as string)
      ? textColorClasses[color as TextColor]
      : '';

    const computedClasses = cn(
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
    );

    return (
      <span ref={ref} className={computedClasses} {...props}>
        {children}
      </span>
    );
  },
);

Text.displayName = 'Text';
export default Text;
export type { TextProps };
