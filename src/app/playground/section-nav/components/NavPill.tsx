// src/app/playground/section-nav/components/NavPill.tsx
'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp, FiSearch } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useScrollSpy } from './useScrollSpy';
import { CommandOverlay } from './primitives';
import type {
  SectionItem,
  SectionNavBehavior,
  UseScrollSpyOptions,
  SectionNavSize,
} from './types';
import { SECTION_NAV_ANIMATIONS, getSizeConfig } from './types';

export type NavPillPosition = 'bottom' | 'top';
export type NavPillAlign = 'left' | 'center' | 'right';
export type NavPillVariant = 'pill' | 'bar' | 'minimal';
export type NavPillDisplay = 'icons' | 'labels' | 'both' | 'numbers';

export interface NavPillProps {
  /** Section items to navigate */
  sections: SectionItem[];

  /** Vertical position */
  position?: NavPillPosition;

  /** Horizontal alignment */
  align?: NavPillAlign;

  /** CSS position behavior */
  behavior?: SectionNavBehavior;

  /** Visual style variant */
  variant?: NavPillVariant;

  /** What to display in tabs */
  display?: NavPillDisplay;

  /** Size variant */
  size?: SectionNavSize;

  /** Show all sections as tabs */
  showAllSections?: boolean;

  /** Max visible sections before overflow */
  maxVisibleSections?: number;

  /** Show progress bar */
  showProgress?: boolean;

  /** Show back to top button */
  showBackToTop?: boolean;

  /** Enable command mode (⌘J) */
  enableCommand?: boolean;

  /** Command mode keyboard shortcut */
  commandKey?: string;

  /** Auto-hide when at top/bottom */
  autoHide?: boolean;

  /** Auto-hide threshold */
  autoHideThreshold?: number;

  /** Gap between items (in pixels) */
  itemGap?: number;

  /** Scroll spy options */
  scrollSpyOptions?: Partial<UseScrollSpyOptions>;

  /** Custom class name */
  className?: string;

  /** Disable all interactions */
  disabled?: boolean;

  /** Accessible label */
  ariaLabel?: string;

  /** Callback when section changes */
  onSectionChange?: (section: SectionItem | null) => void;
}

/**
 * NavPill - Horizontal floating pill navigation
 *
 * A bottom-anchored navigation pill that shows:
 * - Current section indicator
 * - Section tabs (optional)
 * - Progress bar (optional)
 * - Command mode trigger
 *
 * Use cases:
 * - Mobile-first navigation
 * - Documentation pages
 * - Multi-section landing pages
 *
 * @example
 * ```tsx
 * <NavPill
 *   sections={sections}
 *   position="bottom"
 *   align="center"
 *   showAllSections
 *   enableCommand
 * />
 * ```
 */
