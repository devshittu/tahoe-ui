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
    translateX: number;
    label: string;
    desc: string;
  }
> = {
  sm: {
    track: 'w-8 h-5', // 32px x 20px
    thumb: 'w-3.5 h-3.5', // 14px x 14px
    translateX: 14, // 32 - 14 - 4 = 14 (4px padding right)
    label: 'text-sm',
    desc: 'text-xs',
  },
  md: {
    track: 'w-11 h-6', // 44px x 24px
    thumb: 'w-4 h-4', // 16px x 16px
    translateX: 24, // 44 - 16 - 4 = 24 (4px padding right)
    label: 'text-base',
    desc: 'text-sm',
  },
  lg: {
    track: 'w-14 h-8', // 56px x 32px
    thumb: 'w-6 h-6', // 24px x 24px
    translateX: 28, // 56 - 24 - 4 = 28 (4px padding right)
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
                disabled ? 'text-text-muted' : 'text-text-primary',
                !disabled && 'cursor-pointer',
              )}
            >
              {label}
            </Label>
          )}
          {description && (
            <Description className={cn(sizes.desc, 'text-text-secondary')}>
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
          // Base - use flexbox for vertical centering
          'relative inline-flex items-center shrink-0 rounded-full',
          'transition-colors duration-200',
          sizes.track,
          // Background - ON: brand primary, OFF: subtle gray
          checked
            ? 'bg-brand-primary-600 dark:bg-brand-primary-500'
            : 'bg-bg-secondary dark:bg-bg-tertiary',
          // Focus
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'focus:ring-brand-primary-500 dark:focus:ring-brand-primary-400',
          // Cursor
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        )}
      >
        <motion.span
          className={cn(
            'pointer-events-none inline-block rounded-full shadow-sm',
            sizes.thumb,
            // Thumb - white for contrast against colored track
            'bg-white',
          )}
          initial={false}
          animate={{
            x: checked ? sizes.translateX : 4,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      </HeadlessSwitch>
    </Field>
  );
}

Switch.displayName = 'Switch';

export default Switch;
