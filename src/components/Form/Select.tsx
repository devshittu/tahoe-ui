// src/components/Form/Select.tsx
'use client';

import React, { Fragment } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from '@headlessui/react';
import { cn } from '@/lib/utils';
import { FiCheck, FiChevronDown } from 'react-icons/fi';

/**
 * Select - Dropdown select using HeadlessUI Listbox
 *
 * Accessible dropdown with keyboard navigation, search support,
 * and smooth animations.
 *
 * Reference: design-principles.md
 * - #7 Intuitive Interaction Patterns: Expected dropdown behavior
 * - #12 Accessibility: Built-in via HeadlessUI
 * - #6 Purposeful Motion: 150-250ms transitions
 */

export interface SelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectState = 'error' | 'success' | undefined;

export interface SelectProps<T = string> {
  /** Options to select from */
  options: SelectOption<T>[];
  /** Current value */
  value?: T;
  /** Change handler */
  onChange?: (value: T) => void;
  /** Placeholder when no value selected */
  placeholder?: string;
  /** Size preset */
  size?: SelectSize;
  /** Validation state */
  state?: SelectState;
  /** Disabled state */
  disabled?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Additional className */
  className?: string;
  /** ID for accessibility */
  id?: string;
  /** Name for form submission */
  name?: string;
}

const sizeClasses: Record<SelectSize, { button: string; option: string }> = {
  sm: {
    button: 'h-8 px-3 text-sm',
    option: 'px-3 py-1.5 text-sm',
  },
  md: {
    button: 'h-10 px-4 text-base',
    option: 'px-4 py-2 text-base',
  },
  lg: {
    button: 'h-12 px-4 text-lg',
    option: 'px-4 py-3 text-lg',
  },
};

const stateClasses: Record<NonNullable<SelectState>, string> = {
  error: 'border-red-500 dark:border-red-400 focus:ring-red-500/20',
  success: 'border-green-500 dark:border-green-400 focus:ring-green-500/20',
};

export function Select<T = string>({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  size = 'md',
  state,
  disabled = false,
  fullWidth = true,
  className,
  id,
  name,
}: SelectProps<T>) {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled} name={name}>
      <div
        className={cn(
          'relative',
          fullWidth ? 'w-full' : 'inline-block',
          className,
        )}
      >
        <ListboxButton
          id={id}
          className={cn(
            // Base
            'relative w-full text-left rounded-lg transition-colors duration-150',
            'bg-white dark:bg-gray-900',
            'border border-gray-200 dark:border-gray-700',
            // Text
            'text-gray-900 dark:text-gray-100',
            // Focus
            'focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10',
            'focus:border-gray-400 dark:focus:border-gray-500',
            // Size
            sizeClasses[size].button,
            // State
            state && stateClasses[state],
            // Disabled
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        >
          <span
            className={cn(
              'block truncate pr-8',
              !selectedOption && 'text-gray-400 dark:text-gray-500',
            )}
          >
            {selectedOption?.label || placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <FiChevronDown
              className="w-4 h-4 text-gray-400 dark:text-gray-500"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions
            className={cn(
              'absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-lg',
              'bg-white dark:bg-gray-900',
              'border border-gray-200 dark:border-gray-700',
              'shadow-lg',
              'focus:outline-none',
              'py-1',
            )}
          >
            {options.map((option) => (
              <ListboxOption
                key={String(option.value)}
                value={option.value}
                disabled={option.disabled}
                className={({ active, selected }) =>
                  cn(
                    'relative cursor-pointer select-none',
                    sizeClasses[size].option,
                    active && 'bg-gray-100 dark:bg-gray-800',
                    selected && 'bg-gray-50 dark:bg-gray-800/50',
                    option.disabled && 'opacity-50 cursor-not-allowed',
                  )
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={cn(
                        'block truncate pr-8',
                        selected && 'font-medium',
                      )}
                    >
                      {option.label}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-900 dark:text-gray-100">
                        <FiCheck className="w-4 h-4" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
}

Select.displayName = 'Select';

export default Select;
