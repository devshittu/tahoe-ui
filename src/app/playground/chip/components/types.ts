// src/app/playground/chip/components/types.ts

import { ReactNode, MouseEvent } from 'react';

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
 *
 * Per design-principles.md #3 (Intentional White Space)
 */
export const CHIP_SIZE_CONFIG: Record<
  ChipSize,
  {
    /** Padding classes */
    padding: string;
    /** Text size */
    fontSize: string;
    /** Icon size */
    iconSize: string;
    /** Dismiss button size */
    dismissSize: string;
    /** Gap between elements */
    gap: string;
    /** Border radius */
    radius: string;
    /** Minimum height for touch target reference */
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
 * Color configuration for each variant
 *
 * Per design-principles.md #2 (Visual Hierarchy Through Restraint)
 * Colors indicate meaning, not decoration
 */
export const CHIP_COLOR_CONFIG: Record<
  ChipVariant,
  Record<
    ChipColor,
    {
      /** Base container styles */
      base: string;
      /** Text/icon color */
      text: string;
      /** Hover state */
      hover: string;
      /** Selected state */
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
      base: 'bg-blue-100 dark:bg-blue-900/50',
      text: 'text-blue-800 dark:text-blue-200',
      hover: 'hover:bg-blue-200 dark:hover:bg-blue-800/60',
      selected: 'bg-blue-200 dark:bg-blue-800 ring-2 ring-blue-400',
    },
    success: {
      base: 'bg-emerald-100 dark:bg-emerald-900/50',
      text: 'text-emerald-800 dark:text-emerald-200',
      hover: 'hover:bg-emerald-200 dark:hover:bg-emerald-800/60',
      selected: 'bg-emerald-200 dark:bg-emerald-800 ring-2 ring-emerald-400',
    },
    warning: {
      base: 'bg-amber-100 dark:bg-amber-900/50',
      text: 'text-amber-800 dark:text-amber-200',
      hover: 'hover:bg-amber-200 dark:hover:bg-amber-800/60',
      selected: 'bg-amber-200 dark:bg-amber-800 ring-2 ring-amber-400',
    },
    error: {
      base: 'bg-red-100 dark:bg-red-900/50',
      text: 'text-red-800 dark:text-red-200',
      hover: 'hover:bg-red-200 dark:hover:bg-red-800/60',
      selected: 'bg-red-200 dark:bg-red-800 ring-2 ring-red-400',
    },
  },
  outlined: {
    default: {
      base: 'bg-transparent border border-gray-300 dark:border-gray-600',
      text: 'text-gray-700 dark:text-gray-300',
      hover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
      selected: 'bg-gray-100 dark:bg-gray-800 ring-2 ring-gray-400',
    },
    primary: {
      base: 'bg-transparent border border-blue-300 dark:border-blue-700',
      text: 'text-blue-700 dark:text-blue-300',
      hover: 'hover:bg-blue-50 dark:hover:bg-blue-900/30',
      selected: 'bg-blue-50 dark:bg-blue-900/50 ring-2 ring-blue-400',
    },
    success: {
      base: 'bg-transparent border border-emerald-300 dark:border-emerald-700',
      text: 'text-emerald-700 dark:text-emerald-300',
      hover: 'hover:bg-emerald-50 dark:hover:bg-emerald-900/30',
      selected: 'bg-emerald-50 dark:bg-emerald-900/50 ring-2 ring-emerald-400',
    },
    warning: {
      base: 'bg-transparent border border-amber-300 dark:border-amber-700',
      text: 'text-amber-700 dark:text-amber-300',
      hover: 'hover:bg-amber-50 dark:hover:bg-amber-900/30',
      selected: 'bg-amber-50 dark:bg-amber-900/50 ring-2 ring-amber-400',
    },
    error: {
      base: 'bg-transparent border border-red-300 dark:border-red-700',
      text: 'text-red-700 dark:text-red-300',
      hover: 'hover:bg-red-50 dark:hover:bg-red-900/30',
      selected: 'bg-red-50 dark:bg-red-900/50 ring-2 ring-red-400',
    },
  },
  subtle: {
    default: {
      base: 'bg-gray-100/50 dark:bg-gray-800/50',
      text: 'text-gray-600 dark:text-gray-400',
      hover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
      selected: 'bg-gray-200 dark:bg-gray-700 ring-2 ring-gray-400',
    },
    primary: {
      base: 'bg-blue-50/50 dark:bg-blue-900/20',
      text: 'text-blue-600 dark:text-blue-400',
      hover: 'hover:bg-blue-100 dark:hover:bg-blue-900/40',
      selected: 'bg-blue-100 dark:bg-blue-900/60 ring-2 ring-blue-400',
    },
    success: {
      base: 'bg-emerald-50/50 dark:bg-emerald-900/20',
      text: 'text-emerald-600 dark:text-emerald-400',
      hover: 'hover:bg-emerald-100 dark:hover:bg-emerald-900/40',
      selected: 'bg-emerald-100 dark:bg-emerald-900/60 ring-2 ring-emerald-400',
    },
    warning: {
      base: 'bg-amber-50/50 dark:bg-amber-900/20',
      text: 'text-amber-600 dark:text-amber-400',
      hover: 'hover:bg-amber-100 dark:hover:bg-amber-900/40',
      selected: 'bg-amber-100 dark:bg-amber-900/60 ring-2 ring-amber-400',
    },
    error: {
      base: 'bg-red-50/50 dark:bg-red-900/20',
      text: 'text-red-600 dark:text-red-400',
      hover: 'hover:bg-red-100 dark:hover:bg-red-900/40',
      selected: 'bg-red-100 dark:bg-red-900/60 ring-2 ring-red-400',
    },
  },
};

/**
 * Animation configuration for chip interactions
 *
 * Per design-principles.md #6 (Purposeful Motion)
 */
export const CHIP_ANIMATION_CONFIG = {
  /** Tap/press scale for clickable chips */
  tapScale: 0.97,
  /** Spring configuration for animations */
  spring: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 25,
  },
  /** Transition for color/state changes */
  transition: {
    duration: 0.15,
  },
};
