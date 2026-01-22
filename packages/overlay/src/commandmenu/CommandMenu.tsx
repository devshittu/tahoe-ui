'use client';

import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import {
  Dialog,
  DialogPanel,
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { FiSearch, FiCommand } from 'react-icons/fi';
import type { CommandMenuProps, CommandItem } from './types';
import {
  DEFAULT_COMMAND_CONFIG,
  COMMAND_SIZE_CLASSES,
  COMMAND_MENU_STYLES,
} from './types';

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
 * - CSS variable-backed theming
 *
 * Design Principles:
 * - #6 Purposeful Motion: Smooth dialog animations
 * - #7 Intuitive Interaction: Standard keyboard patterns
 * - #12 Accessibility: Full keyboard + screen reader support
 * - #15 Progressive Disclosure: Search reveals relevant commands
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * // Open with Cmd+K / Ctrl+K
 * useEffect(() => {
 *   const handler = (e: KeyboardEvent) => {
 *     if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
 *       e.preventDefault();
 *       setOpen(true);
 *     }
 *   };
 *   document.addEventListener('keydown', handler);
 *   return () => document.removeEventListener('keydown', handler);
 * }, []);
 *
 * <CommandMenu
 *   open={open}
 *   onOpenChange={setOpen}
 *   commands={[
 *     { id: '1', label: 'New File', onSelect: () => createFile() },
 *     { id: '2', label: 'Settings', onSelect: () => openSettings() },
 *   ]}
 * />
 * ```
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
              className={twMerge(
                COMMAND_SIZE_CLASSES[size],
                COMMAND_MENU_STYLES.dialog.base,
                'rounded-2xl shadow-2xl',
                COMMAND_MENU_STYLES.dialog.border,
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
                  className={twMerge(
                    'w-full h-12 min-h-[44px] flex items-center justify-center cursor-pointer transition-colors',
                    COMMAND_MENU_STYLES.handlebar.hover,
                    'border-b',
                    COMMAND_MENU_STYLES.handlebar.border,
                  )}
                  aria-label="Close command menu"
                >
                  <div
                    className={twMerge(
                      'w-12 h-1.5 rounded-full',
                      COMMAND_MENU_STYLES.handlebar.base,
                    )}
                  />
                </button>
              )}

              <Combobox onChange={handleSelect}>
                {/* Search Input */}
                <div
                  className={twMerge(
                    'flex items-center gap-3 px-4 py-3 border-b',
                    COMMAND_MENU_STYLES.handlebar.border,
                  )}
                >
                  <FiSearch
                    className={twMerge(
                      'w-5 h-5 flex-shrink-0',
                      COMMAND_MENU_STYLES.input.icon,
                    )}
                  />
                  <ComboboxInput
                    ref={inputRef}
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={twMerge(
                      'flex-1 bg-transparent border-none outline-none',
                      COMMAND_MENU_STYLES.input.text,
                      COMMAND_MENU_STYLES.input.placeholder,
                      'text-base',
                    )}
                  />
                  <kbd
                    className={twMerge(
                      'hidden sm:flex items-center gap-1 px-2 py-1 rounded text-xs',
                      COMMAND_MENU_STYLES.kbd.base,
                    )}
                  >
                    esc
                  </kbd>
                </div>

                {/* Results List */}
                <ComboboxOptions
                  static
                  className="max-h-[60vh] overflow-y-auto py-2"
                >
                  {filteredItems.length === 0 ? (
                    <div
                      className={twMerge(
                        'px-4 py-8 text-center',
                        COMMAND_MENU_STYLES.empty.text,
                      )}
                    >
                      <FiCommand className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>{emptyMessage}</p>
                    </div>
                  ) : (
                    groupedResults.map((group) => (
                      <div key={group.heading}>
                        <div
                          className={twMerge(
                            'px-4 py-2 text-xs font-medium uppercase tracking-wider',
                            COMMAND_MENU_STYLES.group.heading,
                          )}
                        >
                          {group.heading}
                        </div>
                        {group.items.map((item) => (
                          <ComboboxOption
                            key={item.id}
                            value={item}
                            disabled={item.disabled}
                            className={({ focus }) =>
                              twMerge(
                                'flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg cursor-pointer',
                                'transition-colors duration-75',
                                focus && COMMAND_MENU_STYLES.item.hover,
                                item.disabled &&
                                  COMMAND_MENU_STYLES.item.disabled,
                              )
                            }
                          >
                            {/* Icon */}
                            {item.icon != null && (
                              <div
                                className={twMerge(
                                  'flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg',
                                  COMMAND_MENU_STYLES.item.icon.wrapper,
                                )}
                              >
                                {item.icon}
                              </div>
                            )}

                            {/* Label & Description */}
                            <div className="flex-1 min-w-0">
                              <div
                                className={twMerge(
                                  'text-sm font-medium truncate',
                                  COMMAND_MENU_STYLES.item.base,
                                )}
                              >
                                {item.label}
                              </div>
                              {item.description && (
                                <div
                                  className={twMerge(
                                    'text-xs truncate',
                                    COMMAND_MENU_STYLES.item.description,
                                  )}
                                >
                                  {item.description}
                                </div>
                              )}
                            </div>

                            {/* Shortcut */}
                            {item.shortcut && (
                              <div
                                className={twMerge(
                                  'flex-shrink-0 text-xs',
                                  COMMAND_MENU_STYLES.item.shortcut,
                                )}
                              >
                                {item.shortcut}
                              </div>
                            )}
                          </ComboboxOption>
                        ))}
                      </div>
                    ))
                  )}
                </ComboboxOptions>

                {/* Footer hint */}
                <div
                  className={twMerge(
                    'flex items-center justify-between px-4 py-2 border-t text-xs',
                    COMMAND_MENU_STYLES.footer.border,
                    COMMAND_MENU_STYLES.footer.text,
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd
                        className={twMerge(
                          'px-1.5 py-0.5 rounded',
                          COMMAND_MENU_STYLES.kbd.base,
                        )}
                      >
                        ↑↓
                      </kbd>
                      navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd
                        className={twMerge(
                          'px-1.5 py-0.5 rounded',
                          COMMAND_MENU_STYLES.kbd.base,
                        )}
                      >
                        ↵
                      </kbd>
                      select
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <kbd
                      className={twMerge(
                        'px-1.5 py-0.5 rounded',
                        COMMAND_MENU_STYLES.kbd.base,
                      )}
                    >
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
                  className={twMerge(
                    'w-full h-12 min-h-[44px] flex items-center justify-center cursor-pointer transition-colors',
                    COMMAND_MENU_STYLES.handlebar.hover,
                    'border-t',
                    COMMAND_MENU_STYLES.handlebar.border,
                  )}
                  aria-label="Close command menu"
                >
                  <div
                    className={twMerge(
                      'w-12 h-1.5 rounded-full',
                      COMMAND_MENU_STYLES.handlebar.base,
                    )}
                  />
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
