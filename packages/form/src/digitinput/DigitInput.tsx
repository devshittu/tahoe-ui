'use client';

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  Fragment,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useDigitInput } from './useDigitInput';
import type {
  DigitInputProps,
  DigitInputSize,
  DigitInputVariant,
  BoxAnimationState,
} from './types';
import {
  DIGIT_INPUT_CONFIG,
  SIZE_CONFIG,
  VARIANT_STYLES,
  SPRING_CONFIGS,
} from './types';

/**
 * Ref handle for DigitInput
 */
export interface DigitInputRef {
  /** Focus the first empty box or the first box */
  focus: () => void;
  /** Clear all digits */
  clear: () => void;
  /** Get current value */
  getValue: () => string;
  /** Set value programmatically */
  setValue: (value: string) => void;
  /** Trigger error state */
  triggerError: () => void;
  /** Trigger success state */
  triggerSuccess: () => void;
  /** Reset state */
  resetState: () => void;
}

/**
 * DigitInput - Apple-style tokenized digit input for OTP/PIN entry
 *
 * Features:
 * - Smart paste handling (strips non-digits, fills from position)
 * - Seamless backspace navigation
 * - Arrow key navigation
 * - Mobile numpad support
 * - Haptic feedback
 * - Multiple visual variants
 * - Error/success states with animations
 *
 * @example
 * ```tsx
 * <DigitInput
 *   length={6}
 *   onComplete={(code) => verifyOTP(code)}
 *   variant="elevated"
 *   size="md"
 * />
 * ```
 */
