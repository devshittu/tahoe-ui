// src/app/playground/chip/components/Chip.tsx

'use client';

import { forwardRef, useCallback, MouseEvent, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import {
  ChipProps,
  CHIP_SIZE_CONFIG,
  CHIP_COLOR_CONFIG,
  CHIP_ANIMATION_CONFIG,
} from './types';

/**
 * Chip - Compact element for categorization, filtering, or selection
 *
 * Design Principles Applied:
 * - #2 Visual Hierarchy Through Restraint: Colors indicate meaning
 * - #3 Intentional White Space: 8pt grid padding
 * - #6 Purposeful Motion: Subtle tap feedback
 * - #9 Obvious Affordances: Clear interactive states
 * - #12 Accessibility: Keyboard accessible, proper ARIA
 * - #16 Micro-Interaction Precision: Smooth state transitions
 *
 * Features:
 * - Three variants: filled, outlined, subtle
 * - Five colors: default, primary, success, warning, error
 * - Two sizes: sm, md
 * - Optional leading icon
 * - Dismissible with callback
 * - Clickable/selectable mode
 * - Full keyboard support
 * - Dark mode support
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Chip>Label</Chip>
 *
 * // With icon and dismissible
 * <Chip icon={<FiTag />} dismissible onDismiss={handleRemove}>
 *   Category
 * </Chip>
 *
 * // Selectable chip
 * <Chip
 *   clickable
 *   selected={isSelected}
 *   onClick={() => setSelected(!isSelected)}
 * >
 *   Filter
 * </Chip>
 * ```
 */
export const Chip = forwardRef<HTMLElement, ChipProps>(function Chip(
  {
    children,
    variant = 'filled',
    color = 'default',
    size = 'md',
    icon,
    dismissible = false,
    onDismiss,
    clickable = false,
    onClick,
    selected = false,
    disabled = false,
    className,
    ...props
  },
  ref,
) {
  const sizeConfig = CHIP_SIZE_CONFIG[size];
  const colorConfig = CHIP_COLOR_CONFIG[variant][color];
  const isInteractive = clickable || dismissible;

  // Handle chip click
  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (disabled) return;
      onClick?.(e);
    },
    [disabled, onClick],
  );

  // Handle dismiss click
  const handleDismiss = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      onDismiss?.();
    },
    [disabled, onDismiss],
  );

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (disabled) return;

      if (clickable && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.(e as unknown as MouseEvent<HTMLElement>);
      }

      if (dismissible && e.key === 'Delete') {
        e.preventDefault();
        onDismiss?.();
      }
    },
    [disabled, clickable, dismissible, onClick, onDismiss],
  );

  // Determine element type based on interactivity
  const Component = clickable ? motion.button : motion.span;

  return (
    <Component
      ref={ref as React.Ref<HTMLButtonElement & HTMLSpanElement>}
      type={clickable ? 'button' : undefined}
      role={clickable ? undefined : dismissible ? 'listitem' : undefined}
      tabIndex={isInteractive && !disabled ? 0 : undefined}
      aria-pressed={clickable ? selected : undefined}
      aria-disabled={disabled}
      onClick={clickable ? handleClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      className={cn(
        // Base styles
        'inline-flex items-center font-medium',
        'select-none whitespace-nowrap',
        sizeConfig.padding,
        sizeConfig.fontSize,
        sizeConfig.gap,
        sizeConfig.radius,

        // Color styles
        colorConfig.base,
        colorConfig.text,

        // Interactive styles
        isInteractive && !disabled && colorConfig.hover,
        isInteractive && !disabled && 'cursor-pointer',

        // Selected state
        selected && colorConfig.selected,

        // Focus styles
        isInteractive &&
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-1',

        // Disabled state
        disabled && 'opacity-50 cursor-not-allowed',

        // Transition
        'transition-colors duration-150',

        className,
      )}
      initial={false}
      whileTap={
        clickable && !disabled
          ? { scale: CHIP_ANIMATION_CONFIG.tapScale }
          : undefined
      }
      transition={CHIP_ANIMATION_CONFIG.transition}
      {...props}
    >
      {/* Leading icon */}
      {icon && (
        <span
          className={cn(sizeConfig.iconSize, 'flex-shrink-0')}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}

      {/* Content */}
      <span>{children}</span>

      {/* Dismiss button */}
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          disabled={disabled}
          aria-label="Remove"
          className={cn(
            'flex-shrink-0 rounded-full p-0.5 -mr-1',
            'transition-colors duration-150',
            'hover:bg-black/10 dark:hover:bg-white/10',
            'focus:outline-none focus-visible:ring-1 focus-visible:ring-current',
            disabled && 'pointer-events-none',
          )}
        >
          <FiX className={sizeConfig.dismissSize} aria-hidden="true" />
        </button>
      )}
    </Component>
  );
});

Chip.displayName = 'Chip';
