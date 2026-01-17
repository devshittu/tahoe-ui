// src/app/playground/command-menu/components/CommandMenu.tsx
'use client';

import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
  Fragment,
} from 'react';
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FiSearch, FiCommand } from 'react-icons/fi';
import type { CommandMenuProps, CommandItem, CommandGroup } from './types';
import { DEFAULT_COMMAND_CONFIG, COMMAND_SIZE_CLASSES } from './types';

/**
 * CommandMenu - Raycast/Spotlight style command palette
 *
 * Built with HeadlessUI Dialog + Combobox for reliable a11y.
 *
 * Features:
 * - Keyboard shortcut activation (Cmd+K / Ctrl+K)
 * - Fuzzy search across commands
 * - Grouped commands with headings
 * - Keyboard navigation (arrow keys, enter, escape)
 * - Recent commands tracking
 * - No X button - Escape to close
 *
 * Design Principles:
 * - #6 Purposeful Motion: Smooth dialog animations
 * - #7 Intuitive Interaction: Standard keyboard patterns
 * - #12 Accessibility: Full keyboard + screen reader support
 * - #15 Progressive Disclosure: Search reveals relevant commands
 */
export function CommandMenu({
  open,
  onOpenChange,
  commands = [],
  groups = [],
  placeholder = DEFAULT_COMMAND_CONFIG.placeholder,
  emptyMessage = DEFAULT_COMMAND_CONFIG.emptyMessage,
  closeOnSelect = DEFAULT_COMMAND_CONFIG.closeOnSelect,
  filter = DEFAULT_COMMAND_CONFIG.filter,
  size = DEFAULT_COMMAND_CONFIG.size,
  handlebar = DEFAULT_COMMAND_CONFIG.handlebar,
  className,
}: CommandMenuProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset query when dialog closes, focus input when opens
  useEffect(() => {
    if (!open) {
      setQuery('');
    } else {
      // Focus input after animation frame to ensure DOM is ready
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [open]);

  // Flatten all items for filtering
  const allItems = useMemo(() => {
    const fromGroups = groups.flatMap((g) =>
      g.items.map((item) => ({ ...item, group: g.heading })),
    );
    return [...commands, ...fromGroups];
  }, [commands, groups]);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query) return allItems;
    return allItems.filter((item) => filter(item, query));
  }, [allItems, query, filter]);

  // Group filtered items
  const groupedResults = useMemo(() => {
    const grouped: { heading: string; items: CommandItem[] }[] = [];
    const ungrouped: CommandItem[] = [];

    filteredItems.forEach((item) => {
      if (item.group) {
        const existing = grouped.find((g) => g.heading === item.group);
        if (existing) {
          existing.items.push(item);
        } else {
          grouped.push({ heading: item.group, items: [item] });
        }
      } else {
        ungrouped.push(item);
      }
    });

    if (ungrouped.length > 0) {
      grouped.unshift({ heading: 'Commands', items: ungrouped });
    }

    return grouped;
  }, [filteredItems]);

  // Handle item selection
  const handleSelect = useCallback(
    (item: CommandItem | null) => {
      if (!item || item.disabled) return;
      item.onSelect();
      if (closeOnSelect) {
        onOpenChange(false);
      }
    },
    [closeOnSelect, onOpenChange],
  );

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          static
          open={open}
          onClose={() => onOpenChange(false)}
          className="relative z-50"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Dialog positioning */}
          <div className="fixed inset-0 flex items-start justify-center pt-[15vh] px-4">
            <DialogPanel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className={cn(
                COMMAND_SIZE_CLASSES[size],
                'bg-white dark:bg-gray-900',
                'rounded-2xl shadow-2xl',
                'border border-gray-200 dark:border-gray-800',
                'overflow-hidden',
                className,
              )}
            >
              {/* Top Handlebar */}
              {handlebar === 'top' && (
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => onOpenChange(false)}
                  className="w-full h-12 min-h-[44px] flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-200 dark:border-gray-800"
                  aria-label="Close command menu"
                >
                  <div className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                </button>
              )}

              <Combobox onChange={handleSelect}>
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                  <FiSearch className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <ComboboxInput
                    ref={inputRef}
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={cn(
                      'flex-1 bg-transparent border-none outline-none',
                      'text-gray-900 dark:text-gray-100',
                      'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                      'text-base',
                    )}
                  />
                  <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400">
                    esc
                  </kbd>
                </div>

                {/* Results List */}
                <ComboboxOptions
                  static
                  className="max-h-[60vh] overflow-y-auto py-2"
                >
                  {filteredItems.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                      <FiCommand className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>{emptyMessage}</p>
                    </div>
                  ) : (
                    groupedResults.map((group) => (
                      <div key={group.heading}>
                        <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {group.heading}
                        </div>
                        {group.items.map((item) => (
                          <ComboboxOption
                            key={item.id}
                            value={item}
                            disabled={item.disabled}
                            as={Fragment}
                          >
                            {({ focus, selected }) => (
                              <div
                                className={cn(
                                  'flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg cursor-pointer',
                                  'transition-colors duration-75',
                                  focus && 'bg-gray-100 dark:bg-gray-800',
                                  item.disabled &&
                                    'opacity-50 cursor-not-allowed',
                                )}
                              >
                                {/* Icon */}
                                {item.icon && (
                                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                    {item.icon}
                                  </div>
                                )}

                                {/* Label & Description */}
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                    {item.label}
                                  </div>
                                  {item.description && (
                                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                      {item.description}
                                    </div>
                                  )}
                                </div>

                                {/* Shortcut */}
                                {item.shortcut && (
                                  <div className="flex-shrink-0 text-xs text-gray-400 dark:text-gray-500">
                                    {item.shortcut}
                                  </div>
                                )}
                              </div>
                            )}
                          </ComboboxOption>
                        ))}
                      </div>
                    ))
                  )}
                </ComboboxOptions>

                {/* Footer hint */}
                <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-400 dark:text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                        ↑↓
                      </kbd>
                      navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                        ↵
                      </kbd>
                      select
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                      esc
                    </kbd>
                    close
                  </span>
                </div>
              </Combobox>

              {/* Bottom Handlebar */}
              {handlebar === 'bottom' && (
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="w-full h-12 min-h-[44px] flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-t border-gray-200 dark:border-gray-800"
                  aria-label="Close command menu"
                >
                  <div className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                </button>
              )}
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

export default CommandMenu;
