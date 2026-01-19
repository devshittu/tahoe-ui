// packages/overlay/src/tooltip/types.ts

import { ReactNode } from 'react';

/**
 * Tooltip placement options
 */
export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

/**
 * Tooltip trigger mode
 */
export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'manual';

/**
 * Tooltip variant for styling
 */
export type TooltipVariant =
  | 'default'
  | 'dark'
  | 'light'
  | 'info'
  | 'warning'
  | 'error';

/**
 * Tooltip size
 */
export type TooltipSize = 'sm' | 'md' | 'lg';

/**
 * Configuration for Tooltip
 */
export interface TooltipConfig {
  /** Content to display in tooltip */
  content: ReactNode;
  /** Placement relative to trigger */
  placement?: TooltipPlacement;
  /** Trigger mode(s) - can combine multiple */
  trigger?: TooltipTrigger | TooltipTrigger[];
  /** Open delay in ms (for hover/focus) */
  openDelay?: number;
  /** Close delay in ms (for hover/focus) */
  closeDelay?: number;
  /** Visual variant */
  variant?: TooltipVariant;
  /** Size variant */
  size?: TooltipSize;
  /** Show arrow pointer */
  showArrow?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Max width of tooltip */
  maxWidth?: number;
  /** Disable tooltip */
  disabled?: boolean;
}

/**
 * Props for Tooltip component
 */
export interface TooltipProps extends TooltipConfig {
  /** Trigger element */
  children: ReactNode;
  /** Additional class for tooltip content */
  className?: string;
}

/**
 * Default tooltip configuration
 */
export const DEFAULT_TOOLTIP_CONFIG = {
  placement: 'top' as TooltipPlacement,
  trigger: 'hover' as TooltipTrigger,
  openDelay: 300,
  closeDelay: 150,
  variant: 'default' as TooltipVariant,
  size: 'md' as TooltipSize,
  showArrow: true,
  maxWidth: 320,
  disabled: false,
} as const;

/**
 * Variant-specific styles
 */
export const TOOLTIP_VARIANT_STYLES: Record<
  TooltipVariant,
  { bg: string; text: string; border: string }
> = {
  default: {
    bg: 'bg-gray-900 dark:bg-gray-100',
    text: 'text-white dark:text-gray-900',
    border: 'border-gray-900 dark:border-gray-100',
  },
  dark: {
    bg: 'bg-gray-900',
    text: 'text-white',
    border: 'border-gray-900',
  },
  light: {
    bg: 'bg-white dark:bg-gray-800',
    text: 'text-gray-900 dark:text-gray-100',
    border: 'border-gray-200 dark:border-gray-700',
  },
  info: {
    bg: 'bg-blue-600',
    text: 'text-white',
    border: 'border-blue-600',
  },
  warning: {
    bg: 'bg-amber-500',
    text: 'text-white',
    border: 'border-amber-500',
  },
  error: {
    bg: 'bg-red-600',
    text: 'text-white',
    border: 'border-red-600',
  },
} as const;

/**
 * Size-specific styles
 */
export const TOOLTIP_SIZE_STYLES: Record<
  TooltipSize,
  { padding: string; text: string }
> = {
  sm: {
    padding: 'px-2 py-1',
    text: 'text-xs',
  },
  md: {
    padding: 'px-3 py-1.5',
    text: 'text-sm',
  },
  lg: {
    padding: 'px-4 py-2',
    text: 'text-base',
  },
} as const;

/**
 * Position classes for tooltip placement
 */
export const PLACEMENT_CLASSES: Record<TooltipPlacement, string> = {
  // Top placements
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  'top-start': 'bottom-full left-0 mb-2',
  'top-end': 'bottom-full right-0 mb-2',
  // Bottom placements
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  'bottom-start': 'top-full left-0 mt-2',
  'bottom-end': 'top-full right-0 mt-2',
  // Left placements
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  'left-start': 'right-full top-0 mr-2',
  'left-end': 'right-full bottom-0 mr-2',
  // Right placements
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  'right-start': 'left-full top-0 ml-2',
  'right-end': 'left-full bottom-0 ml-2',
};

/**
 * Arrow classes for each placement
 */
export const ARROW_CLASSES: Record<TooltipPlacement, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 -mt-px border-t-current border-x-transparent border-b-transparent',
  'top-start':
    'top-full left-3 -mt-px border-t-current border-x-transparent border-b-transparent',
  'top-end':
    'top-full right-3 -mt-px border-t-current border-x-transparent border-b-transparent',
  bottom:
    'bottom-full left-1/2 -translate-x-1/2 -mb-px border-b-current border-x-transparent border-t-transparent',
  'bottom-start':
    'bottom-full left-3 -mb-px border-b-current border-x-transparent border-t-transparent',
  'bottom-end':
    'bottom-full right-3 -mb-px border-b-current border-x-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 -ml-px border-l-current border-y-transparent border-r-transparent',
  'left-start':
    'left-full top-3 -ml-px border-l-current border-y-transparent border-r-transparent',
  'left-end':
    'left-full bottom-3 -ml-px border-l-current border-y-transparent border-r-transparent',
  right:
    'right-full top-1/2 -translate-y-1/2 -mr-px border-r-current border-y-transparent border-l-transparent',
  'right-start':
    'right-full top-3 -mr-px border-r-current border-y-transparent border-l-transparent',
  'right-end':
    'right-full bottom-3 -mr-px border-r-current border-y-transparent border-l-transparent',
};

/**
 * Arrow fill colors for each variant
 */
export const ARROW_COLORS: Record<TooltipVariant, string> = {
  default: 'text-gray-900 dark:text-gray-100',
  dark: 'text-gray-900',
  light: 'text-white dark:text-gray-800',
  info: 'text-blue-600',
  warning: 'text-amber-500',
  error: 'text-red-600',
};
