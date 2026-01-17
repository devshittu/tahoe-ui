// src/app/playground/command-menu/components/useCommandMenu.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for managing command menu state with keyboard shortcut
 *
 * @param shortcut - Key to trigger with meta/ctrl (default: 'k')
 * @returns Object with open state and controls
 *
 * @example
 * ```tsx
 * const { open, setOpen, toggle } = useCommandMenu();
 *
 * return <CommandMenu open={open} onOpenChange={setOpen} />;
 * ```
 */
export function useCommandMenu(shortcut = 'k') {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  // Listen for keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === shortcut) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcut, toggle]);

  return {
    open,
    setOpen,
    toggle,
  };
}

export default useCommandMenu;
