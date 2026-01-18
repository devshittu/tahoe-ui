// src/components/UIManager/uiStore.ts
'use client';

import { create } from 'zustand';

/**
 * Priority levels for UI components
 * Higher priority = handled first
 */
export const UIComponentPriority = {
  /** Base level (regular components) */
  BASE: 0,
  /** Dropdown/popover level */
  POPOVER: 10,
  /** Modal/dialog level */
  MODAL: 20,
  /** Nested modal level */
  MODAL_NESTED: 30,
  /** Alert/confirmation level */
  ALERT: 40,
  /** Critical level (errors, warnings) */
  CRITICAL: 50,
} as const;

export type UIComponentPriorityLevel =
  (typeof UIComponentPriority)[keyof typeof UIComponentPriority];

/**
 * UI Component registration
 */
export interface UIComponent {
  /** Unique identifier */
  id: string;
  /** Priority level (higher = handled first) */
  priority: number;
  /** ESC key handler */
  onEscape?: () => void;
  /** Component label for debugging */
  label?: string;
}

/**
 * Global keyboard shortcut
 */
export interface KeyboardShortcut {
  /** Unique identifier */
  id: string;
  /** Key or key combination (e.g., 'k', 'cmd+k', 'ctrl+shift+p') */
  key: string;
  /** Modifier keys */
  modifiers?: {
    meta?: boolean;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
  };
  /** Handler function */
  handler: (event: KeyboardEvent) => void;
  /** Whether to prevent default browser behavior */
  preventDefault?: boolean;
  /** Whether shortcut is enabled */
  enabled?: boolean;
  /** Description for help/debugging */
  description?: string;
}

/**
 * UI Manager state
 */
interface UIState {
  /** Component stack sorted by priority */
  stack: UIComponent[];
  /** Registered keyboard shortcuts */
  shortcuts: KeyboardShortcut[];

  // Component stack management
  /** Register a UI component */
  register: (comp: UIComponent) => void;
  /** Unregister a UI component by ID */
  unregister: (id: string) => void;
  /** Get the top-priority component */
  top: () => UIComponent | undefined;
  /** Check if a component is registered */
  has: (id: string) => boolean;
  /** Get stack debug info */
  getStackInfo: () => Array<{ id: string; priority: number; label?: string }>;

  // Keyboard shortcut management
  /** Register a keyboard shortcut */
  registerShortcut: (shortcut: KeyboardShortcut) => void;
  /** Unregister a keyboard shortcut */
  unregisterShortcut: (id: string) => void;
  /** Check for shortcut conflicts */
  hasShortcutConflict: (
    key: string,
    modifiers?: KeyboardShortcut['modifiers'],
  ) => boolean;
  /** Enable/disable a shortcut */
  setShortcutEnabled: (id: string, enabled: boolean) => void;
}

/**
 * Normalize key string for comparison
 */
function normalizeKey(key: string): string {
  return key.toLowerCase();
}

/**
 * Check if modifiers match
 */
function modifiersMatch(
  a: KeyboardShortcut['modifiers'],
  b: KeyboardShortcut['modifiers'],
): boolean {
  const aMod = a || {};
  const bMod = b || {};
  return (
    !!aMod.meta === !!bMod.meta &&
    !!aMod.ctrl === !!bMod.ctrl &&
    !!aMod.shift === !!bMod.shift &&
    !!aMod.alt === !!bMod.alt
  );
}

/**
 * UIManager Zustand store
 *
 * Features:
 * - Priority-based ESC handling
 * - Global keyboard shortcut registration
 * - Conflict detection for shortcuts
 */
export const useUIManager = create<UIState>((set, get) => ({
  stack: [],
  shortcuts: [],

  register: (comp) => {
    set((s) => {
      // Prevent duplicate registration
      if (s.stack.some((c) => c.id === comp.id)) {
        return s;
      }

      // Insert and sort by priority (highest first)
      const newStack = [...s.stack, comp].sort(
        (a, b) => b.priority - a.priority,
      );
      return { stack: newStack };
    });
  },

  unregister: (id) => {
    set((s) => ({
      stack: s.stack.filter((c) => c.id !== id),
    }));
  },

  top: () => {
    const stack = get().stack;
    return stack[0]; // Highest priority is first
  },

  has: (id) => {
    return get().stack.some((c) => c.id === id);
  },

  getStackInfo: () => {
    return get().stack.map(({ id, priority, label }) => ({
      id,
      priority,
      label,
    }));
  },

  registerShortcut: (shortcut) => {
    set((s) => {
      // Check for conflicts
      const existing = s.shortcuts.find(
        (sc) =>
          normalizeKey(sc.key) === normalizeKey(shortcut.key) &&
          modifiersMatch(sc.modifiers, shortcut.modifiers),
      );

      if (existing) {
        console.warn(
          `[UIManager] Shortcut conflict: "${shortcut.key}" is already registered by "${existing.id}"`,
        );
      }

      // Replace or add
      const filtered = s.shortcuts.filter((sc) => sc.id !== shortcut.id);
      return {
        shortcuts: [
          ...filtered,
          { ...shortcut, enabled: shortcut.enabled ?? true },
        ],
      };
    });
  },

  unregisterShortcut: (id) => {
    set((s) => ({
      shortcuts: s.shortcuts.filter((sc) => sc.id !== id),
    }));
  },

  hasShortcutConflict: (key, modifiers) => {
    return get().shortcuts.some(
      (sc) =>
        normalizeKey(sc.key) === normalizeKey(key) &&
        modifiersMatch(sc.modifiers, modifiers),
    );
  },

  setShortcutEnabled: (id, enabled) => {
    set((s) => ({
      shortcuts: s.shortcuts.map((sc) =>
        sc.id === id ? { ...sc, enabled } : sc,
      ),
    }));
  },
}));

/**
 * Get the current UI stack for debugging
 */
export function getUIStack(): Array<{
  id: string;
  priority: number;
  label?: string;
}> {
  return useUIManager.getState().getStackInfo();
}

/**
 * Get all registered shortcuts for debugging
 */
export function getShortcuts(): KeyboardShortcut[] {
  return useUIManager.getState().shortcuts;
}
