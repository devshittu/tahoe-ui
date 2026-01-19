'use client';

import React from 'react';
import {
  Switch as HeadlessSwitch,
  Field,
  Label,
  Description,
} from '@headlessui/react';
import { cn } from '@tahoe-ui/core';
import { motion } from 'framer-motion';
import type { SwitchProps, SwitchSize } from './types';

/**
 * Switch - Toggle switch using HeadlessUI
 *
 * Features spring-based animation for smooth toggle.
 *
 * @example
 * ```tsx
 * import { Switch } from '@tahoe-ui/form';
 *
 * <Switch label="Enable notifications" checked={enabled} onChange={setEnabled} />
 * <Switch label="Dark mode" description="Use dark theme" />
 * ```
 */

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
    track: 'w-8 h-5',
    thumb: 'w-3.5 h-3.5',
    translateX: 14, // 3.5 * 4
    label: 'text-sm',
    desc: 'text-xs',
  },
  md: {
    track: 'w-11 h-6',
    thumb: 'w-4 h-4',
    translateX: 20, // 5 * 4
    label: 'text-base',
    desc: 'text-sm',
  },
  lg: {
    track: 'w-14 h-8',
    thumb: 'w-6 h-6',
    translateX: 24, // 6 * 4
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
            x: checked ? sizes.translateX : 4,
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
