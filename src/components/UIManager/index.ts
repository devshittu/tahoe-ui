// src/components/UIManager/index.ts

/**
 * UIManager - Global UI state management
 *
 * Features:
 * - Priority-based ESC handling for overlays/modals
 * - Global keyboard shortcut registration
 * - Conflict detection
 */

export { UIProvider } from './UIProvider';
export {
  useUIManager,
  UIComponentPriority,
  getUIStack,
  getShortcuts,
  type UIComponent,
  type UIComponentPriorityLevel,
  type KeyboardShortcut,
} from './uiStore';
