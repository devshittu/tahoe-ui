// src/components/Button/types.ts

import { type ButtonHTMLAttributes, type ReactNode } from 'react';

/**
 * Button style variants following Apple HIG principles:
 * - solid: Primary actions with filled background
 * - subtle: Low-emphasis with tinted background
 * - outline: Secondary actions with border
 * - ghost: Tertiary actions, minimal chrome
 * - glass: Premium vibrancy effect with backdrop blur
 */
export type ButtonVariant = 'solid' | 'subtle' | 'outline' | 'ghost' | 'glass';

/**
 * Semantic color palette
 * Maps to design token system
 */
export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'error';

/**
 * Size scale following 8pt grid
 * Touch targets enforce 44px minimum
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Border radius options
 * Maps to RADIUS_TOKENS.component.button
 */
export type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

/**
 * Physics spring configuration for animations
 */
export interface ButtonSpringConfig {
  stiffness: number;
  damping: number;
  mass?: number;
}

/**
 * Haptic feedback types for native integration
 */
export type HapticFeedback =
  | 'light'
  | 'medium'
  | 'heavy'
  | 'success'
  | 'warning'
  | 'error';

/**
 * Button component props
 */
export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | 'color'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onAnimationStart'
  | 'onAnimationEnd'
> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Color scheme */
  color?: ButtonColor;
  /** Size preset */
  size?: ButtonSize;
  /** Border radius */
  radius?: ButtonRadius;
  /** Loading state with optional message */
  isLoading?: boolean;
  /** Loading text shown alongside spinner */
  loadingText?: string;
  /** Full width button */
  fullWidth?: boolean;
  /** Icon before text */
  leftIcon?: ReactNode;
  /** Icon after text */
  rightIcon?: ReactNode;
  /** Custom loading spinner */
  spinner?: ReactNode;
  /** Disable physics animations (respects prefers-reduced-motion automatically) */
  disableAnimation?: boolean;
  /** Haptic feedback callback for native apps */
  onHaptic?: (type: HapticFeedback) => void;
  /** Children content */
  children?: ReactNode;
}

/**
 * Size configuration with touch target enforcement
 * All sizes maintain 44px minimum touch target
 */
export const BUTTON_SIZE_CONFIG = {
  xs: {
    height: 'h-7',
    minHeight: 'min-h-[44px]', // Touch target
    padding: 'px-2.5',
    text: 'text-xs',
    iconSize: 'w-3.5 h-3.5',
    gap: 'gap-1.5',
  },
  sm: {
    height: 'h-8',
    minHeight: 'min-h-[44px]',
    padding: 'px-3',
    text: 'text-sm',
    iconSize: 'w-4 h-4',
    gap: 'gap-1.5',
  },
  md: {
    height: 'h-10',
    minHeight: 'min-h-[44px]',
    padding: 'px-4',
    text: 'text-sm',
    iconSize: 'w-4 h-4',
    gap: 'gap-2',
  },
  lg: {
    height: 'h-11',
    minHeight: 'min-h-[44px]',
    padding: 'px-5',
    text: 'text-base',
    iconSize: 'w-5 h-5',
    gap: 'gap-2',
  },
  xl: {
    height: 'h-12',
    minHeight: 'min-h-[48px]',
    padding: 'px-6',
    text: 'text-base',
    iconSize: 'w-5 h-5',
    gap: 'gap-2.5',
  },
} as const;

/**
 * Border radius configuration
 * Maps to RADIUS_TOKENS
 */
export const BUTTON_RADIUS_CONFIG = {
  none: 'rounded-none',
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
} as const;

/**
 * Color configuration per variant
 * Follows design token system
 */
