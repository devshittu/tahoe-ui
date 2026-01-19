'use client';

import React, { useId, cloneElement, isValidElement, ReactElement } from 'react';
import { cn } from '@tahoe-ui/core';
import { motion, AnimatePresence } from 'framer-motion';
import type { FormFieldProps } from './types';

/**
 * FormField - Form field wrapper with label, helper text, and error handling
 *
 * Provides consistent spacing, label association, and animated error display
 * for all form controls.
 *
 * @example
 * ```tsx
 * import { FormField, Input } from '@tahoe-ui/form';
 *
 * <FormField label="Email" required error="Email is required">
 *   <Input type="email" placeholder="Enter email" />
 * </FormField>
 * ```
 */

export function FormField({
  label,
  helperText,
  error,
  success,
  required,
  disabled,
  className,
  id: propId,
  children,
}: FormFieldProps) {
  const autoId = useId();
  const id = propId || autoId;
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  const hasError = Boolean(error);
  const hasSuccess = Boolean(success) && !hasError;
  const statusMessage = error || success || helperText;
  const statusId = error ? errorId : success ? `${id}-success` : helperId;

  // Clone child with enhanced props
  const enhancedChild = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        id,
        'aria-invalid': hasError || undefined,
        'aria-describedby': statusMessage ? statusId : undefined,
        'aria-required': required || undefined,
        disabled:
          disabled || (children.props as Record<string, unknown>)?.disabled,
      })
    : children;

  return (
    <div className={cn('space-y-1.5', className)}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={cn(
            'block text-sm font-medium',
            disabled
              ? 'text-gray-400 dark:text-gray-600'
              : 'text-gray-700 dark:text-gray-300',
          )}
        >
          {label}
          {required && (
            <span
              className="ml-0.5 text-red-500 dark:text-red-400"
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}

      {/* Input */}
      {enhancedChild}

      {/* Status message with animation */}
      <AnimatePresence mode="wait">
        {statusMessage && (
          <motion.p
            key={statusMessage}
            id={statusId}
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'text-sm',
              hasError && 'text-red-500 dark:text-red-400',
              hasSuccess && 'text-green-600 dark:text-green-400',
              !hasError && !hasSuccess && 'text-gray-500 dark:text-gray-400',
            )}
            role={hasError ? 'alert' : undefined}
            aria-live={hasError ? 'polite' : undefined}
          >
            {statusMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

FormField.displayName = 'FormField';

export default FormField;
