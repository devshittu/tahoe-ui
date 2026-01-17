// src/app/playground/tooltip/components/types.ts

import { ReactNode } from 'react';
import type { Placement } from '@floating-ui/react';

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
  placement?: Placement;
  /** Trigger mode(s) - can combine multiple */
  trigger?: TooltipTrigger | TooltipTrigger[];
  /** Open delay in ms (for hover/focus) */
  openDelay?: number;
  /** Close delay in ms (for hover/focus) */
  closeDelay?: number;
  /** Offset from trigger element in px */
  offset?: number;
  /** Visual variant */
  variant?: TooltipVariant;
  /** Size variant */
  size?: TooltipSize;
  /** Show arrow pointer */
  showArrow?: boolean;
  /** Allow hovering over tooltip content (keeps it open) */
  interactive?: boolean;
  /** Close on escape key */
  closeOnEscape?: boolean;
  /** Close on click outside */
  closeOnClickOutside?: boolean;
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
  /** Additional class for trigger wrapper */
  triggerClassName?: string;
}

/**
 * Default tooltip configuration
 */
export const DEFAULT_TOOLTIP_CONFIG = {
  placement: 'top' as Placement,
  trigger: 'hover' as TooltipTrigger,
  openDelay: 300,
  closeDelay: 150,
  offset: 8,
  variant: 'default' as TooltipVariant,
  size: 'md' as TooltipSize,
  showArrow: true,
  interactive: false,
  closeOnEscape: true,
  closeOnClickOutside: true,
  maxWidth: 320,
  disabled: false,
} as const;

/**
 * Variant-specific styles
 */
export const TOOLTIP_VARIANT_STYLES: Record<
  TooltipVariant,
  { bg: string; text: string; border: string; arrow: string }
> = {
  default: {
    bg: 'bg-gray-900 dark:bg-gray-100',
    text: 'text-white dark:text-gray-900',
    border: 'border-gray-900 dark:border-gray-100',
    arrow: 'bg-gray-900 dark:bg-gray-100',
  },
  dark: {
    bg: 'bg-gray-900',
    text: 'text-white',
    border: 'border-gray-900',
    arrow: 'bg-gray-900',
  },
  light: {
    bg: 'bg-white dark:bg-gray-800',
    text: 'text-gray-900 dark:text-gray-100',
    border: 'border-gray-200 dark:border-gray-700',
    arrow: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
  },
  info: {
    bg: 'bg-blue-600',
    text: 'text-white',
    border: 'border-blue-600',
    arrow: 'bg-blue-600',
  },
  warning: {
    bg: 'bg-amber-500',
    text: 'text-white',
    border: 'border-amber-500',
    arrow: 'bg-amber-500',
  },
  error: {
    bg: 'bg-red-600',
    text: 'text-white',
    border: 'border-red-600',
    arrow: 'bg-red-600',
  },
} as const;

/**
 * Size-specific styles
 */
export const TOOLTIP_SIZE_STYLES: Record<
  TooltipSize,
  { padding: string; text: string; arrow: string }
> = {
  sm: {
    padding: 'px-2 py-1',
    text: 'text-xs',
    arrow: 'w-2 h-2',
  },
  md: {
    padding: 'px-3 py-1.5',
    text: 'text-sm',
    arrow: 'w-2.5 h-2.5',
  },
  lg: {
    padding: 'px-4 py-2',
    text: 'text-base',
    arrow: 'w-3 h-3',
  },
} as const;
