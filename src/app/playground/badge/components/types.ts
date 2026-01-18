// src/app/playground/badge/components/types.ts

import { ReactNode } from 'react';

/**
 * Badge size variants
 */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Badge color variants
 */
export type BadgeColor =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

/**
 * Badge visual variants
 */
export type BadgeVariant = 'solid' | 'soft' | 'outline' | 'dot';

/**
 * Props for Badge component
 */
export interface BadgeProps {
  /** Badge content (text, number, or element) */
  children?: ReactNode;
  /** Color theme */
  color?: BadgeColor;
  /** Visual variant */
  variant?: BadgeVariant;
  /** Size variant */
  size?: BadgeSize;
  /** Max number to display (shows "99+" if exceeded) */
  max?: number;
  /** Show as dot only (no content) */
  dot?: boolean;
  /** Pulse animation for attention */
  pulse?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Props for BadgeAnchor - wraps element with positioned badge
 */
export interface BadgeAnchorProps {
  /** Element to attach badge to */
  children: ReactNode;
  /** Badge content */
  badgeContent?: ReactNode;
  /** Badge color */
  color?: BadgeColor;
  /** Badge variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Max number */
  max?: number;
  /** Show as dot */
  dot?: boolean;
  /** Pulse animation */
  pulse?: boolean;
  /** Position of badge */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  /** Hide badge when content is 0 or empty */
  showZero?: boolean;
  /** Overlap mode for icons/avatars */
  overlap?: 'rectangular' | 'circular';
  /** Additional className for badge */
  className?: string;
}

/**
 * Size configuration following 8pt grid
 */
export const BADGE_SIZE_CONFIG: Record<
  BadgeSize,
  {
    /** Padding for badge with content */
    padding: string;
    /** Min width/height */
    minSize: string;
    /** Font size */
    fontSize: string;
    /** Height */
    height: string;
    /** Dot size (when used as dot only) */
    dotSize: string;
  }
> = {
  sm: {
    padding: 'px-1.5',
    minSize: 'min-w-[16px]',
    fontSize: 'text-[10px]',
    height: 'h-4',
    dotSize: 'w-2 h-2',
  },
  md: {
    padding: 'px-2',
    minSize: 'min-w-[20px]',
    fontSize: 'text-xs',
    height: 'h-5',
    dotSize: 'w-2.5 h-2.5',
  },
  lg: {
    padding: 'px-2.5',
    minSize: 'min-w-[24px]',
    fontSize: 'text-sm',
    height: 'h-6',
    dotSize: 'w-3 h-3',
  },
};

/**
 * Color configuration for each variant
 */
export const BADGE_COLOR_CONFIG: Record<
  BadgeVariant,
  Record<
    BadgeColor,
    {
      bg: string;
      text: string;
      border?: string;
    }
  >
> = {
  solid: {
    default: {
      bg: 'bg-gray-600 dark:bg-gray-500',
      text: 'text-white',
    },
    primary: {
      bg: 'bg-blue-600 dark:bg-blue-500',
      text: 'text-white',
    },
    success: {
      bg: 'bg-emerald-600 dark:bg-emerald-500',
      text: 'text-white',
    },
    warning: {
      bg: 'bg-amber-500 dark:bg-amber-400',
      text: 'text-white dark:text-gray-900',
    },
    error: {
      bg: 'bg-red-600 dark:bg-red-500',
      text: 'text-white',
    },
    info: {
      bg: 'bg-cyan-600 dark:bg-cyan-500',
      text: 'text-white',
    },
  },
  soft: {
    default: {
      bg: 'bg-gray-100 dark:bg-gray-800',
      text: 'text-gray-700 dark:text-gray-300',
    },
    primary: {
      bg: 'bg-blue-100 dark:bg-blue-900/40',
      text: 'text-blue-700 dark:text-blue-300',
    },
    success: {
      bg: 'bg-emerald-100 dark:bg-emerald-900/40',
      text: 'text-emerald-700 dark:text-emerald-300',
    },
    warning: {
      bg: 'bg-amber-100 dark:bg-amber-900/40',
      text: 'text-amber-700 dark:text-amber-300',
    },
    error: {
      bg: 'bg-red-100 dark:bg-red-900/40',
      text: 'text-red-700 dark:text-red-300',
    },
    info: {
      bg: 'bg-cyan-100 dark:bg-cyan-900/40',
      text: 'text-cyan-700 dark:text-cyan-300',
    },
  },
  outline: {
    default: {
      bg: 'bg-transparent',
      text: 'text-gray-600 dark:text-gray-400',
      border: 'border border-gray-300 dark:border-gray-600',
    },
    primary: {
      bg: 'bg-transparent',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border border-blue-300 dark:border-blue-700',
    },
    success: {
      bg: 'bg-transparent',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border border-emerald-300 dark:border-emerald-700',
    },
    warning: {
      bg: 'bg-transparent',
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border border-amber-300 dark:border-amber-700',
    },
    error: {
      bg: 'bg-transparent',
      text: 'text-red-600 dark:text-red-400',
      border: 'border border-red-300 dark:border-red-700',
    },
    info: {
      bg: 'bg-transparent',
      text: 'text-cyan-600 dark:text-cyan-400',
      border: 'border border-cyan-300 dark:border-cyan-700',
    },
  },
  dot: {
    default: {
      bg: 'bg-gray-500',
      text: '',
    },
    primary: {
      bg: 'bg-blue-500',
      text: '',
    },
    success: {
      bg: 'bg-emerald-500',
      text: '',
    },
    warning: {
      bg: 'bg-amber-500',
      text: '',
    },
    error: {
      bg: 'bg-red-500',
      text: '',
    },
    info: {
      bg: 'bg-cyan-500',
      text: '',
    },
  },
};

/**
 * Position configuration for BadgeAnchor
 */
export const BADGE_POSITION_CONFIG: Record<
  'top-right' | 'top-left' | 'bottom-right' | 'bottom-left',
  {
    rectangular: string;
    circular: string;
  }
> = {
  'top-right': {
    rectangular: 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
    circular: 'top-[14%] right-[14%] translate-x-1/2 -translate-y-1/2',
  },
  'top-left': {
    rectangular: 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
    circular: 'top-[14%] left-[14%] -translate-x-1/2 -translate-y-1/2',
  },
  'bottom-right': {
    rectangular: 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
    circular: 'bottom-[14%] right-[14%] translate-x-1/2 translate-y-1/2',
  },
  'bottom-left': {
    rectangular: 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    circular: 'bottom-[14%] left-[14%] -translate-x-1/2 translate-y-1/2',
  },
};

/**
 * Format badge content (handles max number)
 */
export function formatBadgeContent(
  content: ReactNode,
  max?: number,
): ReactNode {
  if (typeof content === 'number' && max !== undefined && content > max) {
    return `${max}+`;
  }
  return content;
}
