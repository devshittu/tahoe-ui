// src/components/Form/Switch.tsx
'use client';

import React from 'react';
import {
  Switch as HeadlessSwitch,
  Field,
  Label,
  Description,
} from '@headlessui/react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

/**
 * Switch - Toggle switch using HeadlessUI
 *
 * Reference: design-principles.md
 * - #9 Obvious Affordances: Clear on/off states
 * - #12 Accessibility: Built-in via HeadlessUI
 * - #6 Purposeful Motion: Spring-based toggle with squash-stretch
 */

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps {
  /** Checked state */
  checked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Description below label */
  description?: string;
  /** Size preset */
  size?: SwitchSize;
  /** Disabled state */
  disabled?: boolean;
  /** Name for form submission */
  name?: string;
  /** Additional className */
  className?: string;
}

const sizeClasses: Record<
  SwitchSize,
  {
    track: string;
    thumb: string;
    translate: string;
    label: string;
    desc: string;
  }
> = {
  sm: {
    track: 'w-8 h-5',
    thumb: 'w-3.5 h-3.5',
    translate: 'translate-x-3.5',
    label: 'text-sm',
    desc: 'text-xs',
  },
  md: {
    track: 'w-11 h-6',
    thumb: 'w-4 h-4',
    translate: 'translate-x-5',
    label: 'text-base',
    desc: 'text-sm',
  },
  lg: {
    track: 'w-14 h-8',
    thumb: 'w-6 h-6',
    translate: 'translate-x-6',
    label: 'text-lg',
    desc: 'text-base',
  },
};

export function Switch({
  checked = false,
  onChange,
  label,
  description,
  size = 'md',
  disabled = false,
  name,
  className,
}: SwitchProps) {
  const sizes = sizeClasses[size];

  return (
    <Field
      disabled={disabled}
      className={cn(
        'flex items-center justify-between gap-4',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
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

      <HeadlessSwitch
        checked={checked}
        onChange={onChange}
        name={name}
        className={cn(
          // Base
          'relative inline-flex shrink-0 rounded-full',
          'transition-colors duration-200',
          sizes.track,
          // Background
          checked
            ? 'bg-gray-900 dark:bg-gray-100'
            : 'bg-gray-200 dark:bg-gray-700',
          // Focus
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'focus:ring-gray-900 dark:focus:ring-gray-100',
          // Cursor
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        )}
      >
        <motion.span
          className={cn(
            'inline-block rounded-full shadow-sm',
            sizes.thumb,
            // Background
            'bg-white dark:bg-gray-900',
            checked ? 'dark:bg-gray-900' : '',
          )}
          initial={false}
          animate={{
            x: checked
              ? parseInt(sizes.translate.replace('translate-x-', '')) * 4
              : 4,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
          style={{
            y: '50%',
            top: '50%',
            position: 'absolute',
            transform: 'translateY(-50%)',
          }}
        />
      </HeadlessSwitch>
    </Field>
  );
}

Switch.displayName = 'Switch';

export default Switch;
