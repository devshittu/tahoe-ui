// src/components/UIManager/UIProvider.tsx
'use client';

import React, { useEffect } from 'react';
import { useUIManager } from './uiStore';

/**
 * UIProvider - Global keyboard handling for UI components
 *
 * Features:
 * - Priority-based ESC handling for overlays/modals
 * - Global keyboard shortcut support
 * - Conflict detection
 *
 * Wrap your app with this provider to enable UI management.
 *
 * @example
 * <UIProvider>
 *   <App />
 * </UIProvider>
 */
export const UIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const top = useUIManager((s) => s.top);
  const shortcuts = useUIManager((s) => s.shortcuts);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // Handle ESC key for UI component stack
      if (event.key === 'Escape') {
        const current = top();
        if (current?.onEscape) {
          event.preventDefault();
          event.stopPropagation();
          current.onEscape();
          return;
        }
      }

      // Handle registered keyboard shortcuts
      for (const shortcut of shortcuts) {
        if (!shortcut.enabled) continue;

        // Check key match
        if (event.key.toLowerCase() !== shortcut.key.toLowerCase()) continue;

        // Check modifiers
        const modifiers = shortcut.modifiers || {};
        const metaMatch = !!modifiers.meta === event.metaKey;
        const ctrlMatch = !!modifiers.ctrl === event.ctrlKey;
        const shiftMatch = !!modifiers.shift === event.shiftKey;
        const altMatch = !!modifiers.alt === event.altKey;

        if (metaMatch && ctrlMatch && shiftMatch && altMatch) {
          if (shortcut.preventDefault) {
            event.preventDefault();
          }
          shortcut.handler(event);
          return;
        }
      }
    };

    // Use capture phase to handle events before other handlers
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
    };
  }, [top, shortcuts]);

  return <>{children}</>;
};

export default UIProvider;