export function NavPill({
  sections,
  position = 'bottom',
  align = 'center',
  behavior = 'fixed',
  variant = 'pill',
  display = 'icons',
  size = 'default',
  showAllSections = false,
  maxVisibleSections = 5,
  showProgress = true,
  showBackToTop = true,
  enableCommand = true,
  commandKey = 'j',
  autoHide = false,
  autoHideThreshold = 100,
  itemGap = 4,
  scrollSpyOptions = {},
  className,
  disabled = false,
  ariaLabel = 'Page navigation',
  onSectionChange,
}: NavPillProps) {
  const sizeConfig = getSizeConfig(size);
  const [isVisible, setIsVisible] = useState(!autoHide);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const prefersReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)',
  );

  const { activeSection, activeSectionId, progress, scrollToSection } =
    useScrollSpy({
      sections,
      ...scrollSpyOptions,
      onSectionChange: (section, previous) => {
        scrollSpyOptions.onSectionChange?.(section, previous);
        onSectionChange?.(section);
      },
    });

  // Auto-hide on scroll
  useEffect(() => {
    if (!autoHide) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (position === 'bottom') {
        // Hide when near bottom
        setIsVisible(
          scrollY < maxScroll - autoHideThreshold &&
            scrollY > autoHideThreshold,
        );
      } else {
        // Hide when near top
        setIsVisible(scrollY > autoHideThreshold);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [autoHide, autoHideThreshold, position]);

  // Command mode keyboard shortcut
  useEffect(() => {
    if (!enableCommand || disabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key.toLowerCase() === commandKey.toLowerCase()
      ) {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enableCommand, disabled, commandKey]);

  const handleSectionClick = useCallback(
    (sectionId: string) => {
      scrollToSection(sectionId);
    },
    [scrollToSection],
  );

  const handleBackToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Visible sections (limit if showAllSections)
  const visibleSections = showAllSections
    ? sections.slice(0, maxVisibleSections)
    : [];
  const hasOverflow = showAllSections && sections.length > maxVisibleSections;

  // Get active section index for indicator positioning
  const activeIndex = sections.findIndex((s) => s.id === activeSectionId);

  // Position classes
  const positionClasses = cn(
    behavior === 'fixed' && 'fixed',
    behavior === 'sticky' && 'sticky',
    behavior === 'absolute' && 'absolute',
    'left-0 right-0 z-40',
    'flex justify-center px-4',
    position === 'bottom' ? 'bottom-6' : 'top-6',
  );

  // Alignment classes
  const alignClasses = cn(
    align === 'left' && 'mr-auto',
    align === 'center' && 'mx-auto',
    align === 'right' && 'ml-auto',
  );

  if (sections.length === 0) return null;

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ opacity: 0, y: position === 'bottom' ? 20 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position === 'bottom' ? 20 : -20 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.1 }
                : SECTION_NAV_ANIMATIONS.springGentle
            }
            className={cn(positionClasses, className)}
            aria-label={ariaLabel}
            role="navigation"
          >
            <div
              className={cn(
                alignClasses,
                'flex items-center',
                // Variant-specific styling
                variant === 'pill' && [
                  'px-2 py-2',
                  'bg-white/90 dark:bg-gray-900/90',
                  'backdrop-blur-xl backdrop-saturate-150',
                  'rounded-2xl',
                  'border border-gray-200/60 dark:border-gray-700/50',
                  'shadow-xl shadow-black/5 dark:shadow-black/30',
                  'ring-1 ring-white/50 dark:ring-white/5 ring-inset',
                ],
                variant === 'bar' && [
                  'px-4 py-2',
                  'bg-white/95 dark:bg-gray-900/95',
                  'backdrop-blur-xl',
                  'rounded-full',
                  'border border-gray-200/80 dark:border-gray-700/60',
                  'shadow-lg shadow-black/5 dark:shadow-black/20',
                ],
                variant === 'minimal' && [
                  'px-1 py-1',
                  'bg-gray-100/90 dark:bg-gray-800/90',
                  'backdrop-blur-md',
                  'rounded-xl',
                ],
                disabled && 'opacity-50 pointer-events-none',
              )}
              style={{ gap: itemGap }}
            >
              {/* Progress bar (at top of pill) */}
              {showProgress && (
                <div className="absolute top-0 left-4 right-4 h-0.5 bg-gray-200/60 dark:bg-gray-700/40 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gray-900 dark:bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress * 100}%` }}
                    transition={SECTION_NAV_ANIMATIONS.springSmooth}
                  />
                </div>
              )}

              {/* Back to top (when scrolled) */}
              <AnimatePresence>
                {showBackToTop && progress > 0.15 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={SECTION_NAV_ANIMATIONS.springGentle}
                    type="button"
                    onClick={handleBackToTop}
                    className={cn(
                      'flex items-center justify-center',
                      'w-9 h-9 rounded-xl',
                      'bg-gray-100/80 dark:bg-gray-800/60',
                      'hover:bg-gray-200/80 dark:hover:bg-gray-700/60',
                      'text-gray-600 dark:text-gray-300',
                      'transition-colors duration-150',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70',
                    )}
                    title="Back to top"
                    aria-label="Scroll back to top"
                  >
                    <FiArrowUp size={16} />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Section tabs (if showAllSections) */}
              {showAllSections && (
                <div className="flex items-center" style={{ gap: itemGap }}>
                  {visibleSections.map((section, index) => {
                    const isActive = section.id === activeSectionId;

                    // Determine what to render based on display mode
                    const renderContent = () => {
                      switch (display) {
                        case 'labels':
                          return (
                            <span
                              className="text-xs font-medium truncate max-w-[80px]"
                              style={{ fontSize: sizeConfig.fontSize }}
                            >
                              {section.label}
                            </span>
                          );
                        case 'both':
                          return (
                            <span className="flex items-center gap-1.5">
                              {section.icon && (
                                <span style={{ fontSize: sizeConfig.iconSize }}>
                                  {section.icon}
                                </span>
                              )}
                              <span
                                className="text-xs font-medium truncate max-w-[60px]"
                                style={{ fontSize: sizeConfig.fontSize - 1 }}
                              >
                                {section.label}
                              </span>
                            </span>
                          );
                        case 'numbers':
                          return (
                            <span className="text-xs font-medium">
                              {index + 1}
                            </span>
                          );
                        case 'icons':
                        default:
                          return (
                            section.icon || (
                              <span className="text-xs font-medium">
                                {index + 1}
                              </span>
                            )
                          );
                      }
                    };

                    // Calculate button size based on display mode
                    const buttonClasses = cn(
                      'relative flex items-center justify-center',
                      'rounded-xl',
                      'transition-colors duration-150',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70',
                      // Size varies by display mode
                      display === 'labels' || display === 'both'
                        ? 'px-3 h-9'
                        : size === 'compact'
                          ? 'w-8 h-8'
                          : size === 'large'
                            ? 'w-11 h-11'
                            : 'w-9 h-9',
                      isActive
                        ? 'text-white dark:text-gray-900'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
                    );

                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => handleSectionClick(section.id)}
                        className={buttonClasses}
                        title={section.label}
                        aria-label={section.label}
                        aria-current={isActive ? 'true' : undefined}
                      >
                        {/* Active indicator - renders inside active button */}
                        {isActive && (
                          <motion.span
                            layoutId="navpill-active-indicator"
                            className="absolute inset-0 bg-gray-900 dark:bg-white rounded-xl"
                            transition={SECTION_NAV_ANIMATIONS.springSmooth}
                          />
                        )}
                        <span className="relative z-10">{renderContent()}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Current section label (if not showing all sections) */}
              {!showAllSections && activeSection && (
                <div className="flex items-center gap-2 px-3">
                  {activeSection.icon && (
                    <span className="text-gray-500 dark:text-gray-400">
                      {activeSection.icon}
                    </span>
                  )}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate max-w-[150px]">
                    {activeSection.label}
                  </span>
                </div>
              )}

              {/* Overflow / Command trigger */}
              {(hasOverflow || enableCommand) && (
                <motion.button
                  type="button"
                  onClick={() => setIsCommandOpen(true)}
                  className={cn(
                    'flex items-center justify-center gap-1.5',
                    'px-3 h-9 rounded-xl',
                    'bg-gray-100/80 dark:bg-gray-800/60',
                    'hover:bg-gray-200/80 dark:hover:bg-gray-700/60',
                    'text-gray-600 dark:text-gray-300',
                    'text-sm',
                    'transition-colors duration-150',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70',
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  title={`Jump to section (⌘${commandKey.toUpperCase()})`}
                  aria-label="Jump to section"
                >
                  <FiSearch size={14} />
                  {hasOverflow && (
                    <span className="text-xs">
                      +{sections.length - maxVisibleSections}
                    </span>
                  )}
                </motion.button>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Command overlay */}
      {enableCommand && (
        <CommandOverlay
          isOpen={isCommandOpen}
          onClose={() => setIsCommandOpen(false)}
          sections={sections}
          activeSectionId={activeSectionId}
          onNavigate={(sectionId) => {
            scrollToSection(sectionId);
          }}
          shortcutKey={commandKey}
        />
      )}
    </>
  );
}

export default NavPill;
