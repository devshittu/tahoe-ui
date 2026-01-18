// src/app/playground/progress-bar/components/types.ts

import { HTMLAttributes } from 'react';

/**
 * ProgressBar size variants
 */
export type ProgressBarSize = 'sm' | 'md' | 'lg';

/**
 * ProgressBar color options
 */
export type ProgressBarColor =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error';

/**
 * Props for ProgressBar component
 */
export interface ProgressBarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> {
  /** Progress value (0-100) */
  value?: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Indeterminate loading state */
  indeterminate?: boolean;
  /** Color theme */
  color?: ProgressBarColor;
  /** Size variant */
  size?: ProgressBarSize;
  /** Show percentage label */
  showLabel?: boolean;
  /** Custom label format */
  labelFormat?: (value: number, max: number) => string;
  /** Striped pattern */
  striped?: boolean;
  /** Animate stripes */
  animated?: boolean;
  /** Additional className */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

/**
 * Size configuration following 8pt grid
 *
 * Per design-principles.md #3 (Intentional White Space)
 */
export const PROGRESS_SIZE_CONFIG: Record<
  ProgressBarSize,
  {
    /** Track height */
    height: string;
    /** Border radius */
    radius: string;
    /** Label font size */
    labelSize: string;
    /** Height in pixels for reference */
    heightPx: number;
  }
> = {
  sm: {
    height: 'h-1',
    radius: 'rounded-full',
    labelSize: 'text-xs',
    heightPx: 4,
  },
  md: {
    height: 'h-2',
    radius: 'rounded-full',
    labelSize: 'text-sm',
    heightPx: 8,
  },
  lg: {
    height: 'h-3',
    radius: 'rounded-full',
    labelSize: 'text-base',
    heightPx: 12,
  },
};

/**
 * Color configuration for progress bar
 *
 * Per design-principles.md #2 (Visual Hierarchy Through Restraint)
 */
export const PROGRESS_COLOR_CONFIG: Record<
  ProgressBarColor,
  {
    /** Track background */
    track: string;
    /** Progress fill */
    fill: string;
    /** Label text color */
    label: string;
  }
> = {
  default: {
    track: 'bg-gray-200 dark:bg-gray-700',
    fill: 'bg-gray-600 dark:bg-gray-400',
    label: 'text-gray-600 dark:text-gray-400',
  },
  primary: {
    track: 'bg-blue-100 dark:bg-blue-900/30',
    fill: 'bg-blue-500 dark:bg-blue-400',
    label: 'text-blue-600 dark:text-blue-400',
  },
  success: {
    track: 'bg-emerald-100 dark:bg-emerald-900/30',
    fill: 'bg-emerald-500 dark:bg-emerald-400',
    label: 'text-emerald-600 dark:text-emerald-400',
  },
  warning: {
    track: 'bg-amber-100 dark:bg-amber-900/30',
    fill: 'bg-amber-500 dark:bg-amber-400',
    label: 'text-amber-600 dark:text-amber-400',
  },
  error: {
    track: 'bg-red-100 dark:bg-red-900/30',
    fill: 'bg-red-500 dark:bg-red-400',
    label: 'text-red-600 dark:text-red-400',
  },
};

/**
 * Animation configuration
 *
 * Per design-principles.md #6 (Purposeful Motion)
 */
export const PROGRESS_ANIMATION_CONFIG = {
  /** Spring for value changes */
  spring: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 25,
  },
  /** Duration for indeterminate animation */
  indeterminateDuration: 1.5,
  /** Stripe animation duration */
  stripeDuration: 1,
};

/**
 * Default label formatter
 */
export const defaultLabelFormat = (value: number, max: number): string => {
  const percentage = Math.round((value / max) * 100);
  return `${percentage}%`;
};
