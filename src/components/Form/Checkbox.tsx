// src/components/Form/Checkbox.tsx
'use client';

import React from 'react';
import {
  Checkbox as HeadlessCheckbox,
  Field,
  Label,
  Description,
} from '@headlessui/react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiMinus } from 'react-icons/fi';

/**
 * Checkbox - Accessible checkbox using HeadlessUI
 *
 * Reference: design-principles.md
 * - #9 Obvious Affordances: 44px touch target
 * - #12 Accessibility: Built-in via HeadlessUI
 * - #6 Purposeful Motion: Spring-based check animation
 */

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps {
  /** Checked state */
  checked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Label text */
  label?: string;
  /** Description below label */
  description?: string;
  /** Size preset */
  size?: CheckboxSize;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Name for form submission */
  name?: string;
  /** Value for form submission */
  value?: string;
  /** Additional className */
  className?: string;
}

const sizeClasses: Record<
  CheckboxSize,
  { box: string; icon: string; label: string; desc: string }
> = {
  sm: {
    box: 'w-4 h-4',
    icon: 'w-3 h-3',
    label: 'text-sm',
    desc: 'text-xs',
  },
  md: {
    box: 'w-5 h-5',
    icon: 'w-3.5 h-3.5',
    label: 'text-base',
    desc: 'text-sm',
  },
  lg: {
    box: 'w-6 h-6',
    icon: 'w-4 h-4',
    label: 'text-lg',
    desc: 'text-base',
  },
};

export function Checkbox({
  checked = false,
  onChange,
  indeterminate = false,
  label,
  description,
  size = 'md',
  disabled = false,
  error = false,
  name,
  value,
  className,
}: CheckboxProps) {
  const sizes = sizeClasses[size];

  return (
    <Field
      disabled={disabled}
      className={cn(
        'flex items-start gap-3',
        // 44px touch target via padding
        'py-1.5 -my-1.5 px-1 -mx-1',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      <HeadlessCheckbox
        checked={checked}
        onChange={onChange}
        name={name}
        value={value}
        className={cn(
          // Base
          'relative flex items-center justify-center rounded',
          'transition-all duration-150',
          sizes.box,
          // Background
          checked || indeterminate
            ? 'bg-gray-900 dark:bg-gray-100'
            : 'bg-white dark:bg-gray-900',
          // Border
          checked || indeterminate
            ? 'border-transparent'
            : error
              ? 'border-2 border-red-500 dark:border-red-400'
              : 'border-2 border-gray-300 dark:border-gray-600',
          // Focus
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'focus:ring-gray-900 dark:focus:ring-gray-100',
          // Hover
          !disabled && 'hover:border-gray-400 dark:hover:border-gray-500',
          // Cursor
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        )}
      >
        <AnimatePresence mode="wait">
          {(checked || indeterminate) && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 20,
              }}
              className={cn(sizes.icon, 'text-white dark:text-gray-900')}
            >
              {indeterminate ? (
                <FiMinus className="w-full h-full" strokeWidth={3} />
              ) : (
                <FiCheck className="w-full h-full" strokeWidth={3} />
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </HeadlessCheckbox>

      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <Label
              className={cn(
                sizes.label,
                'font-medium',
                disabled
                  ? 'text-gray-400 dark:text-gray-600'
                  : 'text-gray-900 dark:text-gray-100',
                !disabled && 'cursor-pointer',
              )}
            >
              {label}
            </Label>
          )}
          {description && (
            <Description
              className={cn(sizes.desc, 'text-gray-500 dark:text-gray-400')}
            >
              {description}
            </Description>
          )}
        </div>
      )}
    </Field>
  );
}

Checkbox.displayName = 'Checkbox';

export default Checkbox;
