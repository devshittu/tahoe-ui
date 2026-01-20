'use client';

import React from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react';
import { cn } from '@tahoe-ui/core';
import { CheckIcon, ChevronDownIcon } from './icons';
import type {
  SelectProps,
  SelectSize,
  SelectState,
  SelectOption,
} from './types';

/**
 * Select - Dropdown select using HeadlessUI Listbox
 *
 * Accessible dropdown with keyboard navigation and smooth animations.
 *
 * @example
 * ```tsx
 * import { Select } from '@tahoe-ui/form';
 *
 * const options = [
 *   { value: 'apple', label: 'Apple' },
 *   { value: 'banana', label: 'Banana' },
 * ];
 *
 * <Select options={options} value={value} onChange={setValue} />
 * ```
 */

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
            <ChevronDownIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className={cn(
            'absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-lg',
            'bg-white dark:bg-gray-900',
            'border border-gray-200 dark:border-gray-700',
            'shadow-lg',
            'focus:outline-none',
            'py-1',
            // Transition classes
            'transition duration-100 ease-in',
            'data-[closed]:opacity-0',
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
                      <CheckIcon className="w-4 h-4" />
                    </span>
                  )}
                </>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}

Select.displayName = 'Select';

export default Select;
