'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { ColorTextProps, ColorScheme } from './typography.types';
import { colorSchemeClasses, gradientClasses } from './typography.classes';

/**
 * ColorText component for colored text with optional gradient.
 * Uses static Tailwind classes for JIT safety.
 */
const ColorText = forwardRef<HTMLSpanElement, ColorTextProps>(
  (
    { children, colorScheme = 'blue', gradient = false, className, ...props },
    ref,
  ) => {
    const classes = gradient
      ? gradientClasses[colorScheme as ColorScheme]
      : colorSchemeClasses[colorScheme as ColorScheme];

    return (
      <span ref={ref} className={cn(classes, className)} {...props}>
        {children}
      </span>
    );
  },
);

ColorText.displayName = 'ColorText';
export default ColorText;
export type { ColorTextProps, ColorScheme };
