// src/app/playground/alert/components/types.ts

import { ReactNode } from 'react';

/**
 * Alert semantic variants
 */
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Alert visual styles
 */
export type AlertStyle = 'filled' | 'soft' | 'outline';

/**
 * Alert sizes
 */
export type AlertSize = 'sm' | 'md' | 'lg';

/**
 * Props for Alert component
 */
export interface AlertProps {
  /** Semantic variant */
  variant?: AlertVariant;
  /** Visual style */
  style?: AlertStyle;
  /** Size */
  size?: AlertSize;
  /** Alert title */
  title?: ReactNode;
  /** Alert content/description */
  children?: ReactNode;
  /** Custom icon (uses default icon per variant if not provided) */
  icon?: ReactNode;
  /** Hide the icon */
  hideIcon?: boolean;
  /** Show dismiss button */
  dismissible?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Action button(s) */
  action?: ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Color configuration per variant and style
 */
export const ALERT_VARIANT_CONFIG: Record<
  AlertVariant,
  {
    filled: {
      bg: string;
      text: string;
      icon: string;
      border: string;
    };
    soft: {
      bg: string;
      text: string;
      icon: string;
      border: string;
    };
    outline: {
      bg: string;
      text: string;
      icon: string;
      border: string;
    };
  }
> = {
  info: {
    filled: {
      bg: 'bg-blue-500 dark:bg-blue-600',
      text: 'text-white',
      icon: 'text-white',
      border: 'border-transparent',
    },
    soft: {
      bg: 'bg-blue-50 dark:bg-blue-950/50',
      text: 'text-blue-800 dark:text-blue-200',
      icon: 'text-blue-500 dark:text-blue-400',
      border: 'border-blue-100 dark:border-blue-900',
    },
    outline: {
      bg: 'bg-transparent',
      text: 'text-blue-700 dark:text-blue-300',
      icon: 'text-blue-500 dark:text-blue-400',
      border: 'border-blue-300 dark:border-blue-700',
    },
  },
  success: {
    filled: {
      bg: 'bg-emerald-500 dark:bg-emerald-600',
      text: 'text-white',
      icon: 'text-white',
      border: 'border-transparent',
    },
    soft: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/50',
      text: 'text-emerald-800 dark:text-emerald-200',
      icon: 'text-emerald-500 dark:text-emerald-400',
      border: 'border-emerald-100 dark:border-emerald-900',
    },
    outline: {
      bg: 'bg-transparent',
      text: 'text-emerald-700 dark:text-emerald-300',
      icon: 'text-emerald-500 dark:text-emerald-400',
      border: 'border-emerald-300 dark:border-emerald-700',
    },
  },
  warning: {
    filled: {
      bg: 'bg-amber-500 dark:bg-amber-600',
      text: 'text-white',
      icon: 'text-white',
      border: 'border-transparent',
    },
    soft: {
      bg: 'bg-amber-50 dark:bg-amber-950/50',
      text: 'text-amber-800 dark:text-amber-200',
      icon: 'text-amber-500 dark:text-amber-400',
      border: 'border-amber-100 dark:border-amber-900',
    },
    outline: {
      bg: 'bg-transparent',
      text: 'text-amber-700 dark:text-amber-300',
      icon: 'text-amber-500 dark:text-amber-400',
      border: 'border-amber-300 dark:border-amber-700',
    },
  },
  error: {
    filled: {
      bg: 'bg-red-500 dark:bg-red-600',
      text: 'text-white',
      icon: 'text-white',
      border: 'border-transparent',
    },
    soft: {
      bg: 'bg-red-50 dark:bg-red-950/50',
      text: 'text-red-800 dark:text-red-200',
      icon: 'text-red-500 dark:text-red-400',
      border: 'border-red-100 dark:border-red-900',
    },
    outline: {
      bg: 'bg-transparent',
      text: 'text-red-700 dark:text-red-300',
      icon: 'text-red-500 dark:text-red-400',
      border: 'border-red-300 dark:border-red-700',
    },
  },
};

/**
 * Size configuration
 */
export const ALERT_SIZE_CONFIG: Record<
  AlertSize,
  {
    padding: string;
    iconSize: string;
    titleSize: string;
    textSize: string;
    gap: string;
  }
> = {
  sm: {
    padding: 'px-3 py-2',
    iconSize: 'w-4 h-4',
    titleSize: 'text-sm font-medium',
    textSize: 'text-xs',
    gap: 'gap-2',
  },
  md: {
    padding: 'px-4 py-3',
    iconSize: 'w-5 h-5',
    titleSize: 'text-sm font-semibold',
    textSize: 'text-sm',
    gap: 'gap-3',
  },
  lg: {
    padding: 'px-5 py-4',
    iconSize: 'w-6 h-6',
    titleSize: 'text-base font-semibold',
    textSize: 'text-sm',
    gap: 'gap-4',
  },
};
