// src/app/playground/dock-bar/components/types.ts

import { ReactNode } from 'react';

/**
 * Dock position
 */
export type DockPosition = 'bottom' | 'top';

/**
 * Dock size
 */
export type DockSize = 'sm' | 'md' | 'lg';

/**
 * Individual dock item data
 */
export interface DockItemData {
  /** Unique identifier */
  id: string;
  /** Icon component */
  icon: ReactNode;
  /** Label for tooltip/a11y */
  label: string;
  /** Navigation href */
  href?: string;
  /** Click handler */
  onClick?: () => void;
  /** Badge count */
  badge?: number;
  /** Whether item is active/selected */
  active?: boolean;
  /** Whether item is disabled */
  disabled?: boolean;
}

/**
 * Props for DockItem component
 */
export interface DockItemProps {
  /** Item data */
  item: DockItemData;
  /** Size variant */
  size: DockSize;
  /** Distance from mouse (for magnetic effect) */
  mouseDistance: number | null;
  /** Whether magnetic effect is enabled */
  magneticEnabled: boolean;
  /** Maximum scale factor */
  maxScale: number;
  /** Click handler */
  onClick?: (item: DockItemData) => void;
}

/**
 * Props for DockBar component
 */
export interface DockBarProps {
  /** Dock items */
  items: DockItemData[];
  /** Position on screen */
  position?: DockPosition;
  /** Size variant */
  size?: DockSize;
  /** Enable magnetic hover effect */
  magnetic?: boolean;
  /** Maximum scale for magnetic effect */
  maxScale?: number;
  /** Adapt to keyboard (iOS PWA) */
  adaptToKeyboard?: boolean;
  /** Show item labels on hover */
  showLabels?: boolean;
  /** Click handler for items */
  onItemClick?: (item: DockItemData) => void;
  /** Additional class name */
  className?: string;
}

/**
 * Size configuration
 */
export const DOCK_SIZE_CONFIG: Record<
  DockSize,
  {
    itemSize: number;
    iconSize: string;
    gap: string;
    padding: string;
    badgeSize: string;
  }
> = {
  sm: {
    itemSize: 40,
    iconSize: 'w-5 h-5',
    gap: 'gap-1',
    padding: 'px-2 py-1.5',
    badgeSize: 'w-4 h-4 text-[10px]',
  },
  md: {
    itemSize: 48,
    iconSize: 'w-6 h-6',
    gap: 'gap-1.5',
    padding: 'px-3 py-2',
    badgeSize: 'w-5 h-5 text-xs',
  },
  lg: {
    itemSize: 56,
    iconSize: 'w-7 h-7',
    gap: 'gap-2',
    padding: 'px-4 py-2.5',
    badgeSize: 'w-6 h-6 text-sm',
  },
};

/**
 * Magnetic effect configuration
 */
export const MAGNETIC_CONFIG = {
  /** Distance in pixels where effect starts */
  effectRadius: 150,
  /** Spring configuration for smooth animations */
  spring: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 25,
    mass: 0.5,
  },
};
