// src/app/playground/digit-input/components/types.ts
'use client';

import type { ReactNode } from 'react';

/**
 * Input mode for the digit boxes
 */
export type DigitInputMode = 'numeric' | 'alphanumeric';

/**
 * Visual variant styles
 */
export type DigitInputVariant = 'default' | 'minimal' | 'elevated' | 'glass';

/**
 * Size presets
 */
export type DigitInputSize = 'sm' | 'md' | 'lg';

/**
 * Visual state of the input
 */
export type DigitInputState =
  | 'idle'
  | 'focused'
  | 'filling'
  | 'complete'
  | 'error'
  | 'success';

/**
 * Animation state for individual boxes
 */
export type BoxAnimationState =
  | 'idle'
  | 'entering'
  | 'filled'
  | 'error'
  | 'success'
  | 'shake';

/**
 * Configuration for digit input behavior
 */
export interface DigitInputConfig {
  /** Number of digit boxes (default: 6) */
  length?: number;
  /** Input mode: numeric only or alphanumeric */
  mode?: DigitInputMode;
  /** Mask input with dots for PIN entry */
  masked?: boolean;
  /** Auto-submit when all digits filled */
  autoSubmit?: boolean;
  /** Focus first box on mount */
  autoFocus?: boolean;
  /** Backspace moves to previous box when pressed on empty */
  backspaceMovesLeft?: boolean;
  /** Allow paste to fill from current position */
  allowPaste?: boolean;
  /** Validate input (return true if valid) */
  validate?: (value: string) => boolean;
  /** Disable the entire input */
  disabled?: boolean;
  /** Mark as read-only */
  readOnly?: boolean;
}

/**
 * Props for the DigitInput component
 */
