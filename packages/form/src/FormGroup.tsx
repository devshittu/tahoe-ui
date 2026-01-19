'use client';

import React from 'react';
import { cn } from '@tahoe-ui/core';
import type { FormGroupProps, FormGroupOrientation } from './types';

/**
 * FormGroup - Semantic fieldset wrapper for grouping related form fields
 *
 * Provides semantic <fieldset> and <legend> structure with consistent
 * spacing for radio groups, checkbox groups, or related input sets.
 *
 * @example
 * ```tsx
 * import { FormGroup, Checkbox } from '@tahoe-ui/form';
 *
 * <FormGroup legend="Notifications" description="Choose what to receive">
 *   <Checkbox label="Email" />
 *   <Checkbox label="SMS" />
 *   <Checkbox label="Push" />
 * </FormGroup>
 * ```
 */

export function FormGroup({
  legend,
  description,
  orientation = 'vertical',
  gap = '3',
  error,
  disabled,
  className,
  children,
}: FormGroupProps) {
  return (
    <fieldset
      className={cn('border-0 p-0 m-0', disabled && 'opacity-50', className)}
      disabled={disabled}
    >
      {/* Legend */}
      {legend && (
        <legend
          className={cn(
            'text-sm font-medium mb-2',
            disabled
              ? 'text-gray-400 dark:text-gray-600'
              : 'text-gray-700 dark:text-gray-300',
          )}
        >
          {legend}
        </legend>
      )}

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {description}
        </p>
      )}

      {/* Children container */}
      <div
        className={cn(
          orientation === 'horizontal'
            ? 'flex flex-wrap items-start'
            : 'flex flex-col',
          `gap-${gap}`,
        )}
        role="group"
      >
        {children}
      </div>

      {/* Group error */}
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400 mt-2" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

FormGroup.displayName = 'FormGroup';

export default FormGroup;
