'use client';

import React, { forwardRef, memo } from 'react';
import { cn } from '@tahoe-ui/core';
import { Button } from './Button';
import type { IconButtonProps } from './types';

/**
 * IconButton Component
 *
 * A button designed to display only an icon, ensuring accessibility via aria-label.
 * Uses the physics-based Button component as its foundation.
 *
 * @example
 * ```tsx
 * import { IconButton } from '@tahoe-ui/button';
 * import { FiPlus, FiTrash } from 'react-icons/fi';
 *
 * <IconButton
 *   ariaLabel="Add item"
 *   icon={<FiPlus />}
 * />
 *
 * <IconButton
 *   ariaLabel="Delete item"
 *   icon={<FiTrash />}
 *   color="error"
 *   variant="ghost"
 * />
 * ```
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      ariaLabel,
      icon,
      iconPosition = 'left',
      className = '',
      variant = 'solid',
      color = 'primary',
      size = 'md',
      radius = 'full',
      isLoading = false,
      fullWidth = false,
      spinner,
      disabled,
      ...rest
    },
    ref,
  ) => {
    if (!ariaLabel && process.env.NODE_ENV === 'development') {
      console.warn(
        'Accessibility Warning: IconButton requires an ariaLabel for screen readers.',
      );
    }

    /**
     * Combine class names for icon-only button styling
     */
    const combinedClassName = cn(
      className,
      // Override padding to make the button square
      size === 'xs' && 'p-1',
      size === 'sm' && 'p-2',
      size === 'md' && 'p-3',
      size === 'lg' && 'p-4',
      size === 'xl' && 'p-5',
    );

    /**
     * Icon element wrapped for consistent rendering
     */
    const iconElement = (
      <span className="flex items-center justify-center">{icon}</span>
    );

    return (
      <Button
        ref={ref}
        variant={variant}
        color={color}
        size={size}
        radius={radius}
        isLoading={isLoading}
        fullWidth={fullWidth}
        spinner={spinner}
        disabled={disabled}
        aria-label={ariaLabel}
        className={combinedClassName}
        {...rest}
      >
        {isLoading
          ? spinner || (
              <svg
                className="animate-spin h-5 w-5 text-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            )
          : iconElement}
      </Button>
    );
  },
);

IconButton.displayName = 'IconButton';

export default memo(IconButton);
export { IconButton };
