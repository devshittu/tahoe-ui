// src/app/playground/section-nav/components/primitives/CommandOverlay.tsx
'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import {
  FiSearch,
  FiCornerDownLeft,
  FiArrowUp,
  FiArrowDown,
} from 'react-icons/fi';
import { cn } from '@/lib/utils';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import type { SectionItem } from '../types';
import { SECTION_NAV_ANIMATIONS } from '../types';

export interface CommandOverlayProps {
  /** Whether overlay is open */
  isOpen: boolean;
  /** Close the overlay */
  onClose: () => void;
  /** Sections to search/navigate */
  sections: SectionItem[];
  /** Currently active section ID */
  activeSectionId: string | null;
  /** Navigate to a section */
  onNavigate: (sectionId: string) => void;
  /** Keyboard shortcut hint (e.g., "J") */
  shortcutKey: string;
}

/**
 * CommandOverlay - Quick jump search modal
 *
 * Features:
 * - Fuzzy search through sections
 * - Keyboard navigation (up/down arrows, enter to select)
 * - Shows current section indicator
 * - Recent sections (TODO: implement with localStorage)
 */
export function CommandOverlay({
  isOpen,
  onClose,
  sections,
  activeSectionId,
  onNavigate,
  shortcutKey,
}: CommandOverlayProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { ref: focusTrapRef } = useFocusTrap<HTMLDivElement>({
    enabled: isOpen,
    returnFocus: true,
  });

  // Fuzzy search - matches if query chars appear in order
  const filteredSections = useMemo(() => {
    if (!query.trim()) return sections;

    const lowerQuery = query.toLowerCase();
    return sections.filter((section) => {
      const lowerLabel = section.label.toLowerCase();
      const lowerDesc = (section.description || '').toLowerCase();

      // Simple fuzzy: all query chars must appear in order
      let queryIndex = 0;
      for (const char of lowerLabel + ' ' + lowerDesc) {
        if (char === lowerQuery[queryIndex]) {
          queryIndex++;
          if (queryIndex === lowerQuery.length) return true;
        }
      }
      return false;
    });
  }, [sections, query]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Reset query when opening
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      // Focus input after animation
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredSections.length - 1 ? prev + 1 : 0,
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredSections.length - 1,
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredSections[selectedIndex]) {
            onNavigate(filteredSections[selectedIndex].id);
            onClose();
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    },
    [filteredSections, selectedIndex, onNavigate, onClose],
  );

  // Handle section click
  const handleSectionClick = useCallback(
    (sectionId: string) => {
      onNavigate(sectionId);
      onClose();
    },
    [onNavigate, onClose],
  );

  // Don't render on server
  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={focusTrapRef}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={SECTION_NAV_ANIMATIONS.spring}
            className={cn(
              'fixed z-50',
              'top-[20%] left-1/2 -translate-x-1/2',
              'w-full max-w-md',
              'bg-white dark:bg-gray-900',
              'rounded-xl',
              'shadow-2xl shadow-black/20',
              'border border-gray-200 dark:border-gray-700',
              'overflow-hidden',
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Jump to section"
            onKeyDown={handleKeyDown}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <FiSearch
                size={18}
                className="text-gray-400 dark:text-gray-500 flex-shrink-0"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to section..."
                className={cn(
                  'flex-1 bg-transparent',
                  'text-gray-900 dark:text-white',
                  'placeholder-gray-400 dark:placeholder-gray-500',
                  'text-base',
                  'focus:outline-none',
                )}
                aria-label="Search sections"
              />
              <kbd
                className={cn(
                  'hidden sm:flex items-center gap-1',
                  'px-1.5 py-0.5 rounded',
                  'bg-gray-100 dark:bg-gray-800',
                  'text-xs text-gray-500 dark:text-gray-400',
                  'font-mono',
                )}
              >
                esc
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[300px] overflow-y-auto">
              {filteredSections.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  No sections found
                </div>
              ) : (
                <ul role="listbox" className="py-2">
                  {filteredSections.map((section, index) => {
                    const isSelected = index === selectedIndex;
                    const isCurrent = section.id === activeSectionId;

                    return (
                      <li
                        key={section.id}
                        role="option"
                        aria-selected={isSelected}
                      >
                        <button
                          type="button"
                          onClick={() => handleSectionClick(section.id)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={cn(
                            'w-full flex items-center gap-3 px-4 py-2.5',
                            'text-left',
                            'transition-colors duration-100',
                            isSelected
                              ? 'bg-gray-100 dark:bg-gray-800'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
                          )}
                        >
                          {/* Icon */}
                          {section.icon && (
                            <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">
                              {section.icon}
                            </span>
                          )}

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div
                              className={cn(
                                'text-sm font-medium truncate',
                                isCurrent
                                  ? 'text-blue-600 dark:text-blue-400'
                                  : 'text-gray-900 dark:text-white',
                              )}
                            >
                              {section.label}
                              {isCurrent && (
                                <span className="ml-2 text-xs text-gray-400">
                                  (current)
                                </span>
                              )}
                            </div>
                            {section.description && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {section.description}
                              </div>
                            )}
                          </div>

                          {/* Enter hint on selected */}
                          {isSelected && (
                            <FiCornerDownLeft
                              size={14}
                              className="text-gray-400 flex-shrink-0"
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer with keyboard hints */}
            <div
              className={cn(
                'flex items-center justify-between',
                'px-4 py-2',
                'border-t border-gray-200 dark:border-gray-700',
                'bg-gray-50 dark:bg-gray-800/50',
                'text-xs text-gray-500 dark:text-gray-400',
              )}
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <FiArrowUp size={12} />
                  <FiArrowDown size={12} />
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 rounded bg-gray-200 dark:bg-gray-700 font-mono">
                    ↵
                  </kbd>
                  select
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="px-1 rounded bg-gray-200 dark:bg-gray-700 font-mono">
                  ⌘
                </kbd>
                <kbd className="px-1 rounded bg-gray-200 dark:bg-gray-700 font-mono">
                  {shortcutKey.toUpperCase()}
                </kbd>
                to open
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default CommandOverlay;
