'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { LabelProps, TextColor } from './typography.types';
import {
  textColorClasses,
  fontWeightClasses,
  labelSizeClasses,
  isNamedColor,
} from './typography.classes';

/**
 * Label component for form elements with semantic HTML.
 * Uses the <label> element with proper htmlFor support.
 */
const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      children,
      className,
      htmlFor,
      size = 'sm',
      color = 'primary',
      fontWeight = 'bold',
      required = false,
      ...props
    },
    ref,
  ) => {
    const colorClass = isNamedColor(color as string)
      ? textColorClasses[color as TextColor]
      : '';

    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={cn(
          labelSizeClasses[size],
          colorClass,
          fontWeightClasses[fontWeight],
          className,
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-0.5 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  },
);

Label.displayName = 'Label';
export default Label;
export type { LabelProps };
