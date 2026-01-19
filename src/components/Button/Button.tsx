// src/components/Button/Button.tsx

'use client';

import { forwardRef, useCallback, useMemo, useId } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  type ButtonProps,
  type HapticFeedback,
  BUTTON_SIZE_CONFIG,
  BUTTON_RADIUS_CONFIG,
  BUTTON_COLOR_CONFIG,
  BUTTON_SPRING_CONFIG,
  BUTTON_ANIMATION_VARIANTS,
} from './types';

/**
 * Button Component
 *
 * A physics-based button with Apple-inspired interactions.
 * Features spring animations, haptic feedback support, and full accessibility.
 *
 * Design Principles Applied:
 * - #4 System-Level Consistency: Uses centralized design tokens
 * - #6 Purposeful Motion: Spring-based physics, reduced-motion support
 * - #9 Obvious Affordances: Clear visual hierarchy, touch targets
 * - #12 Accessibility: Focus always enabled, ARIA attributes
 * - #16 Micro-Interaction Precision: Squash-stretch, hover lift
 *
 * @example
 * ```tsx
 * <Button variant="solid" color="primary" size="md">
 *   Click me
 * </Button>
 *
 * <Button variant="glass" leftIcon={<FiPlus />} isLoading>
 *   Creating...
 * </Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      color = 'primary',
      size = 'md',
      radius = 'md',
      isLoading = false,
      loadingText,
      fullWidth = false,
      leftIcon,
      rightIcon,
      spinner,
      disableAnimation = false,
      onHaptic,
      disabled,
      className,
      onClick,
      children,
      type = 'button',
      ...rest
    },
    ref,
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const buttonId = useId();
    const shouldAnimate = !disableAnimation && !prefersReducedMotion;

    // Get configurations
    const sizeConfig = BUTTON_SIZE_CONFIG[size];
    const radiusConfig = BUTTON_RADIUS_CONFIG[radius];
    const colorConfig =
      BUTTON_COLOR_CONFIG[color]?.[variant] ??
      BUTTON_COLOR_CONFIG.primary.solid;

    // Handle click with haptic feedback
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isLoading || disabled) {
          e.preventDefault();
          return;
        }

        // Trigger haptic feedback
        onHaptic?.('light');

        onClick?.(e);
      },
      [isLoading, disabled, onClick, onHaptic],
    );

    // Handle pointer down for press haptic
    const handlePointerDown = useCallback(() => {
      if (!isLoading && !disabled) {
        onHaptic?.('light');
      }
    }, [isLoading, disabled, onHaptic]);

    // Animation variants with spring physics
    const motionVariants: Variants = useMemo(
      () => ({
        idle: {
          scale: 1,
          y: 0,
          transition: {
            type: 'spring',
            ...BUTTON_SPRING_CONFIG.release,
          },
        },
        hover: shouldAnimate
          ? {
              scale: 1.02,
              y: -1,
              transition: {
                type: 'spring',
                ...BUTTON_SPRING_CONFIG.hover,
              },
            }
          : {},
        tap: shouldAnimate
          ? {
              scale: 0.97,
              y: 0,
              transition: {
                type: 'spring',
                ...BUTTON_SPRING_CONFIG.press,
              },
            }
          : {},
      }),
      [shouldAnimate],
    );

    // Spinner component with spring rotation
    const SpinnerElement = useMemo(() => {
      if (spinner) return spinner;

      return (
        <motion.svg
          className={cn('text-current', sizeConfig.iconSize)}
          viewBox="0 0 24 24"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </motion.svg>
      );
    }, [spinner, sizeConfig.iconSize]);

    // Computed class names using cn() utility
    const computedClassName = useMemo(
      () =>
        cn(
          // Base styles
          'relative inline-flex items-center justify-center',
          'font-medium select-none cursor-pointer',
          'transition-colors duration-150',

          // Focus ring (always enabled for accessibility)
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400',
          'dark:focus-visible:ring-offset-gray-900',

          // Size
          sizeConfig.height,
          sizeConfig.minHeight,
          sizeConfig.padding,
          sizeConfig.text,
          sizeConfig.gap,

          // Radius
          radiusConfig,

          // Color variant
          colorConfig.base,
          !disabled && !isLoading && colorConfig.hover,
          colorConfig.shadow,

          // Full width
          fullWidth && 'w-full',

          // Disabled state
          (disabled || isLoading) && [
            'opacity-50',
            'cursor-not-allowed',
            'pointer-events-none',
          ],

          // Custom className
          className,
        ),
      [
        sizeConfig,
        radiusConfig,
        colorConfig,
        fullWidth,
        disabled,
        isLoading,
        className,
      ],
    );

    // Render content
    const content = (
      <>
        {/* Left icon or loading spinner */}
        {isLoading ? (
          <span className="flex-shrink-0">{SpinnerElement}</span>
        ) : (
          leftIcon && (
            <span className={cn('flex-shrink-0', sizeConfig.iconSize)}>
              {leftIcon}
            </span>
          )
        )}

        {/* Button text */}
        {(children || loadingText) && (
          <span className="truncate">
            {isLoading && loadingText ? loadingText : children}
          </span>
        )}

        {/* Right icon (hidden during loading) */}
        {rightIcon && !isLoading && (
          <span className={cn('flex-shrink-0', sizeConfig.iconSize)}>
            {rightIcon}
          </span>
        )}
      </>
    );

    // Render with or without motion
    if (shouldAnimate) {
      return (
        <motion.button
          ref={ref}
          type={type}
          id={buttonId}
          className={computedClassName}
          disabled={disabled || isLoading}
          onClick={handleClick}
          onPointerDown={handlePointerDown}
          variants={motionVariants}
          initial="idle"
          whileHover={!disabled && !isLoading ? 'hover' : undefined}
          whileTap={!disabled && !isLoading ? 'tap' : undefined}
          aria-disabled={disabled || isLoading}
          aria-busy={isLoading}
          {...rest}
        >
          {content}
        </motion.button>
      );
    }

    // Non-animated fallback (reduced motion or explicit disable)
    return (
      <button
        ref={ref}
        type={type}
        id={buttonId}
        className={computedClassName}
        disabled={disabled || isLoading}
        onClick={handleClick}
        aria-disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...rest}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
export { Button };
export type { ButtonProps, HapticFeedback };