export const BUTTON_COLOR_CONFIG = {
  primary: {
    solid: {
      base: 'bg-gray-900 text-white dark:bg-white dark:text-gray-900',
      hover: 'hover:bg-gray-800 dark:hover:bg-gray-100',
      active: 'bg-gray-950 dark:bg-gray-200',
      shadow: 'shadow-sm hover:shadow-md',
    },
    subtle: {
      base: 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100',
      hover: 'hover:bg-gray-200 dark:hover:bg-gray-700',
      active: 'bg-gray-300 dark:bg-gray-600',
      shadow: '',
    },
    outline: {
      base: 'border border-gray-300 text-gray-900 dark:border-gray-600 dark:text-gray-100 bg-transparent',
      hover: 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
      active: 'bg-gray-100 dark:bg-gray-800',
      shadow: '',
    },
    ghost: {
      base: 'bg-transparent text-gray-900 dark:text-gray-100',
      hover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
      active: 'bg-gray-200 dark:bg-gray-700',
      shadow: '',
    },
    glass: {
      base: 'bg-white/70 text-gray-900 backdrop-blur-xl border border-white/20 dark:bg-gray-900/70 dark:text-gray-100 dark:border-gray-700/30',
      hover: 'hover:bg-white/80 dark:hover:bg-gray-900/80',
      active: 'bg-white/90 dark:bg-gray-900/90',
      shadow: 'shadow-lg shadow-black/5',
    },
  },
  secondary: {
    solid: {
      base: 'bg-gray-600 text-white dark:bg-gray-500',
      hover: 'hover:bg-gray-700 dark:hover:bg-gray-400',
      active: 'bg-gray-800 dark:bg-gray-300',
      shadow: 'shadow-sm hover:shadow-md',
    },
    subtle: {
      base: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
      hover: 'hover:bg-gray-200 dark:hover:bg-gray-700',
      active: 'bg-gray-300 dark:bg-gray-600',
      shadow: '',
    },
    outline: {
      base: 'border border-gray-400 text-gray-700 dark:border-gray-500 dark:text-gray-300 bg-transparent',
      hover: 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
      active: 'bg-gray-100 dark:bg-gray-800',
      shadow: '',
    },
    ghost: {
      base: 'bg-transparent text-gray-700 dark:text-gray-300',
      hover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
      active: 'bg-gray-200 dark:bg-gray-700',
      shadow: '',
    },
    glass: {
      base: 'bg-gray-500/20 text-gray-900 backdrop-blur-xl border border-gray-500/20 dark:text-gray-100',
      hover: 'hover:bg-gray-500/30',
      active: 'bg-gray-500/40',
      shadow: 'shadow-lg shadow-black/5',
    },
  },
  accent: {
    solid: {
      base: 'bg-blue-600 text-white',
      hover: 'hover:bg-blue-700',
      active: 'bg-blue-800',
      shadow:
        'shadow-sm shadow-blue-500/25 hover:shadow-md hover:shadow-blue-500/30',
    },
    subtle: {
      base: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300',
      hover: 'hover:bg-blue-100 dark:hover:bg-blue-950/70',
      active: 'bg-blue-200 dark:bg-blue-900/50',
      shadow: '',
    },
    outline: {
      base: 'border border-blue-500 text-blue-600 dark:text-blue-400 bg-transparent',
      hover: 'hover:bg-blue-50 dark:hover:bg-blue-950/30',
      active: 'bg-blue-100 dark:bg-blue-950/50',
      shadow: '',
    },
    ghost: {
      base: 'bg-transparent text-blue-600 dark:text-blue-400',
      hover: 'hover:bg-blue-50 dark:hover:bg-blue-950/30',
      active: 'bg-blue-100 dark:bg-blue-950/50',
      shadow: '',
    },
    glass: {
      base: 'bg-blue-500/20 text-blue-700 backdrop-blur-xl border border-blue-500/20 dark:text-blue-300',
      hover: 'hover:bg-blue-500/30',
      active: 'bg-blue-500/40',
      shadow: 'shadow-lg shadow-blue-500/10',
    },
  },
  neutral: {
    solid: {
      base: 'bg-gray-500 text-white',
      hover: 'hover:bg-gray-600',
      active: 'bg-gray-700',
      shadow: 'shadow-sm hover:shadow-md',
    },
    subtle: {
      base: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
      hover: 'hover:bg-gray-200 dark:hover:bg-gray-700',
      active: 'bg-gray-300 dark:bg-gray-600',
      shadow: '',
    },
    outline: {
      base: 'border border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 bg-transparent',
      hover: 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
      active: 'bg-gray-100 dark:bg-gray-800',
      shadow: '',
    },
    ghost: {
      base: 'bg-transparent text-gray-600 dark:text-gray-400',
      hover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
      active: 'bg-gray-200 dark:bg-gray-700',
      shadow: '',
    },
    glass: {
      base: 'bg-gray-500/20 text-gray-700 backdrop-blur-xl border border-gray-500/20 dark:text-gray-300',
      hover: 'hover:bg-gray-500/30',
      active: 'bg-gray-500/40',
      shadow: 'shadow-lg shadow-black/5',
    },
  },
  success: {
    solid: {
      base: 'bg-green-600 text-white',
      hover: 'hover:bg-green-700',
      active: 'bg-green-800',
      shadow:
        'shadow-sm shadow-green-500/25 hover:shadow-md hover:shadow-green-500/30',
    },
    subtle: {
      base: 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300',
      hover: 'hover:bg-green-100 dark:hover:bg-green-950/70',
      active: 'bg-green-200 dark:bg-green-900/50',
      shadow: '',
    },
    outline: {
      base: 'border border-green-500 text-green-600 dark:text-green-400 bg-transparent',
      hover: 'hover:bg-green-50 dark:hover:bg-green-950/30',
      active: 'bg-green-100 dark:bg-green-950/50',
      shadow: '',
    },
    ghost: {
      base: 'bg-transparent text-green-600 dark:text-green-400',
      hover: 'hover:bg-green-50 dark:hover:bg-green-950/30',
      active: 'bg-green-100 dark:bg-green-950/50',
      shadow: '',
    },
    glass: {
      base: 'bg-green-500/20 text-green-700 backdrop-blur-xl border border-green-500/20 dark:text-green-300',
      hover: 'hover:bg-green-500/30',
      active: 'bg-green-500/40',
      shadow: 'shadow-lg shadow-green-500/10',
    },
  },
  warning: {
    solid: {
      base: 'bg-amber-500 text-white',
      hover: 'hover:bg-amber-600',
      active: 'bg-amber-700',
      shadow:
        'shadow-sm shadow-amber-500/25 hover:shadow-md hover:shadow-amber-500/30',
    },
    subtle: {
      base: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
      hover: 'hover:bg-amber-100 dark:hover:bg-amber-950/70',
      active: 'bg-amber-200 dark:bg-amber-900/50',
      shadow: '',
    },
    outline: {
      base: 'border border-amber-500 text-amber-600 dark:text-amber-400 bg-transparent',
      hover: 'hover:bg-amber-50 dark:hover:bg-amber-950/30',
      active: 'bg-amber-100 dark:bg-amber-950/50',
      shadow: '',
    },
    ghost: {
      base: 'bg-transparent text-amber-600 dark:text-amber-400',
      hover: 'hover:bg-amber-50 dark:hover:bg-amber-950/30',
      active: 'bg-amber-100 dark:bg-amber-950/50',
      shadow: '',
    },
    glass: {
      base: 'bg-amber-500/20 text-amber-700 backdrop-blur-xl border border-amber-500/20 dark:text-amber-300',
      hover: 'hover:bg-amber-500/30',
      active: 'bg-amber-500/40',
      shadow: 'shadow-lg shadow-amber-500/10',
    },
  },
  error: {
    solid: {
      base: 'bg-red-600 text-white',
      hover: 'hover:bg-red-700',
      active: 'bg-red-800',
      shadow:
        'shadow-sm shadow-red-500/25 hover:shadow-md hover:shadow-red-500/30',
    },
    subtle: {
      base: 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300',
      hover: 'hover:bg-red-100 dark:hover:bg-red-950/70',
      active: 'bg-red-200 dark:bg-red-900/50',
      shadow: '',
    },
    outline: {
      base: 'border border-red-500 text-red-600 dark:text-red-400 bg-transparent',
      hover: 'hover:bg-red-50 dark:hover:bg-red-950/30',
      active: 'bg-red-100 dark:bg-red-950/50',
      shadow: '',
    },
    ghost: {
      base: 'bg-transparent text-red-600 dark:text-red-400',
      hover: 'hover:bg-red-50 dark:hover:bg-red-950/30',
      active: 'bg-red-100 dark:bg-red-950/50',
      shadow: '',
    },
    glass: {
      base: 'bg-red-500/20 text-red-700 backdrop-blur-xl border border-red-500/20 dark:text-red-300',
      hover: 'hover:bg-red-500/30',
      active: 'bg-red-500/40',
      shadow: 'shadow-lg shadow-red-500/10',
    },
  },
} as const;

/**
 * Spring physics presets for button animations
 * Matches the sophistication of the modal system
 */
export const BUTTON_SPRING_CONFIG = {
  /** Quick, snappy response for press */
  press: { stiffness: 400, damping: 30 },
  /** Gentle return to rest */
  release: { stiffness: 300, damping: 25 },
  /** Hover lift animation */
  hover: { stiffness: 350, damping: 28 },
  /** Loading spinner rotation */
  spin: { stiffness: 100, damping: 10 },
} as const;

/**
 * Animation variants for Framer Motion
 */
export const BUTTON_ANIMATION_VARIANTS = {
  idle: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -1,
  },
  pressed: {
    scale: 0.98,
    y: 0,
  },
  disabled: {
    scale: 1,
    opacity: 0.5,
  },
} as const;
