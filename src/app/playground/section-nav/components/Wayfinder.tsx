// src/app/playground/section-nav/components/Wayfinder.tsx
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp, FiChevronRight, FiCommand } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useScrollSpy } from './useScrollSpy';
import { CommandOverlay } from './primitives';
import type {
  SectionItem,
  SectionNavPosition,
  SectionNavBehavior,
  UseScrollSpyOptions,
} from './types';
import { SECTION_NAV_ANIMATIONS, getSizeConfig, SectionNavSize } from './types';

export interface WayfinderProps {
  /** Section items to navigate */
  sections: SectionItem[];

  /** Position on screen */
  position?: SectionNavPosition;

  /** CSS position behavior */
  behavior?: SectionNavBehavior;

  /** Size variant */
  size?: SectionNavSize;

  /** Show current section label */
  showLabel?: boolean;

  /** Show progress percentage */
  showPercentage?: boolean;

  /** Auto-hide when at top of page */
  autoHide?: boolean;

  /** Auto-hide threshold */
  autoHideThreshold?: number;

  /** Click to show section list */
  expandable?: boolean;

  /** Enable command mode (⌘J) */
  enableCommand?: boolean;

  /** Command mode keyboard shortcut */
  commandKey?: string;

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
 * Wayfinder - Minimal progress indicator
 *
 * A subtle, non-intrusive progress indicator that shows:
 * - Current scroll progress through the page
 * - Active section name (optional)
 * - Expands to section list on click (optional)
 *
 * Use cases:
 * - Long articles where full SectionNav is too prominent
 * - Mobile-first experiences
 * - Minimal UI requirements
 *
 * @example
 * ```tsx
 * <Wayfinder
 *   sections={sections}
 *   position="right"
 *   showLabel
 *   expandable
 * />
 * ```
 */
export function Wayfinder({
  sections,
  position = 'right',
  behavior = 'fixed',
  size = 'default',
  showLabel = true,
  showPercentage = false,
  autoHide = true,
  autoHideThreshold = 100,
  expandable = true,
  enableCommand = false,
  commandKey = 'j',
  scrollSpyOptions = {},
  className,
  disabled = false,
  ariaLabel = 'Page progress',
  onSectionChange,
}: WayfinderProps) {
  const sizeConfig = getSizeConfig(size);
  const [isExpanded, setIsExpanded] = useState(false);
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
      setIsVisible(window.scrollY > autoHideThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [autoHide, autoHideThreshold]);

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

  const handleClick = useCallback(() => {
    if (expandable && !disabled) {
      setIsExpanded((prev) => !prev);
    }
  }, [expandable, disabled]);

  const handleSectionClick = useCallback(
    (sectionId: string) => {
      scrollToSection(sectionId);
      setIsExpanded(false);
    },
    [scrollToSection],
  );

  const handleBackToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsExpanded(false);
  }, []);

  const percentage = Math.round(progress * 100);

  // Position classes
  const positionClasses = cn(
    behavior === 'fixed' && 'fixed',
    behavior === 'sticky' && 'sticky',
    behavior === 'absolute' && 'absolute',
    'bottom-6 z-40',
    position === 'left' ? 'left-4' : 'right-4',
  );

  if (sections.length === 0) return null;

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.1 }
                : SECTION_NAV_ANIMATIONS.springGentle
            }
            className={cn(positionClasses, className)}
          >
            {/* Main pill */}
            <motion.button
              type="button"
              onClick={handleClick}
              className={cn(
                'flex items-center gap-2',
                'px-3 py-2',
                'bg-white/90 dark:bg-gray-900/90',
                'backdrop-blur-xl backdrop-saturate-150',
                'rounded-full',
                'border border-gray-200/60 dark:border-gray-700/50',
                'shadow-lg shadow-black/5 dark:shadow-black/30',
                'transition-all duration-200',
                'hover:shadow-xl hover:scale-[1.02]',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70',
                disabled && 'opacity-50 pointer-events-none',
              )}
              aria-label={ariaLabel}
              aria-expanded={isExpanded}
            >
              {/* Progress ring */}
              <div className="relative w-6 h-6">
                <svg className="w-6 h-6 -rotate-90" viewBox="0 0 24 24">
                  {/* Background circle */}
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  {/* Progress circle */}
                  <motion.circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="text-gray-900 dark:text-white"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: progress }}
                    transition={SECTION_NAV_ANIMATIONS.springSmooth}
                    style={{
                      strokeDasharray: '62.83',
                      strokeDashoffset: '0',
                    }}
                  />
                </svg>
                {showPercentage && (
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] font-medium text-gray-700 dark:text-gray-300">
                    {percentage}
                  </span>
                )}
              </div>

              {/* Label */}
              <AnimatePresence mode="wait">
                {showLabel && activeSection && (
                  <motion.span
                    key={activeSection.id}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 4 }}
                    transition={SECTION_NAV_ANIMATIONS.springGentle}
                    className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate max-w-[120px]"
                  >
                    {activeSection.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Expand indicator */}
              {expandable && (
                <motion.span
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={SECTION_NAV_ANIMATIONS.springGentle}
                  className="text-gray-400 dark:text-gray-500"
                >
                  <FiChevronRight size={14} />
                </motion.span>
              )}
            </motion.button>

            {/* Expanded section list */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={SECTION_NAV_ANIMATIONS.springGentle}
                  className={cn(
                    'absolute bottom-full mb-2',
                    position === 'left' ? 'left-0' : 'right-0',
                    'min-w-[180px] max-w-[240px]',
                    'bg-white/95 dark:bg-gray-900/95',
                    'backdrop-blur-xl',
                    'rounded-xl',
                    'border border-gray-200/60 dark:border-gray-700/50',
                    'shadow-xl shadow-black/10 dark:shadow-black/30',
                    'overflow-hidden',
                  )}
                >
                  {/* Section list */}
                  <div className="py-1.5 max-h-[280px] overflow-y-auto">
                    {sections.map((section) => {
                      const isActive = section.id === activeSectionId;
                      return (
                        <button
                          key={section.id}
                          type="button"
                          onClick={() => handleSectionClick(section.id)}
                          className={cn(
                            'w-full flex items-center gap-2 px-3 py-2',
                            'text-left text-sm',
                            'transition-colors duration-100',
                            isActive
                              ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50',
                          )}
                        >
                          {section.icon && (
                            <span className="flex-shrink-0 text-gray-400 dark:text-gray-500">
                              {section.icon}
                            </span>
                          )}
                          <span className="truncate">{section.label}</span>
                          {isActive && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Back to top */}
                  {progress > 0.1 && (
                    <>
                      <div className="h-px bg-gray-200/80 dark:bg-gray-700/60" />
                      <button
                        type="button"
                        onClick={handleBackToTop}
                        className={cn(
                          'w-full flex items-center gap-2 px-3 py-2',
                          'text-sm text-gray-500 dark:text-gray-400',
                          'hover:bg-gray-50 dark:hover:bg-gray-800/50',
                          'transition-colors duration-100',
                        )}
                      >
                        <FiArrowUp size={14} />
                        <span>Back to top</span>
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
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
            setIsExpanded(false);
          }}
          shortcutKey={commandKey}
        />
      )}
    </>
  );
}

export default Wayfinder;
