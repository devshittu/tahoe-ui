'use client';

import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import { cn } from '@tahoe-ui/core';
import type {
  TextareaProps,
  TextareaVariant,
  TextareaSize,
  TextareaState,
} from './types';

/**
 * Textarea - Multi-line text input with auto-resize support
 *
 * @example
 * ```tsx
 * import { Textarea } from '@tahoe-ui/form';
 *
 * <Textarea placeholder="Enter description" />
 * <Textarea autoResize minRows={3} maxRows={10} />
 * <Textarea showCount maxLength={500} />
 * ```
 */

const variantClasses: Record<TextareaVariant, string> = {
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

const sizeClasses: Record<TextareaSize, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-4 py-4 text-lg',
};

// State classes (CSS variable-backed via @tahoe-ui/tailwind-preset)
const stateClasses: Record<NonNullable<TextareaState>, string> = {
  error: cn('border-error', 'focus:border-error', 'focus:ring-error/20'),
  success: cn(
    'border-success',
    'focus:border-success',
    'focus:ring-success/20',
  ),
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = 'default',
      size = 'md',
      state,
      autoResize = false,
      minRows = 3,
      maxRows = 10,
      showCount = false,
      fullWidth = true,
      disabled,
      maxLength,
      value,
      defaultValue,
      className,
      onChange,
      ...props
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef =
      (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;

    // Calculate line height for auto-resize
    const adjustHeight = useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea || !autoResize) return;

      // Reset height to calculate scrollHeight
      textarea.style.height = 'auto';

      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 24;
      const minHeight = lineHeight * minRows;
      const maxHeight = lineHeight * maxRows;

      const newHeight = Math.min(
        Math.max(textarea.scrollHeight, minHeight),
        maxHeight,
      );
      textarea.style.height = `${newHeight}px`;
    }, [autoResize, minRows, maxRows, textareaRef]);

    // Adjust on mount and value change
    useEffect(() => {
      adjustHeight();
    }, [value, defaultValue, adjustHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        adjustHeight();
      }
      onChange?.(e);
    };

    const textareaClasses = cn(
      // Base
      'w-full rounded-lg transition-colors duration-150',
      'text-gray-900 dark:text-gray-100',
      'placeholder:text-gray-400 dark:placeholder:text-gray-500',
      'resize-none',
      // Focus
      'focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10',
      // Variant
      variantClasses[variant],
      // Size
      sizeClasses[size],
      // State
      state && stateClasses[state],
      // Disabled
      disabled && 'opacity-50 cursor-not-allowed',
      // Auto-resize
      !autoResize && 'resize-y',
      // Custom
      className,
    );

    const currentLength =
      typeof value === 'string'
        ? value.length
        : typeof defaultValue === 'string'
          ? defaultValue.length
          : 0;

    return (
      <div className={cn('relative', fullWidth ? 'w-full' : 'inline-block')}>
        <textarea
          ref={textareaRef}
          rows={autoResize ? minRows : undefined}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          className={textareaClasses}
          {...props}
        />

        {/* Character count */}
        {showCount && maxLength && (
          <span
            className={cn(
              'absolute bottom-2 right-3 text-xs',
              currentLength >= maxLength ? 'text-error' : 'text-text-muted',
            )}
          >
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

export default Textarea;
