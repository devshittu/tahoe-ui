// src/components/Form/FormGroup.tsx
'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * FormGroup - Semantic fieldset wrapper for grouping related form fields
 *
 * Provides semantic <fieldset> and <legend> structure with consistent
 * spacing for radio groups, checkbox groups, or related input sets.
 *
 * Reference: design-principles.md
 * - #12 Accessibility: Semantic HTML with fieldset/legend
 * - #11 Content-First Layout: Single-column preferred for forms
 */

export type FormGroupOrientation = 'vertical' | 'horizontal';

export interface FormGroupProps {
  /** Group legend/title */
  legend?: string;
  /** Optional description below legend */
  description?: string;
  /** Layout orientation for children */
  orientation?: FormGroupOrientation;
  /** Gap between children */
  gap?: '2' | '3' | '4' | '6';
  /** Error for the entire group */
  error?: string;
  /** Disable all fields in group */
  disabled?: boolean;
  /** Additional className */
  className?: string;
  /** Group children */
  children: ReactNode;
}

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