export interface DigitInputProps extends DigitInputConfig {
  /** Current value (controlled) */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Callback when all digits filled */
  onComplete?: (value: string) => void;
  /** Callback on validation error */
  onError?: (value: string) => void;
  /** Visual variant */
  variant?: DigitInputVariant;
  /** Size preset */
  size?: DigitInputSize;
  /** Current state (error, success, etc.) */
  state?: 'error' | 'success';
  /** Error message to display */
  errorMessage?: string;
  /** Success message to display */
  successMessage?: string;
  /** Label text */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Show on-screen numpad */
  showNumpad?: boolean;
  /** Separator between digit groups (e.g., show dash after 3 digits) */
  separator?: number;
  /** Custom separator element */
  separatorElement?: ReactNode;
  /** Additional class name for container */
  className?: string;
  /** Additional class name for boxes */
  boxClassName?: string;
  /** Haptic feedback on input */
  enableHaptics?: boolean;
  /** Name attribute for form submission */
  name?: string;
  /** Required for form validation */
  required?: boolean;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

/**
 * Return type for useDigitInput hook
 */
export interface UseDigitInputReturn {
  /** Current digits array */
  digits: string[];
  /** Complete value as string */
  value: string;
  /** Currently focused box index (-1 if none) */
  focusedIndex: number;
  /** Current input state */
  state: DigitInputState;
  /** Whether input is complete */
  isComplete: boolean;
  /** Whether input has error */
  hasError: boolean;
  /** Set a specific digit */
  setDigit: (index: number, digit: string) => void;
  /** Set entire value */
  setValue: (value: string) => void;
  /** Clear all digits */
  clear: () => void;
  /** Focus a specific box */
  focus: (index: number) => void;
  /** Blur current focus */
  blur: () => void;
  /** Handle key down on a box */
  handleKeyDown: (index: number, e: React.KeyboardEvent) => void;
  /** Handle input change on a box */
  handleChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Handle paste event */
  handlePaste: (e: React.ClipboardEvent) => void;
  /** Handle focus on a box */
  handleFocus: (index: number) => void;
  /** Handle blur on a box */
  handleBlur: () => void;
  /** Trigger error state with shake animation */
  triggerError: () => void;
  /** Trigger success state */
  triggerSuccess: () => void;
  /** Reset to idle state */
  resetState: () => void;
  /** Get props for a specific box input */
  getBoxProps: (index: number) => {
    ref: (el: HTMLInputElement | null) => void;
    value: string;
    type: string;
    inputMode: 'numeric' | 'text';
    pattern: string;
    maxLength: number;
    disabled: boolean;
    readOnly: boolean;
    autoComplete: string;
    'aria-label': string;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
  };
  /** Get props for container */
  getContainerProps: () => {
    onPaste: (e: React.ClipboardEvent) => void;
  };
  /** Box animation states */
  boxStates: BoxAnimationState[];
}

/**
 * Props for Numpad component
 */
export interface NumpadProps {
  /** Callback when a digit is pressed */
  onDigit: (digit: string) => void;
  /** Callback when backspace is pressed */
  onBackspace: () => void;
  /** Callback when submit is pressed */
  onSubmit?: () => void;
  /** Show submit button */
  showSubmit?: boolean;
  /** Disable specific digits */
  disabledDigits?: string[];
  /** Disable entire numpad */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
  /** Enable haptic feedback */
  enableHaptics?: boolean;
}

/**
 * Default configuration values
 */
export const DIGIT_INPUT_CONFIG = {
  length: 6,
  mode: 'numeric' as DigitInputMode,
  masked: false,
  autoSubmit: false,
  autoFocus: true,
  backspaceMovesLeft: true,
  allowPaste: true,
} as const;

/**
 * Size configurations (following 8pt grid)
 */
export const SIZE_CONFIG: Record<
  DigitInputSize,
  {
    boxWidth: number;
    boxHeight: number;
    fontSize: string;
    gap: number;
    borderRadius: number;
  }
> = {
  sm: {
    boxWidth: 40,
    boxHeight: 48,
    fontSize: 'text-lg',
    gap: 8,
    borderRadius: 8,
  },
  md: {
    boxWidth: 48,
    boxHeight: 56,
    fontSize: 'text-xl',
    gap: 12,
    borderRadius: 12,
  },
  lg: {
    boxWidth: 56,
    boxHeight: 64,
    fontSize: 'text-2xl',
    gap: 16,
    borderRadius: 16,
  },
} as const;

/**
 * Variant styles
 */
export const VARIANT_STYLES: Record<
  DigitInputVariant,
  {
    box: string;
    boxFocused: string;
    boxFilled: string;
    boxError: string;
    boxSuccess: string;
    boxDisabled: string;
    text: string;
    caret: string;
  }
> = {
  default: {
    box: 'bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700',
    boxFocused: 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20',
    boxFilled:
      'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50',
    boxError:
      'border-red-500 dark:border-red-400 ring-2 ring-red-500/20 bg-red-50 dark:bg-red-950/20',
    boxSuccess:
      'border-emerald-500 dark:border-emerald-400 ring-2 ring-emerald-500/20 bg-emerald-50 dark:bg-emerald-950/20',
    boxDisabled:
      'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed',
    text: 'text-gray-900 dark:text-white',
    caret: 'bg-blue-500',
  },
  minimal: {
    box: 'bg-transparent border-b-2 border-gray-300 dark:border-gray-600 rounded-none',
    boxFocused: 'border-blue-500 dark:border-blue-400',
    boxFilled: 'border-gray-400 dark:border-gray-500',
    boxError: 'border-red-500 dark:border-red-400',
    boxSuccess: 'border-emerald-500 dark:border-emerald-400',
    boxDisabled:
      'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed',
    text: 'text-gray-900 dark:text-white',
    caret: 'bg-blue-500',
  },
  elevated: {
    box: 'bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 shadow-md',
    boxFocused:
      'border-blue-500/50 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/20',
    boxFilled: 'bg-gray-50 dark:bg-gray-700/50 shadow-sm',
    boxError:
      'border-red-500/50 shadow-lg shadow-red-500/10 bg-red-50 dark:bg-red-950/20',
    boxSuccess:
      'border-emerald-500/50 shadow-lg shadow-emerald-500/10 bg-emerald-50 dark:bg-emerald-950/20',
    boxDisabled:
      'bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed shadow-none',
    text: 'text-gray-900 dark:text-white',
    caret: 'bg-blue-500',
  },
  glass: {
    box: 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30',
    boxFocused:
      'border-blue-400/50 bg-white/80 dark:bg-gray-800/80 ring-1 ring-blue-400/30',
    boxFilled: 'bg-white/70 dark:bg-gray-800/70',
    boxError: 'border-red-400/50 bg-red-50/50 dark:bg-red-950/30',
    boxSuccess: 'border-emerald-400/50 bg-emerald-50/50 dark:bg-emerald-950/30',
    boxDisabled:
      'bg-gray-100/50 dark:bg-gray-800/50 opacity-50 cursor-not-allowed',
    text: 'text-gray-900 dark:text-white',
    caret: 'bg-blue-400',
  },
} as const;

/**
 * Animation spring configurations
 */
export const SPRING_CONFIGS = {
  fill: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 30,
  },
  shake: {
    type: 'spring' as const,
    stiffness: 600,
    damping: 15,
  },
  success: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 25,
  },
} as const;

/**
 * Haptic patterns
 */
export const HAPTIC_PATTERNS = {
  input: [10],
  delete: [5],
  complete: [20, 10, 20],
  error: [30, 20, 30, 20, 30],
  success: [15, 10, 25],
} as const;
