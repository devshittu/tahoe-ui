'use client';

import React, { forwardRef } from 'react';
import { cn } from '@tahoe-ui/core';
import type { TextProps, TextColor } from '../types';
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
 * Text - Base inline text component
 *
 * The foundation for all inline text styling. Renders a <span> element
 * with comprehensive typography controls.
 *
 * @example
 * ```tsx
 * <Text color="secondary" fontWeight="medium">
 *   Secondary text content
 * </Text>
 *
 * <Text truncate className="max-w-xs">
 *   Long text that will be truncated...
 * </Text>
 * ```
 */
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

export { Text };
export default Text;