export const DigitInput = forwardRef<DigitInputRef, DigitInputProps>(
  function DigitInput(
    {
      value: controlledValue,
      defaultValue,
      onChange,
      onComplete,
      onError,
      length = DIGIT_INPUT_CONFIG.length,
      mode = DIGIT_INPUT_CONFIG.mode,
      masked = DIGIT_INPUT_CONFIG.masked,
      autoSubmit = DIGIT_INPUT_CONFIG.autoSubmit,
      autoFocus = DIGIT_INPUT_CONFIG.autoFocus,
      backspaceMovesLeft = DIGIT_INPUT_CONFIG.backspaceMovesLeft,
      allowPaste = DIGIT_INPUT_CONFIG.allowPaste,
      validate,
      disabled = false,
      readOnly = false,
      variant = 'default',
      size = 'md',
      state: externalState,
      errorMessage,
      successMessage,
      label,
      helperText,
      separator,
      separatorElement,
      className,
      boxClassName,
      enableHaptics = true,
      name,
      required,
      ariaLabel,
    },
    ref,
  ) {
    const containerRef = useRef<HTMLDivElement>(null);

    const {
      digits,
      value,
      focusedIndex,
      state: internalState,
      getBoxProps,
      getContainerProps,
      boxStates,
      focus,
      clear,
      setValue,
      triggerError,
      triggerSuccess,
      resetState,
    } = useDigitInput({
      length,
      initialValue: defaultValue,
      value: controlledValue,
      mode,
      masked,
      autoSubmit,
      backspaceMovesLeft,
      allowPaste,
      validate,
      disabled,
      readOnly,
      enableHaptics,
      onChange,
      onComplete,
      onError,
    });

    // Merge external state with internal
    const state =
      externalState ??
      (internalState === 'complete' ? undefined : internalState);

    // Auto-focus on mount
    useEffect(() => {
      if (autoFocus && !disabled) {
        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => focus(0), 50);
        return () => clearTimeout(timer);
      }
    }, [autoFocus, disabled, focus]);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      focus: () => {
        const firstEmpty = digits.findIndex((d) => d === '');
        focus(firstEmpty >= 0 ? firstEmpty : 0);
      },
      clear,
      getValue: () => value,
      setValue,
      triggerError,
      triggerSuccess,
      resetState,
    }));

    const sizeConfig = SIZE_CONFIG[size];

    // Determine if we should show error/success styling
    const showError = state === 'error' || externalState === 'error';
    const showSuccess = state === 'success' || externalState === 'success';

    return (
      <div className={twMerge('flex flex-col', className)}>
        {/* Label */}
        {label && (
          <label
            className={twMerge(
              'mb-2 text-sm font-medium',
              'text-text-secondary dark:text-text-secondary',
              disabled && 'opacity-50',
            )}
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        {/* Hidden input for form submission */}
        {name && (
          <input type="hidden" name={name} value={value} required={required} />
        )}

        {/* Digit boxes container */}
        <div
          ref={containerRef}
          {...getContainerProps()}
          role="group"
          aria-label={ariaLabel ?? label ?? 'Digit input'}
          className={twMerge(
            'flex items-center justify-center',
            disabled && 'cursor-not-allowed',
          )}
          style={{ gap: sizeConfig.gap }}
        >
          {digits.map((digit, index) => {
            const isFocused = focusedIndex === index;
            const boxState = boxStates[index];
            const showSeparator =
              separator && index > 0 && index % separator === 0;

            return (
              <Fragment key={index}>
                {/* Separator */}
                {showSeparator && (
                  <div className="flex items-center justify-center px-1">
                    {separatorElement ?? (
                      <span className="text-text-muted dark:text-text-muted text-lg">
                        –
                      </span>
                    )}
                  </div>
                )}

                {/* Digit box */}
                <DigitBox
                  {...getBoxProps(index)}
                  size={size}
                  variant={variant}
                  isFocused={isFocused}
                  boxState={boxState}
                  showError={showError}
                  showSuccess={showSuccess}
                  masked={masked}
                  className={boxClassName}
                />
              </Fragment>
            );
          })}
        </div>

        {/* Helper text / Error / Success message */}
        <AnimatePresence mode="wait">
          {showError && errorMessage ? (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-2 text-sm text-error dark:text-error text-center"
            >
              {errorMessage}
            </motion.p>
          ) : showSuccess && successMessage ? (
            <motion.p
              key="success"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-2 text-sm text-success dark:text-success text-center"
            >
              {successMessage}
            </motion.p>
          ) : helperText ? (
            <motion.p
              key="helper"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className={twMerge(
                'mt-2 text-sm text-text-muted dark:text-text-muted text-center',
                disabled && 'opacity-50',
              )}
            >
              {helperText}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    );
  },
);

/**
 * Props for individual digit box
 */
interface DigitBoxProps {
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
  size: DigitInputSize;
  variant: DigitInputVariant;
  isFocused: boolean;
  boxState: BoxAnimationState;
  showError: boolean;
  showSuccess: boolean;
  masked: boolean;
  className?: string;
}

/**
 * Individual digit input box
 */
function DigitBox({
  ref,
  value,
  type,
  inputMode,
  pattern,
  maxLength,
  disabled,
  readOnly,
  autoComplete,
  'aria-label': ariaLabel,
  onKeyDown,
  onChange,
  onFocus,
  onBlur,
  size,
  variant,
  isFocused,
  boxState,
  showError,
  showSuccess,
  masked,
  className,
}: DigitBoxProps) {
  const sizeConfig = SIZE_CONFIG[size];
  const variantStyles = VARIANT_STYLES[variant];

  // Determine box styling based on state
  const getBoxStyle = () => {
    if (disabled) return variantStyles.boxDisabled;
    if (showError) return variantStyles.boxError;
    if (showSuccess) return variantStyles.boxSuccess;
    if (isFocused) return variantStyles.boxFocused;
    if (value) return variantStyles.boxFilled;
    return variantStyles.box;
  };

  // Shake animation for error
  const shakeAnimation =
    boxState === 'shake' || boxState === 'error'
      ? {
          x: [0, -8, 8, -8, 8, -4, 4, 0],
          transition: SPRING_CONFIGS.shake,
        }
      : {};

  // Scale animation for fill
  const fillAnimation =
    boxState === 'filled'
      ? {
          scale: [1, 1.05, 1],
          transition: { duration: 0.15 },
        }
      : {};

  // Success animation
  const successAnimation =
    boxState === 'success'
      ? {
          scale: [1, 1.1, 1],
          transition: SPRING_CONFIGS.success,
        }
      : {};

  return (
    <motion.div
      className="relative flex-shrink-0"
      style={{
        width: sizeConfig.boxWidth,
        height: sizeConfig.boxHeight,
      }}
      animate={{
        ...shakeAnimation,
        ...fillAnimation,
        ...successAnimation,
      }}
    >
      {/* Visual box background */}
      <div
        className={twMerge(
          'absolute inset-0',
          'transition-all duration-200',
          'pointer-events-none',
          getBoxStyle(),
        )}
        style={{
          borderRadius: sizeConfig.borderRadius,
        }}
      />

      {/* Actual input for capturing keyboard/paste events */}
      <input
        ref={ref}
        type={type}
        inputMode={inputMode}
        pattern={pattern}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete={autoComplete}
        aria-label={ariaLabel}
        value={value}
        onKeyDown={onKeyDown}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={twMerge(
          'absolute inset-0 w-full h-full',
          'text-center font-semibold',
          'transition-all duration-200',
          'outline-none',
          'selection:bg-transparent',
          'bg-transparent border-0',
          sizeConfig.fontSize,
          // Hide text when masked - we'll show the dot via overlay
          masked && value ? 'text-transparent' : variantStyles.text,
          className,
        )}
        style={{
          borderRadius: sizeConfig.borderRadius,
          caretColor: 'transparent',
        }}
      />

      {/* Display value for non-masked mode */}
      {!masked && value && (
        <div
          className={twMerge(
            'absolute inset-0 flex items-center justify-center',
            'pointer-events-none',
            'font-semibold',
            sizeConfig.fontSize,
            variantStyles.text,
          )}
        >
          {value}
        </div>
      )}

      {/* Animated caret for focused empty box - centered */}
      <AnimatePresence>
        {isFocused && !value && !disabled && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            className={twMerge(
              'absolute inset-0 flex items-center justify-center',
              'pointer-events-none',
            )}
          >
            <motion.div
              className={twMerge('w-0.5 rounded-full', variantStyles.caret)}
              style={{ height: sizeConfig.boxHeight * 0.4 }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filled indicator dot for masked mode - centered */}
      {masked && value && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={twMerge(
            'absolute inset-0 flex items-center justify-center',
            'pointer-events-none',
            variantStyles.text,
          )}
        >
          <span
            className="block"
            style={{
              width: sizeConfig.boxHeight * 0.2,
              height: sizeConfig.boxHeight * 0.2,
              borderRadius: '50%',
              backgroundColor: 'currentColor',
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

export default DigitInput;
