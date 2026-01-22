// packages/form/src/digitinput/types.ts

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
 * Variant styles - CSS variable-backed for theming
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
    box: 'bg-bg-elevated dark:bg-bg-elevated border-2 border-border-default dark:border-border-default',
    boxFocused:
      'border-brand-primary-500 dark:border-brand-primary-400 ring-2 ring-brand-primary-500/20',
    boxFilled:
      'border-border-subtle dark:border-border-subtle bg-bg-secondary dark:bg-bg-secondary',
    boxError:
      'border-error dark:border-error ring-2 ring-error/20 bg-error/5 dark:bg-error/10',
    boxSuccess:
      'border-success dark:border-success ring-2 ring-success/20 bg-success/5 dark:bg-success/10',
    boxDisabled:
      'bg-bg-secondary dark:bg-bg-secondary border-border-subtle dark:border-border-subtle opacity-50 cursor-not-allowed',
    text: 'text-text-primary dark:text-text-primary',
    caret: 'bg-brand-primary-500',
  },
  minimal: {
    box: 'bg-transparent border-b-2 border-border-default dark:border-border-default rounded-none',
    boxFocused: 'border-brand-primary-500 dark:border-brand-primary-400',
    boxFilled: 'border-border-subtle dark:border-border-subtle',
    boxError: 'border-error dark:border-error',
    boxSuccess: 'border-success dark:border-success',
    boxDisabled:
      'border-border-subtle dark:border-border-subtle opacity-50 cursor-not-allowed',
    text: 'text-text-primary dark:text-text-primary',
    caret: 'bg-brand-primary-500',
  },
  elevated: {
    box: 'bg-bg-elevated dark:bg-bg-elevated border border-border-subtle/50 dark:border-border-subtle/50 shadow-md',
    boxFocused:
      'border-brand-primary-500/50 shadow-lg shadow-brand-primary-500/10 ring-1 ring-brand-primary-500/20',
    boxFilled: 'bg-bg-secondary dark:bg-bg-secondary shadow-sm',
    boxError:
      'border-error/50 shadow-lg shadow-error/10 bg-error/5 dark:bg-error/10',
    boxSuccess:
      'border-success/50 shadow-lg shadow-success/10 bg-success/5 dark:bg-success/10',
    boxDisabled:
      'bg-bg-secondary dark:bg-bg-secondary opacity-50 cursor-not-allowed shadow-none',
    text: 'text-text-primary dark:text-text-primary',
    caret: 'bg-brand-primary-500',
  },
  glass: {
    box: 'bg-bg-elevated/60 dark:bg-bg-elevated/60 backdrop-blur-sm border border-white/20 dark:border-border-subtle/30',
    boxFocused:
      'border-brand-primary-400/50 bg-bg-elevated/80 dark:bg-bg-elevated/80 ring-1 ring-brand-primary-400/30',
    boxFilled: 'bg-bg-elevated/70 dark:bg-bg-elevated/70',
    boxError: 'border-error/50 bg-error/5 dark:bg-error/10',
    boxSuccess: 'border-success/50 bg-success/5 dark:bg-success/10',
    boxDisabled:
      'bg-bg-secondary/50 dark:bg-bg-secondary/50 opacity-50 cursor-not-allowed',
    text: 'text-text-primary dark:text-text-primary',
    caret: 'bg-brand-primary-400',
  },
} as const;

/**
 * Numpad button variant styles - CSS variable-backed
 */
export const NUMPAD_BUTTON_STYLES = {
  default:
    'bg-bg-elevated dark:bg-bg-elevated text-text-primary dark:text-text-primary border border-border-default dark:border-border-default hover:bg-bg-secondary dark:hover:bg-bg-secondary active:bg-bg-tertiary dark:active:bg-bg-tertiary',
  primary:
    'bg-brand-primary-500 dark:bg-brand-primary-600 text-white border border-brand-primary-500 dark:border-brand-primary-600 hover:bg-brand-primary-600 dark:hover:bg-brand-primary-500 active:bg-brand-primary-700 dark:active:bg-brand-primary-400',
  secondary:
    'bg-bg-secondary dark:bg-bg-secondary text-text-secondary dark:text-text-secondary border border-border-default dark:border-border-subtle hover:bg-bg-tertiary dark:hover:bg-bg-tertiary active:bg-bg-elevated dark:active:bg-bg-elevated',
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
