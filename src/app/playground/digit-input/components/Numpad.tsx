// src/app/playground/digit-input/components/Numpad.tsx
'use client';

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FiDelete, FiCheck } from 'react-icons/fi';
import type { NumpadProps } from './types';
import { HAPTIC_PATTERNS } from './types';

/**
 * Trigger haptic feedback
 */
function triggerHaptic(pattern: readonly number[]): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate([...pattern]);
  }
}

/**
 * Numpad - On-screen numeric keypad for digit input
 *
 * Apple-style design with clean layout, subtle animations,
 * and haptic feedback support.
 *
 * @example
 * ```tsx
 * <Numpad
 *   onDigit={(d) => inputRef.current?.insertDigit(d)}
 *   onBackspace={() => inputRef.current?.backspace()}
 *   onSubmit={() => handleSubmit()}
 *   showSubmit
 * />
 * ```
 */
export function Numpad({
  onDigit,
  onBackspace,
  onSubmit,
  showSubmit = false,
  disabledDigits = [],
  disabled = false,
  className,
  enableHaptics = true,
}: NumpadProps) {
  const handleDigitPress = useCallback(
    (digit: string) => {
      if (disabled || disabledDigits.includes(digit)) return;
      if (enableHaptics) {
        triggerHaptic(HAPTIC_PATTERNS.input);
      }
      onDigit(digit);
    },
    [disabled, disabledDigits, enableHaptics, onDigit],
  );

  const handleBackspace = useCallback(() => {
    if (disabled) return;
    if (enableHaptics) {
      triggerHaptic(HAPTIC_PATTERNS.delete);
    }
    onBackspace();
  }, [disabled, enableHaptics, onBackspace]);

  const handleSubmit = useCallback(() => {
    if (disabled || !onSubmit) return;
    if (enableHaptics) {
      triggerHaptic(HAPTIC_PATTERNS.success);
    }
    onSubmit();
  }, [disabled, enableHaptics, onSubmit]);

  // Grid layout: 3 columns, 4 rows
  // [1] [2] [3]
  // [4] [5] [6]
  // [7] [8] [9]
  // [X] [0] [✓] or [X] [0] []
  const topRows = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ];

  return (
    <div
      className={cn(
        'grid grid-cols-3 gap-3',
        'w-full max-w-xs mx-auto',
        'select-none',
        disabled && 'opacity-50 pointer-events-none',
        className,
      )}
      role="group"
      aria-label="Numeric keypad"
    >
      {/* Digit rows 1-9 */}
      {topRows.map((row, rowIndex) =>
        row.map((digit) => (
          <NumpadButton
            key={digit}
            onClick={() => handleDigitPress(digit)}
            disabled={disabled || disabledDigits.includes(digit)}
            aria-label={`Digit ${digit}`}
          >
            {digit}
          </NumpadButton>
        )),
      )}

      {/* Bottom row: Backspace, 0, Submit/Empty */}
      <NumpadButton
        onClick={handleBackspace}
        disabled={disabled}
        variant="secondary"
        aria-label="Delete"
      >
        <FiDelete className="w-6 h-6" />
      </NumpadButton>

      <NumpadButton
        onClick={() => handleDigitPress('0')}
        disabled={disabled || disabledDigits.includes('0')}
        aria-label="Digit 0"
      >
        0
      </NumpadButton>

      {showSubmit && onSubmit ? (
        <NumpadButton
          onClick={handleSubmit}
          disabled={disabled}
          variant="primary"
          aria-label="Submit"
        >
          <FiCheck className="w-6 h-6" />
        </NumpadButton>
      ) : (
        <div className="w-full aspect-square" /> // Empty space
      )}
    </div>
  );
}

/**
 * Numpad button variants
 */
type NumpadButtonVariant = 'default' | 'primary' | 'secondary';

/**
 * Props for NumpadButton
 */
interface NumpadButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: NumpadButtonVariant;
  'aria-label'?: string;
}

/**
 * Variant styles for numpad buttons
 */
