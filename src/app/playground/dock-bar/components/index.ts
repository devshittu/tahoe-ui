// src/app/playground/dock-bar/components/index.ts

/**
 * Dock Bar - macOS-style bottom bar with magnetic hover effect
 *
 * Features:
 * - Magnetic hover effect (items scale toward cursor)
 * - Badge notifications with animations
 * - Keyboard height adaptation (iOS PWA)
 * - Safe area inset handling
 * - Tooltip labels on hover
 */

// Components
export { DockBar } from './DockBar';
export { DockItem } from './DockItem';

// Types
export type {
  DockBarProps,
  DockItemProps,
  DockItemData,
  DockPosition,
  DockSize,
} from './types';

// Constants
export { DOCK_SIZE_CONFIG, MAGNETIC_CONFIG } from './types';
