'use client';

import React, { forwardRef, memo } from 'react';
import { cn } from '@tahoe-ui/core';
import { Button } from './Button';
import type { ButtonProps } from './types';

/**
 * GlassButton Component
 *
 * A button with glassmorphism styling applied.
 * Note: The base Button now has a 'glass' variant built-in.
 * This component exists for backwards compatibility and additional customization.
 *
 * @example
 * ```tsx
 * import { GlassButton } from '@tahoe-ui/button';
 *
 * <GlassButton>
 *   Glassmorphism Button
 * </GlassButton>
 *
 * <GlassButton color="accent">
 *   Accent Glass Button
 * </GlassButton>
 * ```
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
    const glassStyles = cn(
      'backdrop-saturate-150',
      'transition duration-200 ease-in-out',
    );

    const combinedClassName = cn(glassStyles, className);

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

export default memo(GlassButton);
export { GlassButton };