const buttonVariants: Record<NumpadButtonVariant, string> = {
  default: cn(
    'bg-white dark:bg-gray-800',
    'text-gray-900 dark:text-white',
    'border border-gray-200 dark:border-gray-700',
    'hover:bg-gray-50 dark:hover:bg-gray-700',
    'active:bg-gray-100 dark:active:bg-gray-600',
  ),
  primary: cn(
    'bg-blue-500 dark:bg-blue-600',
    'text-white',
    'border border-blue-500 dark:border-blue-600',
    'hover:bg-blue-600 dark:hover:bg-blue-500',
    'active:bg-blue-700 dark:active:bg-blue-400',
  ),
  secondary: cn(
    'bg-gray-100 dark:bg-gray-700',
    'text-gray-700 dark:text-gray-300',
    'border border-gray-200 dark:border-gray-600',
    'hover:bg-gray-200 dark:hover:bg-gray-600',
    'active:bg-gray-300 dark:active:bg-gray-500',
  ),
};

/**
 * Individual numpad button
 */
function NumpadButton({
  children,
  onClick,
  disabled = false,
  variant = 'default',
  'aria-label': ariaLabel,
}: NumpadButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'w-full aspect-square',
        'flex items-center justify-center',
        'text-2xl font-medium',
        'rounded-2xl',
        'transition-colors duration-150',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        'touch-manipulation',
        disabled && 'opacity-50 cursor-not-allowed',
        buttonVariants[variant],
      )}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}

/**
 * Compact horizontal numpad variant
 */
export interface CompactNumpadProps {
  onDigit: (digit: string) => void;
  onBackspace: () => void;
  disabled?: boolean;
  className?: string;
  enableHaptics?: boolean;
}

export function CompactNumpad({
  onDigit,
  onBackspace,
  disabled = false,
  className,
  enableHaptics = true,
}: CompactNumpadProps) {
  const handleDigitPress = useCallback(
    (digit: string) => {
      if (disabled) return;
      if (enableHaptics) {
        triggerHaptic(HAPTIC_PATTERNS.input);
      }
      onDigit(digit);
    },
    [disabled, enableHaptics, onDigit],
  );

  const handleBackspace = useCallback(() => {
    if (disabled) return;
    if (enableHaptics) {
      triggerHaptic(HAPTIC_PATTERNS.delete);
    }
    onBackspace();
  }, [disabled, enableHaptics, onBackspace]);

  return (
    <div
      className={cn(
        'flex items-center gap-1',
        'p-2 rounded-xl',
        'bg-gray-100 dark:bg-gray-800',
        disabled && 'opacity-50 pointer-events-none',
        className,
      )}
      role="group"
      aria-label="Numeric keypad"
    >
      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((digit) => (
        <motion.button
          key={digit}
          type="button"
          onClick={() => handleDigitPress(digit)}
          disabled={disabled}
          whileTap={{ scale: 0.9 }}
          className={cn(
            'w-8 h-10',
            'flex items-center justify-center',
            'text-sm font-medium',
            'rounded-lg',
            'bg-white dark:bg-gray-700',
            'text-gray-900 dark:text-white',
            'hover:bg-gray-50 dark:hover:bg-gray-600',
            'active:bg-gray-100 dark:active:bg-gray-500',
            'transition-colors duration-100',
            'touch-manipulation',
          )}
          aria-label={`Digit ${digit}`}
        >
          {digit}
        </motion.button>
      ))}

      <motion.button
        type="button"
        onClick={handleBackspace}
        disabled={disabled}
        whileTap={{ scale: 0.9 }}
        className={cn(
          'w-10 h-10',
          'flex items-center justify-center',
          'rounded-lg',
          'bg-gray-200 dark:bg-gray-600',
          'text-gray-700 dark:text-gray-300',
          'hover:bg-gray-300 dark:hover:bg-gray-500',
          'active:bg-gray-400 dark:active:bg-gray-400',
          'transition-colors duration-100',
          'touch-manipulation',
        )}
        aria-label="Delete"
      >
        <FiDelete className="w-4 h-4" />
      </motion.button>
    </div>
  );
}

export default Numpad;
