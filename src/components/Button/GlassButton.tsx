// src/components/Button/GlassButton.tsx
'use client';

import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import type { ButtonProps } from './types';

/**
 * GlassButton Component
 *
 * A button with glassmorphism styling applied.
 * Note: The base Button now has a 'glass' variant built-in.
 * This component exists for backwards compatibility and additional customization.
 */
const GlassButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'glass',
      color = 'primary',
      size = 'md',
      radius = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      ...rest
    },
    ref,
  ) => {
    /**
     * Additional glassmorphism styles for enhanced effect
     */
    const glassStyles = clsx(
      'backdrop-saturate-150',
      'transition duration-200 ease-in-out',
    );

    const combinedClassName = twMerge(glassStyles, className);

    return (
      <Button
        {...rest}
        ref={ref}
        variant={variant}
        color={color}
        size={size}
        radius={radius}
        isLoading={isLoading}
        fullWidth={fullWidth}
        disabled={disabled}
        className={combinedClassName}
      />
    );
  },
);

GlassButton.displayName = 'GlassButton';
export default React.memo(GlassButton);
