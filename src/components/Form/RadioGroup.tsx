// src/components/Form/RadioGroup.tsx
'use client';

import React from 'react';
import {
  RadioGroup as HeadlessRadioGroup,
  Radio,
  Field,
  Label,
  Description,
} from '@headlessui/react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

/**
 * RadioGroup - Accessible radio group using HeadlessUI
 *
 * Reference: design-principles.md
 * - #9 Obvious Affordances: 44px touch targets
 * - #12 Accessibility: Built-in via HeadlessUI
 * - #6 Purposeful Motion: Spring-based selection animation
 */

export interface RadioOption<T = string> {
  value: T;
  label: string;
  description?: string;
  disabled?: boolean;
}

export type RadioGroupSize = 'sm' | 'md' | 'lg';
export type RadioGroupOrientation = 'horizontal' | 'vertical';

export interface RadioGroupProps<T = string> {
  /** Radio options */
  options: RadioOption<T>[];
  /** Current value */
  value?: T;
  /** Change handler */
  onChange?: (value: T) => void;
  /** Size preset */
  size?: RadioGroupSize;
  /** Layout orientation */
  orientation?: RadioGroupOrientation;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Name for form submission */
  name?: string;
  /** Additional className */
  className?: string;
}

const sizeClasses: Record<
  RadioGroupSize,
  { radio: string; dot: string; label: string; desc: string }
> = {
  sm: {
    radio: 'w-4 h-4',
    dot: 'w-2 h-2',
    label: 'text-sm',
    desc: 'text-xs',
  },
  md: {
    radio: 'w-5 h-5',
    dot: 'w-2.5 h-2.5',
    label: 'text-base',
    desc: 'text-sm',
  },
  lg: {
    radio: 'w-6 h-6',
    dot: 'w-3 h-3',
    label: 'text-lg',
    desc: 'text-base',
  },
};

export function RadioGroup<T = string>({
  options,
  value,
  onChange,
  size = 'md',
  orientation = 'vertical',
  disabled = false,
  error = false,
  name,
  className,
}: RadioGroupProps<T>) {
  const sizes = sizeClasses[size];

  return (
    <HeadlessRadioGroup
      value={value}
      onChange={onChange}
      disabled={disabled}
      name={name}
      className={cn(
        'flex',
        orientation === 'horizontal'
          ? 'flex-row flex-wrap gap-6'
          : 'flex-col gap-3',
        className,
      )}
    >
      {options.map((option) => (
        <Field
          key={String(option.value)}
          disabled={option.disabled || disabled}
          className={cn(
            'flex items-start gap-3',
            // 44px touch target
            'py-1.5 -my-1.5 px-1 -mx-1',
            (option.disabled || disabled) && 'opacity-50 cursor-not-allowed',
          )}
        >
          <Radio
            value={option.value}
            className={cn(
              // Base
              'relative flex items-center justify-center rounded-full',
              'transition-all duration-150',
              sizes.radio,
              // Border
              error
                ? 'border-2 border-red-500 dark:border-red-400'
                : 'border-2 border-gray-300 dark:border-gray-600',
              // Background
              'bg-white dark:bg-gray-900',
              // Focus
              'focus:outline-none focus:ring-2 focus:ring-offset-2',
              'focus:ring-gray-900 dark:focus:ring-gray-100',
              // Hover
              !(option.disabled || disabled) &&
                'hover:border-gray-400 dark:hover:border-gray-500',
              // Cursor
              option.disabled || disabled
                ? 'cursor-not-allowed'
                : 'cursor-pointer',
              // Checked state
              'data-[checked]:border-gray-900 dark:data-[checked]:border-gray-100',
            )}
          >
            {({ checked }) => (
              <>
                {checked && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 20,
                    }}
                    className={cn(
                      'rounded-full',
                      'bg-gray-900 dark:bg-gray-100',
                      sizes.dot,
                    )}
                  />
                )}
              </>
            )}
          </Radio>

          <div className="flex flex-col">
            <Label
              className={cn(
                sizes.label,
                'font-medium',
                option.disabled || disabled
                  ? 'text-gray-400 dark:text-gray-600'
                  : 'text-gray-900 dark:text-gray-100',
                !(option.disabled || disabled) && 'cursor-pointer',
              )}
            >
              {option.label}
            </Label>
            {option.description && (
              <Description
                className={cn(sizes.desc, 'text-gray-500 dark:text-gray-400')}
              >
                {option.description}
              </Description>
            )}
          </div>
        </Field>
      ))}
    </HeadlessRadioGroup>
  );
}

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
