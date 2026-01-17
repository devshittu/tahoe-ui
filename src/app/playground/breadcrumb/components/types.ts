// src/app/playground/breadcrumb/components/types.ts

import { ReactNode } from 'react';

/**
 * Breadcrumb item data
 */
export interface BreadcrumbItemData {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Navigation href */
  href?: string;
  /** Icon component */
  icon?: ReactNode;
  /** Whether this is the current/active item */
  current?: boolean;
}

/**
 * Separator style
 */
export type BreadcrumbSeparator = 'chevron' | 'slash' | 'arrow' | 'dot';

/**
 * Size variants
 */
export type BreadcrumbSize = 'sm' | 'md' | 'lg';

/**
 * Props for BreadcrumbItem component
 */
export interface BreadcrumbItemProps {
  /** Item data */
  item: BreadcrumbItemData;
  /** Whether this is the last item */
  isLast: boolean;
  /** Separator style */
  separator: BreadcrumbSeparator;
  /** Size variant */
  size: BreadcrumbSize;
  /** Click handler for items without href */
  onClick?: (item: BreadcrumbItemData) => void;
}

/**
 * Props for Breadcrumb component
 */
export interface BreadcrumbProps {
  /** Breadcrumb items */
  items: BreadcrumbItemData[];
  /** Separator style */
  separator?: BreadcrumbSeparator;
  /** Size variant */
  size?: BreadcrumbSize;
  /** Maximum visible items before collapsing (0 = no collapse) */
  maxItems?: number;
  /** Show home icon for first item */
  showHomeIcon?: boolean;
  /** Click handler for items without href */
  onItemClick?: (item: BreadcrumbItemData) => void;
  /** Additional class name */
  className?: string;
}

/**
 * Size configuration
 */
export const BREADCRUMB_SIZE_CONFIG: Record<
  BreadcrumbSize,
  {
    text: string;
    icon: string;
    gap: string;
    padding: string;
  }
> = {
  sm: {
    text: 'text-xs',
    icon: 'w-3 h-3',
    gap: 'gap-1',
    padding: 'px-1.5 py-0.5',
  },
  md: {
    text: 'text-sm',
    icon: 'w-4 h-4',
    gap: 'gap-1.5',
    padding: 'px-2 py-1',
  },
  lg: {
    text: 'text-base',
    icon: 'w-5 h-5',
    gap: 'gap-2',
    padding: 'px-2.5 py-1.5',
  },
};

/**
 * Separator icons (using react-icons naming)
 */
export const SEPARATOR_ICONS: Record<BreadcrumbSeparator, string> = {
  chevron: 'FiChevronRight',
  slash: 'slash',
  arrow: 'FiArrowRight',
  dot: 'dot',
};
