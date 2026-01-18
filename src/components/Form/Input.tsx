// src/components/Form/Input.tsx
'use client';

import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Input - Text input component with variants and validation states
 *
 * A flexible input component supporting text, email, password, number,
 * and other standard input types with consistent styling and validation states.
 *
 * Reference: design-principles.md
 * - #9 Obvious Affordances: Touch targets 44px minimum
 * - #12 Accessibility: WCAG AA contrast, focus states
 * - #19 Immediate Feedback: Clear validation states
 */

export type InputVariant = 'default' | 'filled' | 'outlined';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputState = 'error' | 'success' | undefined;

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  /** Visual variant */
  variant?: InputVariant;
  /** Input size */
  size?: InputSize;
  /** Validation state */
  state?: InputState;
  /** Left icon/addon */
  leftIcon?: ReactNode;
  /** Right icon/addon */
  rightIcon?: ReactNode;
  /** Full width */
  fullWidth?: boolean;
}

const variantClasses: Record<InputVariant, string> = {
  default: cn(
    'bg-white dark:bg-gray-900',
    'border border-gray-200 dark:border-gray-700',
    'focus:border-gray-400 dark:focus:border-gray-500',
  ),
  filled: cn(
    'bg-gray-100 dark:bg-gray-800',
    'border border-transparent',
    'focus:bg-white dark:focus:bg-gray-900',
    'focus:border-gray-300 dark:focus:border-gray-600',
  ),
  outlined: cn(
    'bg-transparent',
    'border-2 border-gray-300 dark:border-gray-600',
    'focus:border-gray-900 dark:focus:border-gray-100',
  ),
};

const sizeClasses: Record<InputSize, { input: string; icon: string }> = {
  sm: {
    input: 'h-8 px-3 text-sm',
    icon: 'w-4 h-4',
  },
  md: {
    input: 'h-10 px-4 text-base',
    icon: 'w-5 h-5',
  },
  lg: {
    input: 'h-12 px-4 text-lg',
    icon: 'w-5 h-5',
  },
};

const stateClasses: Record<NonNullable<InputState>, string> = {
  error: cn(
    'border-red-500 dark:border-red-400',
    'focus:border-red-500 dark:focus:border-red-400',
    'focus:ring-red-500/20',
  ),
  success: cn(
    'border-green-500 dark:border-green-400',
    'focus:border-green-500 dark:focus:border-green-400',
    'focus:ring-green-500/20',
  ),
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      state,
      leftIcon,
      rightIcon,
      fullWidth,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const hasLeftIcon = Boolean(leftIcon);
    const hasRightIcon = Boolean(rightIcon);

    const inputClasses = cn(
      // Base
      'w-full rounded-lg transition-colors duration-150',
      'text-gray-900 dark:text-gray-100',
      'placeholder:text-gray-400 dark:placeholder:text-gray-500',
      // Focus
      'focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10',
      // Variant
      variantClasses[variant],
      // Size
      sizeClasses[size].input,
      // State
      state && stateClasses[state],
      // Icons
      hasLeftIcon && 'pl-10',
      hasRightIcon && 'pr-10',
      // Disabled
      disabled && 'opacity-50 cursor-not-allowed',
      // Custom
      className,
    );

    const wrapperClasses = cn(
      'relative',
      fullWidth ? 'w-full' : 'w-auto inline-block',
    );

    const iconWrapperClasses = cn(
      'absolute top-1/2 -translate-y-1/2',
      'text-gray-400 dark:text-gray-500',
      'pointer-events-none',
    );

    return (
      <div className={wrapperClasses}>
        {/* Left icon */}
        {leftIcon && (
          <span className={cn(iconWrapperClasses, 'left-3')}>
            <span className={sizeClasses[size].icon}>{leftIcon}</span>
          </span>
        )}

        <input
          ref={ref}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />

        {/* Right icon */}
        {rightIcon && (
          <span className={cn(iconWrapperClasses, 'right-3')}>
            <span className={sizeClasses[size].icon}>{rightIcon}</span>
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
