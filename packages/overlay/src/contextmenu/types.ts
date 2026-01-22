// packages/overlay/src/contextmenu/types.ts

import { ReactNode } from 'react';

/**
 * Context menu item type
 */
export type ContextMenuItemType = 'item' | 'separator' | 'label';

/**
 * Context menu item data
 */
export interface ContextMenuItemData {
  /** Unique identifier */
  id: string;
  /** Item type */
  type: ContextMenuItemType;
  /** Display label (for item/label types) */
  label?: string;
  /** Icon component */
  icon?: ReactNode;
  /** Keyboard shortcut hint */
  shortcut?: string;
  /** Click handler */
  onSelect?: () => void;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Danger/destructive action styling */
  danger?: boolean;
  /** Nested submenu items */
  submenu?: ContextMenuItemData[];
}

/**
 * Menu position from trigger point
 */
export interface MenuPosition {
  x: number;
  y: number;
}

/**
 * Context menu behavior mode
 * - 'modal': Fixed position, optional backdrop, blocks interactions until dismissed
 * - 'contextual': Scrolls with page, auto-closes on scroll (traditional behavior)
 */
export type ContextMenuBehavior = 'modal' | 'contextual';

/**
 * Props for ContextMenu component
 */
export interface ContextMenuProps {
  /** Trigger element */
  children: ReactNode;
  /** Menu items */
  items: ContextMenuItemData[];
  /** Disable context menu */
  disabled?: boolean;
  /** Long-press threshold for touch (ms) @default 500 */
  longPressThreshold?: number;
  /** Callback when menu opens */
  onOpen?: () => void;
  /** Callback when menu closes */
  onClose?: () => void;
  /** Additional class for trigger wrapper */
  className?: string;

  // === Behavior Configuration ===

  /**
   * Menu behavior mode
   * - 'modal': Fixed viewport position, optional backdrop
   * - 'contextual': Scrolls with page, closes on scroll
   * @default 'contextual'
   */
  behavior?: ContextMenuBehavior;

  /**
   * Show backdrop overlay when menu is open (modal behavior only)
   * @default false
   */
  showBackdrop?: boolean;

  /**
   * Backdrop opacity (0-1) when showBackdrop is true
   * @default 0.3
   */
  backdropOpacity?: number;

  /**
   * Custom backdrop class name
   */
  backdropClassName?: string;

  /**
   * Close menu when page scrolls (contextual behavior)
   * @default true
   */
  closeOnScroll?: boolean;

  /**
   * Close menu when window is resized
   * @default true
   */
  closeOnResize?: boolean;

  /**
   * Close menu when clicking outside
   * @default true
   */
  closeOnClickOutside?: boolean;

  /**
   * Close menu when pressing Escape key
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Scroll threshold (px) before closing in contextual mode
   * @default 10
   */
  scrollThreshold?: number;
}

/**
 * Props for ContextMenuItem
 */
export interface ContextMenuItemProps {
  item: ContextMenuItemData;
  onClose: () => void;
}

/**
 * Context menu state
 */
export interface ContextMenuState {
  /** Whether menu is open */
  isOpen: boolean;
  /** Menu position */
  position: MenuPosition | null;
  /** Open the menu at position */
  open: (position: MenuPosition) => void;
  /** Close the menu */
  close: () => void;
}

/**
 * Menu size configuration
 */
export const CONTEXT_MENU_CONFIG = {
  /** Minimum distance from viewport edge */
  viewportPadding: 8,
  /** Estimated menu width for positioning */
  estimatedWidth: 200,
  /** Estimated menu height for positioning */
  estimatedHeight: 300,
  /** Animation duration */
  animationDuration: 150,
} as const;

/**
 * CSS variable-backed styles for context menu
 */
export const CONTEXT_MENU_STYLES = {
  menu: {
    base: 'bg-bg-elevated dark:bg-bg-elevated',
    border: 'border border-border-subtle dark:border-border-subtle',
    shadow: 'shadow-lg shadow-black/10 dark:shadow-black/30',
  },
  item: {
    base: 'text-text-primary dark:text-text-primary',
    hover: 'bg-bg-secondary dark:bg-bg-secondary',
    icon: 'text-text-muted dark:text-text-muted',
    shortcut: 'text-text-muted dark:text-text-muted',
    disabled: 'opacity-50 cursor-not-allowed',
  },
  danger: {
    base: 'text-error dark:text-error',
    hover: 'bg-error/10 dark:bg-error/20',
    icon: 'text-error dark:text-error',
  },
  separator: 'bg-border-default dark:bg-border-default',
  label: 'text-text-muted dark:text-text-muted',
  progress: {
    ring: 'ring-text-muted/50 dark:ring-text-muted/50',
  },
} as const;
