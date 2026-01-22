'use client';

import {
  forwardRef,
  useCallback,
  MouseEvent,
  KeyboardEvent,
  ReactNode,
} from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

/**
 * Chip size variants
 */
export type ChipSize = 'sm' | 'md';

/**
 * Chip visual variants
 */
export type ChipVariant = 'filled' | 'outlined' | 'subtle';

/**
 * Chip color options
 */
export type ChipColor = 'default' | 'primary' | 'success' | 'warning' | 'error';

/**
 * Props for Chip component
 */
export interface ChipProps {
  /** Chip content (text label) */
  children: ReactNode;
  /** Visual variant */
  variant?: ChipVariant;
  /** Color theme */
  color?: ChipColor;
  /** Size variant */
  size?: ChipSize;
  /** Optional leading icon */
  icon?: ReactNode;
  /** Show dismiss button */
  dismissible?: boolean;
  /** Dismiss callback */
  onDismiss?: () => void;
  /** Make chip clickable/selectable */
  clickable?: boolean;
  /** Click callback */
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  /** Selected state (for selectable chips) */
  selected?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Size configuration following 8pt grid
 */
const CHIP_SIZE_CONFIG: Record<
  ChipSize,
  {
    padding: string;
    fontSize: string;
    iconSize: string;
    dismissSize: string;
    gap: string;
    radius: string;
    minHeight: number;
  }
> = {
  sm: {
    padding: 'px-2 py-0.5',
    fontSize: 'text-xs',
    iconSize: 'w-3.5 h-3.5',
    dismissSize: 'w-3.5 h-3.5',
    gap: 'gap-1',
    radius: 'rounded-md',
    minHeight: 24,
  },
  md: {
    padding: 'px-3 py-1',
    fontSize: 'text-sm',
    iconSize: 'w-4 h-4',
    dismissSize: 'w-4 h-4',
    gap: 'gap-1.5',
    radius: 'rounded-lg',
    minHeight: 32,
  },
};

/**
 * Color configuration for each variant (CSS variable-backed via @tahoe-ui/tailwind-preset)
 */
const CHIP_COLOR_CONFIG: Record<
  ChipVariant,
  Record<
    ChipColor,
    {
      base: string;
      text: string;
      hover: string;
      selected: string;
    }
  >
> = {
  filled: {
    default: {
      base: 'bg-gray-200 dark:bg-gray-700',
      text: 'text-gray-800 dark:text-gray-100',
      hover: 'hover:bg-gray-300 dark:hover:bg-gray-600',
      selected: 'bg-gray-300 dark:bg-gray-600 ring-2 ring-gray-400',
    },
    primary: {
      base: 'bg-brand-primary-100 dark:bg-brand-primary-900/50',
      text: 'text-brand-primary-800 dark:text-brand-primary-200',
      hover: 'hover:bg-brand-primary-200 dark:hover:bg-brand-primary-800/60',
      selected:
        'bg-brand-primary-200 dark:bg-brand-primary-800 ring-2 ring-brand-primary-400',
    },
    success: {
      base: 'bg-success-light dark:bg-success-dark/20',
      text: 'text-success-dark dark:text-success',
      hover: 'hover:bg-success/20 dark:hover:bg-success-dark/40',
      selected: 'bg-success/30 dark:bg-success-dark/50 ring-2 ring-success',
    },
    warning: {
      base: 'bg-warning-light dark:bg-warning-dark/20',
      text: 'text-warning-dark dark:text-warning',
      hover: 'hover:bg-warning/20 dark:hover:bg-warning-dark/40',
      selected: 'bg-warning/30 dark:bg-warning-dark/50 ring-2 ring-warning',
    },
    error: {
      base: 'bg-error-light dark:bg-error-dark/20',
      text: 'text-error-dark dark:text-error',
      hover: 'hover:bg-error/20 dark:hover:bg-error-dark/40',
      selected: 'bg-error/30 dark:bg-error-dark/50 ring-2 ring-error',
    },
  },
  outlined: {
    default: {
      base: 'bg-transparent border border-border-default',
      text: 'text-text-secondary',
      hover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
      selected: 'bg-gray-100 dark:bg-gray-800 ring-2 ring-gray-400',
    },
    primary: {
      base: 'bg-transparent border border-brand-primary-300 dark:border-brand-primary-700',
      text: 'text-brand-primary-700 dark:text-brand-primary-300',
      hover: 'hover:bg-brand-primary-50 dark:hover:bg-brand-primary-900/30',
      selected:
        'bg-brand-primary-50 dark:bg-brand-primary-900/50 ring-2 ring-brand-primary-400',
    },
    success: {
      base: 'bg-transparent border border-success/50',
      text: 'text-success-dark dark:text-success',
      hover: 'hover:bg-success-light dark:hover:bg-success-dark/20',
      selected: 'bg-success-light dark:bg-success-dark/30 ring-2 ring-success',
    },
    warning: {
      base: 'bg-transparent border border-warning/50',
      text: 'text-warning-dark dark:text-warning',
      hover: 'hover:bg-warning-light dark:hover:bg-warning-dark/20',
      selected: 'bg-warning-light dark:bg-warning-dark/30 ring-2 ring-warning',
    },
    error: {
      base: 'bg-transparent border border-error/50',
      text: 'text-error-dark dark:text-error',
      hover: 'hover:bg-error-light dark:hover:bg-error-dark/20',
      selected: 'bg-error-light dark:bg-error-dark/30 ring-2 ring-error',
    },
  },
  subtle: {
    default: {
      base: 'bg-gray-100/50 dark:bg-gray-800/50',
      text: 'text-text-muted',
      hover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
      selected: 'bg-gray-200 dark:bg-gray-700 ring-2 ring-gray-400',
    },
    primary: {
      base: 'bg-brand-primary-50/50 dark:bg-brand-primary-900/20',
      text: 'text-brand-primary-600 dark:text-brand-primary-400',
      hover: 'hover:bg-brand-primary-100 dark:hover:bg-brand-primary-900/40',
      selected:
        'bg-brand-primary-100 dark:bg-brand-primary-900/60 ring-2 ring-brand-primary-400',
    },
    success: {
      base: 'bg-success-light/50 dark:bg-success-dark/10',
      text: 'text-success-dark dark:text-success',
      hover: 'hover:bg-success-light dark:hover:bg-success-dark/30',
      selected: 'bg-success-light dark:bg-success-dark/40 ring-2 ring-success',
    },
    warning: {
      base: 'bg-warning-light/50 dark:bg-warning-dark/10',
      text: 'text-warning-dark dark:text-warning',
      hover: 'hover:bg-warning-light dark:hover:bg-warning-dark/30',
      selected: 'bg-warning-light dark:bg-warning-dark/40 ring-2 ring-warning',
    },
    error: {
      base: 'bg-error-light/50 dark:bg-error-dark/10',
      text: 'text-error-dark dark:text-error',
      hover: 'hover:bg-error-light dark:hover:bg-error-dark/30',
      selected: 'bg-error-light dark:bg-error-dark/40 ring-2 ring-error',
    },
  },
};

/**
 * Animation configuration for chip interactions
 */
const CHIP_ANIMATION_CONFIG = {
  tapScale: 0.97,
  spring: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 25,
  },
  transition: {
    duration: 0.15,
  },
};

/**
 * Chip - Compact element for categorization, filtering, or selection
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
      className={twMerge(
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

        // Focus styles (CSS variable-backed via @tahoe-ui/tailwind-preset)
        isInteractive &&
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500/50 focus-visible:ring-offset-1',

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
          className={twMerge(sizeConfig.iconSize, 'flex-shrink-0')}
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
          className={twMerge(
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

export default Chip;
