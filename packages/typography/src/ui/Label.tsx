'use client';

import React, { forwardRef } from 'react';
import { cn } from '@tahoe-ui/core';
import type { LabelProps, TextColor } from '../types';
import {
  textColorClasses,
  fontWeightClasses,
  labelSizeClasses,
  isNamedColor,
} from '../classes';

/**
 * Label - Form label component
 *
 * Uses the semantic <label> element with proper htmlFor support.
 * Includes optional required indicator.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email" required>
 *   Email Address
 * </Label>
 * <input id="email" type="email" />
 * ```
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

export { Label };
export default Label;
