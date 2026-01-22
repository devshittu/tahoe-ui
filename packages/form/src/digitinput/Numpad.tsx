'use client';

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import type { NumpadProps } from './types';
import { HAPTIC_PATTERNS, NUMPAD_BUTTON_STYLES } from './types';

/**
 * Trigger haptic feedback
 */
function triggerHaptic(pattern: readonly number[]): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate([...pattern]);
  }
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
      className={twMerge(
        'w-full aspect-square',
        'flex items-center justify-center',
        'text-2xl font-medium',
        'rounded-2xl',
        'transition-colors duration-150',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500 focus-visible:ring-offset-2',
        'touch-manipulation',
        disabled && 'opacity-50 cursor-not-allowed',
        NUMPAD_BUTTON_STYLES[variant],
      )}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
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
      className={twMerge(
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
      {topRows.map((row) =>
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
        <DeleteIcon className="w-6 h-6" />
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
          <CheckIcon className="w-6 h-6" />
        </NumpadButton>
      ) : (
        <div className="w-full aspect-square" /> // Empty space
      )}
    </div>
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
      className={twMerge(
        'flex items-center gap-1',
        'p-2 rounded-xl',
        'bg-bg-secondary dark:bg-bg-secondary',
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
          className={twMerge(
            'w-8 h-10',
            'flex items-center justify-center',
            'text-sm font-medium',
            'rounded-lg',
            'bg-bg-elevated dark:bg-bg-elevated',
            'text-text-primary dark:text-text-primary',
            'hover:bg-bg-secondary dark:hover:bg-bg-secondary',
            'active:bg-bg-tertiary dark:active:bg-bg-tertiary',
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
        className={twMerge(
          'w-10 h-10',
          'flex items-center justify-center',
          'rounded-lg',
          'bg-bg-tertiary dark:bg-bg-tertiary',
          'text-text-secondary dark:text-text-secondary',
          'hover:bg-bg-secondary dark:hover:bg-bg-secondary',
          'active:bg-bg-elevated dark:active:bg-bg-elevated',
          'transition-colors duration-100',
          'touch-manipulation',
        )}
        aria-label="Delete"
      >
        <DeleteIcon className="w-4 h-4" />
      </motion.button>
    </div>
  );
}

/**
 * Delete icon component
 */
function DeleteIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
      />
    </svg>
  );
}

/**
 * Check icon component
 */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default Numpad;
