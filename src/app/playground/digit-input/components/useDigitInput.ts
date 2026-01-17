// src/app/playground/digit-input/components/useDigitInput.ts
'use client';

import { useCallback, useRef, useState, useEffect, useMemo } from 'react';
import type {
  UseDigitInputReturn,
  DigitInputState,
  BoxAnimationState,
  DigitInputMode,
} from './types';
import { DIGIT_INPUT_CONFIG, HAPTIC_PATTERNS } from './types';

/**
 * Trigger haptic feedback using Vibration API
 */
function triggerHaptic(pattern: readonly number[]): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate([...pattern]);
  }
}

/**
 * Options for useDigitInput hook
 */
export interface UseDigitInputOptions {
  /** Number of digit boxes */
  length?: number;
  /** Initial value */
  initialValue?: string;
  /** Controlled value */
  value?: string;
  /** Input mode (numeric or alphanumeric) */
  mode?: DigitInputMode;
  /** Mask input with dots */
  masked?: boolean;
  /** Auto-submit on complete */
  autoSubmit?: boolean;
  /** Backspace moves to previous box */
  backspaceMovesLeft?: boolean;
  /** Allow paste */
  allowPaste?: boolean;
  /** Custom validation */
  validate?: (value: string) => boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Enable haptics */
  enableHaptics?: boolean;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Callback when complete */
  onComplete?: (value: string) => void;
  /** Callback on error */
  onError?: (value: string) => void;
}

/**
 * Hook for managing digit input state and behavior
 *
 * Features:
 * - Smart paste handling (strips non-digits, fills from current position)
 * - Seamless backspace navigation
 * - Arrow key navigation
 * - Mobile numpad support
 * - Haptic feedback
 * - Validation support
 * - Animation state management
 *
 * @example
 * ```tsx
 * const {
 *   digits,
 *   value,
 *   getBoxProps,
 *   getContainerProps,
 *   isComplete,
 * } = useDigitInput({
 *   length: 6,
 *   onComplete: (code) => verifyOTP(code),
 * });
 * ```
 */
