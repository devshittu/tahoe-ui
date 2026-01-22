/**
 * @tahoe-ui/button - Type Definitions
 *
 * Comprehensive type system for physics-based button components.
 * Follows Apple HIG principles with design tokens and spring physics.
 *
 * @packageDocumentation
 */

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
  | 'formAction' // Excluded for Framer Motion compatibility with React 19
  | 'onToggle' // Reserved for ToggleButton component
> {
  /** Form action URL (string only for Framer Motion compatibility) */
  formAction?: string;
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
 * IconButton props - icon-only button variant
 */
export interface IconButtonProps extends Omit<
  ButtonProps,
  'children' | 'leftIcon' | 'rightIcon'
> {
  /** Accessible label for the button. Essential for screen readers. */
  ariaLabel: string;
  /** The icon to display within the button. */
  icon: ReactNode;
  /** Position of the icon relative to the button's content. */
  iconPosition?: 'left' | 'right';
}

/**
 * AnimatedButton props - adds animation type
 */
export interface AnimatedButtonProps extends ButtonProps {
  /** Type of animation */
  animationType?: 'pulse' | 'shake' | 'bounce';
}

/**
 * ToggleButton props - stateful toggle
 */
export interface ToggleButtonProps extends ButtonProps {
  /** Initial toggle state */
  initialToggled?: boolean;
  /** Callback when toggle state changes */
  onToggle?: (toggled: boolean) => void;
}

/**
 * DropdownButton props - button with dropdown menu
 */
export interface DropdownButtonProps extends ButtonProps {
  /** The dropdown menu items */
  menuItems: { label: string; onClick: () => void }[];
}

/**
 * ExpandableButton props - button with expandable content
 */
export interface ExpandableButtonProps extends ButtonProps {
  /** Content to display when expanded */
  expandedContent: ReactNode;
}

/**
 * SkeletonButton props - loading placeholder
 */
export interface SkeletonButtonProps {
  /** Width of the skeleton button */
  width?: string;
  /** Height of the skeleton button */
  height?: string;
  /** Corner rounding */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  /** Additional classes */
  className?: string;
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
 *
 * Uses CSS variable-backed Tailwind classes from @tahoe-ui/tailwind-preset.
 * Primary/Secondary/Accent use brand color scales, while feedback colors
 * (success, warning, error) use semantic feedback tokens.
 *
 * The brand-primary, brand-secondary, brand-accent, and gray classes
 * are mapped to CSS variables (e.g., bg-brand-primary-600 uses
 * var(--tahoe-color-brand-primary-600)) allowing runtime theme customization.
 */
export const BUTTON_COLOR_CONFIG = {
  primary: {
    solid: {
      base: 'bg-brand-primary-600 text-white dark:bg-brand-primary-500',
      hover: 'hover:bg-brand-primary-700 dark:hover:bg-brand-primary-400',
      active: 'bg-brand-primary-800 dark:bg-brand-primary-300',
      shadow: 'shadow-sm hover:shadow-md',
    },
    subtle: {
      base: 'bg-brand-primary-50 text-brand-primary-700 dark:bg-brand-primary-950 dark:text-brand-primary-300',
      hover: 'hover:bg-brand-primary-100 dark:hover:bg-brand-primary-900',
      active: 'bg-brand-primary-200 dark:bg-brand-primary-800',
      shadow: '',
    },
    outline: {
      base: 'border border-brand-primary-500 text-brand-primary-600 dark:text-brand-primary-400 bg-transparent',
      hover: 'hover:bg-brand-primary-50 dark:hover:bg-brand-primary-950',
      active: 'bg-brand-primary-100 dark:bg-brand-primary-900',
      shadow: '',
    },
    ghost: {
      base: 'bg-transparent text-brand-primary-600 dark:text-brand-primary-400',
      hover: 'hover:bg-brand-primary-50 dark:hover:bg-brand-primary-950',
      active: 'bg-brand-primary-100 dark:bg-brand-primary-900',
      shadow: '',
    },
    glass: {
      base: 'bg-brand-primary-500/20 text-brand-primary-700 backdrop-blur-xl border border-brand-primary-500/20 dark:text-brand-primary-300',
      hover: 'hover:bg-brand-primary-500/30',
      active: 'bg-brand-primary-500/40',
      shadow: 'shadow-lg shadow-brand-primary-500/10',
    },
  },
  secondary: {
    solid: {
      base: 'bg-brand-secondary-600 text-white dark:bg-brand-secondary-500',
      hover: 'hover:bg-brand-secondary-700 dark:hover:bg-brand-secondary-400',
      active: 'bg-brand-secondary-800 dark:bg-brand-secondary-300',
      shadow: 'shadow-sm hover:shadow-md',
    },
    subtle: {
      base: 'bg-brand-secondary-50 text-brand-secondary-700 dark:bg-brand-secondary-950 dark:text-brand-secondary-300',
      hover: 'hover:bg-brand-secondary-100 dark:hover:bg-brand-secondary-900',
      active: 'bg-brand-secondary-200 dark:bg-brand-secondary-800',
      shadow: '',
    },
    outline: {
      base: 'border border-brand-secondary-400 text-brand-secondary-700 dark:border-brand-secondary-500 dark:text-brand-secondary-300 bg-transparent',
      hover: 'hover:bg-brand-secondary-50 dark:hover:bg-brand-secondary-950',
      active: 'bg-brand-secondary-100 dark:bg-brand-secondary-900',
      shadow: '',
    },
    ghost: {
      base: 'bg-transparent text-brand-secondary-700 dark:text-brand-secondary-300',
      hover: 'hover:bg-brand-secondary-50 dark:hover:bg-brand-secondary-950',
      active: 'bg-brand-secondary-100 dark:bg-brand-secondary-900',
      shadow: '',
    },
    glass: {
      base: 'bg-brand-secondary-500/20 text-brand-secondary-700 backdrop-blur-xl border border-brand-secondary-500/20 dark:text-brand-secondary-300',
      hover: 'hover:bg-brand-secondary-500/30',
      active: 'bg-brand-secondary-500/40',
      shadow: 'shadow-lg shadow-black/5',
    },
  },
  accent: {
    solid: {
      base: 'bg-brand-accent-600 text-white dark:bg-brand-accent-500',
      hover: 'hover:bg-brand-accent-700 dark:hover:bg-brand-accent-400',
      active: 'bg-brand-accent-800 dark:bg-brand-accent-300',
      shadow:
        'shadow-sm shadow-brand-accent-500/25 hover:shadow-md hover:shadow-brand-accent-500/30',
    },
    subtle: {
      base: 'bg-brand-accent-50 text-brand-accent-700 dark:bg-brand-accent-950 dark:text-brand-accent-300',
      hover: 'hover:bg-brand-accent-100 dark:hover:bg-brand-accent-900',
      active: 'bg-brand-accent-200 dark:bg-brand-accent-800',
      shadow: '',
    },
    outline: {
      base: 'border border-brand-accent-500 text-brand-accent-600 dark:text-brand-accent-400 bg-transparent',
      hover: 'hover:bg-brand-accent-50 dark:hover:bg-brand-accent-950',
      active: 'bg-brand-accent-100 dark:bg-brand-accent-900',
      shadow: '',
    },
    ghost: {
      base: 'bg-transparent text-brand-accent-600 dark:text-brand-accent-400',
      hover: 'hover:bg-brand-accent-50 dark:hover:bg-brand-accent-950',
      active: 'bg-brand-accent-100 dark:bg-brand-accent-900',
      shadow: '',
    },
    glass: {
      base: 'bg-brand-accent-500/20 text-brand-accent-700 backdrop-blur-xl border border-brand-accent-500/20 dark:text-brand-accent-300',
      hover: 'hover:bg-brand-accent-500/30',
      active: 'bg-brand-accent-500/40',
      shadow: 'shadow-lg shadow-brand-accent-500/10',
    },
  },
  neutral: {
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
      base: 'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 bg-transparent',
      hover: 'hover:bg-gray-50 dark:hover:bg-gray-800',
      active: 'bg-gray-100 dark:bg-gray-700',
      shadow: '',
    },
    ghost: {
      base: 'bg-transparent text-gray-700 dark:text-gray-300',
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
      base: 'bg-success text-white',
      hover: 'hover:bg-success-dark',
      active: 'bg-success-dark',
      shadow: 'shadow-sm hover:shadow-md',
    },
    subtle: {
      base: 'bg-success-light text-success-dark',
      hover: 'hover:bg-success-light/80',
      active: 'bg-success-light/60',
      shadow: '',
    },
    outline: {
      base: 'border border-success text-success dark:text-success bg-transparent',
      hover: 'hover:bg-success-light/30',
      active: 'bg-success-light/50',
      shadow: '',
    },
    ghost: {
      base: 'bg-transparent text-success',
      hover: 'hover:bg-success-light/30',
      active: 'bg-success-light/50',
      shadow: '',
    },
    glass: {
      base: 'bg-success/20 text-success-dark backdrop-blur-xl border border-success/20',
      hover: 'hover:bg-success/30',
      active: 'bg-success/40',
      shadow: 'shadow-lg shadow-success/10',
    },
  },
  warning: {
    solid: {
      base: 'bg-warning text-white',
      hover: 'hover:bg-warning-dark',
      active: 'bg-warning-dark',
      shadow: 'shadow-sm hover:shadow-md',
    },
    subtle: {
      base: 'bg-warning-light text-warning-dark',
      hover: 'hover:bg-warning-light/80',
      active: 'bg-warning-light/60',
      shadow: '',
    },
    outline: {
      base: 'border border-warning text-warning dark:text-warning bg-transparent',
      hover: 'hover:bg-warning-light/30',
      active: 'bg-warning-light/50',
      shadow: '',
    },
    ghost: {
      base: 'bg-transparent text-warning',
      hover: 'hover:bg-warning-light/30',
      active: 'bg-warning-light/50',
      shadow: '',
    },
    glass: {
      base: 'bg-warning/20 text-warning-dark backdrop-blur-xl border border-warning/20',
      hover: 'hover:bg-warning/30',
      active: 'bg-warning/40',
      shadow: 'shadow-lg shadow-warning/10',
    },
  },
  error: {
    solid: {
      base: 'bg-error text-white',
      hover: 'hover:bg-error-dark',
      active: 'bg-error-dark',
      shadow: 'shadow-sm hover:shadow-md',
    },
    subtle: {
      base: 'bg-error-light text-error-dark',
      hover: 'hover:bg-error-light/80',
      active: 'bg-error-light/60',
      shadow: '',
    },
    outline: {
      base: 'border border-error text-error dark:text-error bg-transparent',
      hover: 'hover:bg-error-light/30',
      active: 'bg-error-light/50',
      shadow: '',
    },
    ghost: {
      base: 'bg-transparent text-error',
      hover: 'hover:bg-error-light/30',
      active: 'bg-error-light/50',
      shadow: '',
    },
    glass: {
      base: 'bg-error/20 text-error-dark backdrop-blur-xl border border-error/20',
      hover: 'hover:bg-error/30',
      active: 'bg-error/40',
      shadow: 'shadow-lg shadow-error/10',
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

/**
 * Animation class mappings for AnimatedButton
 */
export const ANIMATED_BUTTON_CLASSES = {
  pulse: 'animate-pulse',
  shake: 'animate-shake',
  bounce: 'animate-bounce',
} as const;

/**
 * Rounded class mappings for SkeletonButton
 */
export const SKELETON_ROUNDED_CLASSES = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
} as const;