export function useDigitInput(
  options: UseDigitInputOptions = {},
): UseDigitInputReturn {
  const {
    length = DIGIT_INPUT_CONFIG.length,
    initialValue = '',
    value: controlledValue,
    mode = DIGIT_INPUT_CONFIG.mode,
    masked = DIGIT_INPUT_CONFIG.masked,
    autoSubmit = DIGIT_INPUT_CONFIG.autoSubmit,
    backspaceMovesLeft = DIGIT_INPUT_CONFIG.backspaceMovesLeft,
    allowPaste = DIGIT_INPUT_CONFIG.allowPaste,
    validate,
    disabled = false,
    readOnly = false,
    enableHaptics = true,
    onChange,
    onComplete,
    onError,
  } = options;

  // Parse initial/controlled value into digits array
  const parseValue = useCallback(
    (val: string): string[] => {
      const chars = val.slice(0, length).split('');
      const result = Array(length).fill('');
      chars.forEach((char, i) => {
        if (isValidChar(char, mode)) {
          result[i] = char;
        }
      });
      return result;
    },
    [length, mode],
  );

  // State
  const [digits, setDigits] = useState<string[]>(() =>
    parseValue(controlledValue ?? initialValue),
  );
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [state, setState] = useState<DigitInputState>('idle');
  const [boxStates, setBoxStates] = useState<BoxAnimationState[]>(
    Array(length).fill('idle'),
  );

  // Refs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const lastCompleteValueRef = useRef<string>('');

  // Sync with controlled value
  useEffect(() => {
    if (controlledValue !== undefined) {
      setDigits(parseValue(controlledValue));
    }
  }, [controlledValue, parseValue]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
    while (inputRefs.current.length < length) {
      inputRefs.current.push(null);
    }
  }, [length]);

  // Computed values
  const value = useMemo(() => digits.join(''), [digits]);
  const isComplete = useMemo(() => digits.every((d) => d !== ''), [digits]);
  const hasError = state === 'error';

  // Trigger error state with shake
  const triggerError = useCallback(() => {
    setState('error');
    setBoxStates(Array(length).fill('shake'));

    if (enableHaptics) {
      triggerHaptic(HAPTIC_PATTERNS.error);
    }

    // Reset shake after animation
    setTimeout(() => {
      setBoxStates((prev) => prev.map((s) => (s === 'shake' ? 'error' : s)));
    }, 500);
  }, [length, enableHaptics]);

  // Check if complete and trigger callback
  useEffect(() => {
    if (isComplete && value !== lastCompleteValueRef.current) {
      lastCompleteValueRef.current = value;
      setState('complete');

      // Validate if provided
      if (validate && !validate(value)) {
        triggerError();
        onError?.(value);
        return;
      }

      // Haptic feedback
      if (enableHaptics) {
        triggerHaptic(HAPTIC_PATTERNS.complete);
      }

      // Trigger success state
      setBoxStates(Array(length).fill('success'));

      onComplete?.(value);

      if (autoSubmit) {
        // Auto-submit logic would go here
      }
    } else if (!isComplete) {
      lastCompleteValueRef.current = '';
    }
  }, [
    isComplete,
    value,
    validate,
    onComplete,
    onError,
    autoSubmit,
    enableHaptics,
    length,
    triggerError,
  ]);

  // Update digits and notify
  const updateDigits = useCallback(
    (newDigits: string[]) => {
      setDigits(newDigits);
      onChange?.(newDigits.join(''));
    },
    [onChange],
  );

  // Set a single digit
  const setDigit = useCallback(
    (index: number, digit: string) => {
      if (index < 0 || index >= length || disabled || readOnly) return;

      const newDigits = [...digits];
      newDigits[index] = digit;
      updateDigits(newDigits);

      // Update box state
      setBoxStates((prev) => {
        const next = [...prev];
        next[index] = digit ? 'filled' : 'idle';
        return next;
      });

      // Haptic feedback
      if (digit && enableHaptics) {
        triggerHaptic(HAPTIC_PATTERNS.input);
      }
    },
    [digits, length, disabled, readOnly, updateDigits, enableHaptics],
  );

  // Set entire value
  const setValue = useCallback(
    (newValue: string) => {
      const newDigits = parseValue(newValue);
      updateDigits(newDigits);

      // Update box states
      setBoxStates(newDigits.map((d) => (d ? 'filled' : 'idle')));
    },
    [parseValue, updateDigits],
  );

  // Focus a specific box
  const focus = useCallback(
    (index: number) => {
      if (index < 0 || index >= length) return;
      inputRefs.current[index]?.focus();
      setFocusedIndex(index);
    },
    [length],
  );

  // Clear all digits
  const clear = useCallback(() => {
    const emptyDigits = Array(length).fill('');
    updateDigits(emptyDigits);
    setBoxStates(Array(length).fill('idle'));
    setState('idle');
    lastCompleteValueRef.current = '';
    focus(0);
  }, [length, updateDigits, focus]);

  // Blur current focus
  const blur = useCallback(() => {
    inputRefs.current[focusedIndex]?.blur();
    setFocusedIndex(-1);
  }, [focusedIndex]);

  // Handle key down
  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (disabled || readOnly) return;

      switch (e.key) {
        case 'Backspace':
          e.preventDefault();
          if (digits[index]) {
            // Clear current box
            setDigit(index, '');
            if (enableHaptics) {
              triggerHaptic(HAPTIC_PATTERNS.delete);
            }
          } else if (backspaceMovesLeft && index > 0) {
            // Move to previous box and clear it
            setDigit(index - 1, '');
            focus(index - 1);
            if (enableHaptics) {
              triggerHaptic(HAPTIC_PATTERNS.delete);
            }
          }
          // Reset state if was error/success
          if (state === 'error' || state === 'success') {
            setState('focused');
            setBoxStates(
              digits.map((d, i) =>
                i === index ? 'idle' : d ? 'filled' : 'idle',
              ),
            );
          }
          break;

        case 'Delete':
          e.preventDefault();
          if (digits[index]) {
            setDigit(index, '');
            if (enableHaptics) {
              triggerHaptic(HAPTIC_PATTERNS.delete);
            }
          }
          break;

        case 'ArrowLeft':
          e.preventDefault();
          if (index > 0) {
            focus(index - 1);
          }
          break;

        case 'ArrowRight':
          e.preventDefault();
          if (index < length - 1) {
            focus(index + 1);
          }
          break;

        case 'ArrowUp':
        case 'ArrowDown':
          // Prevent default scrolling
          e.preventDefault();
          break;

        case 'Home':
          e.preventDefault();
          focus(0);
          break;

        case 'End':
          e.preventDefault();
          focus(length - 1);
          break;

        case 'Tab':
          // Allow natural tab behavior
          break;

        default:
          // Check if it's a valid character
          if (e.key.length === 1) {
            e.preventDefault();
            if (isValidChar(e.key, mode)) {
              setDigit(index, e.key);
              // Move to next box
              if (index < length - 1) {
                focus(index + 1);
              }
            }
          }
      }
    },
    [
      digits,
      disabled,
      readOnly,
      backspaceMovesLeft,
      mode,
      length,
      state,
      enableHaptics,
      setDigit,
      focus,
    ],
  );

  // Handle input change (for mobile/IME)
  const handleChange = useCallback(
    (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;

      const inputValue = e.target.value;

      // Handle multi-character input (mobile autocomplete, etc.)
      if (inputValue.length > 1) {
        // Treat as paste-like behavior
        const validChars = inputValue
          .split('')
          .filter((char) => isValidChar(char, mode));

        if (validChars.length > 0) {
          const newDigits = [...digits];
          validChars.forEach((char, i) => {
            if (index + i < length) {
              newDigits[index + i] = char;
            }
          });
          updateDigits(newDigits);
          setBoxStates(newDigits.map((d) => (d ? 'filled' : 'idle')));

          // Move focus to next empty or last filled
          const nextEmpty = newDigits.findIndex(
            (d, i) => i >= index && d === '',
          );
          focus(
            nextEmpty >= 0
              ? nextEmpty
              : Math.min(index + validChars.length, length - 1),
          );
        }
        return;
      }

      // Single character input
      const char = inputValue.slice(-1);
      if (char && isValidChar(char, mode)) {
        setDigit(index, char);
        if (index < length - 1) {
          focus(index + 1);
        }
      }
    },
    [digits, disabled, readOnly, mode, length, updateDigits, setDigit, focus],
  );

  // Handle paste
  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      if (!allowPaste || disabled || readOnly) return;

      e.preventDefault();
      const pastedText = e.clipboardData.getData('text');

      // Extract valid characters
      const validChars = pastedText
        .split('')
        .filter((char) => isValidChar(char, mode));

      if (validChars.length === 0) return;

      // Determine starting position
      const startIndex = focusedIndex >= 0 ? focusedIndex : 0;

      // Fill digits from start position
      const newDigits = [...digits];
      validChars.forEach((char, i) => {
        if (startIndex + i < length) {
          newDigits[startIndex + i] = char;
        }
      });

      updateDigits(newDigits);
      setBoxStates(newDigits.map((d) => (d ? 'filled' : 'idle')));

      // Haptic feedback
      if (enableHaptics) {
        triggerHaptic(HAPTIC_PATTERNS.input);
      }

      // Move focus to next empty or last position
      const nextEmpty = newDigits.findIndex((d) => d === '');
      focus(nextEmpty >= 0 ? nextEmpty : length - 1);
    },
    [
      allowPaste,
      disabled,
      readOnly,
      mode,
      focusedIndex,
      digits,
      length,
      updateDigits,
      enableHaptics,
      focus,
    ],
  );

  // Handle focus on box
  const handleFocus = useCallback(
    (index: number) => {
      setFocusedIndex(index);
      if (state === 'idle' || state === 'complete') {
        setState('focused');
      }
    },
    [state],
  );

  // Handle blur
  const handleBlur = useCallback(() => {
    setFocusedIndex(-1);
    if (state === 'focused' || state === 'filling') {
      setState(isComplete ? 'complete' : 'idle');
    }
  }, [state, isComplete]);

  // Trigger success state
  const triggerSuccess = useCallback(() => {
    setState('success');
    setBoxStates(Array(length).fill('success'));

    if (enableHaptics) {
      triggerHaptic(HAPTIC_PATTERNS.success);
    }
  }, [length, enableHaptics]);

  // Reset to idle state
  const resetState = useCallback(() => {
    setState('idle');
    setBoxStates(digits.map((d) => (d ? 'filled' : 'idle')));
  }, [digits]);

  // Get props for a specific box
  const getBoxProps = useCallback(
    (index: number) => ({
      ref: (el: HTMLInputElement | null) => {
        inputRefs.current[index] = el;
      },
      // Always pass actual digit - masking is handled visually in the component
      value: digits[index],
      type: 'text' as const,
      inputMode: (mode === 'numeric' ? 'numeric' : 'text') as
        | 'numeric'
        | 'text',
      pattern: mode === 'numeric' ? '\\d*' : '[A-Za-z0-9]*',
      maxLength: 1,
      disabled,
      readOnly,
      autoComplete: 'one-time-code',
      'aria-label': `Digit ${index + 1} of ${length}`,
      onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
        handleKeyDown(index, e),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleChange(index, e),
      onFocus: () => handleFocus(index),
      onBlur: () => handleBlur(),
    }),
    [
      digits,
      mode,
      length,
      disabled,
      readOnly,
      handleKeyDown,
      handleChange,
      handleFocus,
      handleBlur,
    ],
  );

  // Get props for container
  const getContainerProps = useCallback(
    () => ({
      onPaste: handlePaste,
    }),
    [handlePaste],
  );

  return {
    digits,
    value,
    focusedIndex,
    state,
    isComplete,
    hasError,
    setDigit,
    setValue,
    clear,
    focus,
    blur,
    handleKeyDown,
    handleChange,
    handlePaste,
    handleFocus,
    handleBlur,
    triggerError,
    triggerSuccess,
    resetState,
    getBoxProps,
    getContainerProps,
    boxStates,
  };
}

/**
 * Check if a character is valid for the given mode
 */
function isValidChar(char: string, mode: DigitInputMode): boolean {
  if (mode === 'numeric') {
    return /^\d$/.test(char);
  }
  return /^[A-Za-z0-9]$/.test(char);
}

export default useDigitInput;
