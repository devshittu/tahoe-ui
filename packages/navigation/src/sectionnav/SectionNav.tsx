'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useScrollSpy } from './useScrollSpy';
import type { SectionNavProps, SectionNavMode } from './types';
import {
  SECTION_NAV_ANIMATIONS,
  SECTION_NAV_STYLES,
  getSizeConfig,
} from './types';

/**
 * SectionNav - Adaptive section navigation component
 *
 * A thoughtfully designed navigation component for long-scroll pages.
 * Adapts between three modes based on user interaction:
 *
 * - **Ambient**: Minimal always-visible state (progress track + dots)
 * - **Engaged**: Expanded state showing labels (on hover/focus)
 * - **Command**: Quick jump overlay triggered by keyboard shortcut
 *
 * @example
 * ```tsx
 * <SectionNav
 *   sections={[
 *     { id: 'intro', label: 'Introduction', target: 'intro-section' },
 *     { id: 'features', label: 'Features', target: 'features-section' },
 *   ]}
 *   size="default"
 *   display="dots-only"
 *   position="right"
 * />
 * ```
 */
export function SectionNav({
  sections,
  position = 'right',
  behavior = 'fixed',
  size = 'default',
  display = 'dots-only',
  defaultMode = 'ambient',
  mode: controlledMode,
  onModeChange,
  showProgress = true,
  showDots = true,
  enableCommand = true,
  commandKey = 'j',
  autoHide = false,
  autoHideThreshold = 100,
  expandOnHover = true,
  expandDelay = 150,
  collapseDelay = 300,
  collapsible = false,
  defaultCollapsed = false,
  scrollSpyOptions = {},
  className,
  disabled = false,
  ariaLabel = 'Page sections',
  onSectionClick,
}: SectionNavProps) {
  const sizeConfig = getSizeConfig(size);

  // Mode state
  const [internalMode, setInternalMode] = useState<SectionNavMode>(defaultMode);
  const mode = controlledMode ?? internalMode;

  // Collapsed state
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [hoveredSectionId, setHoveredSectionId] = useState<string | null>(null);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const [isVisible, setIsVisible] = useState(!autoHide);

  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const collapseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setMode = useCallback(
    (newMode: SectionNavMode) => {
      if (controlledMode === undefined) {
        setInternalMode(newMode);
      }
      onModeChange?.(newMode);
    },
    [controlledMode, onModeChange],
  );

  // Scroll spy
  const { activeSectionId, visibilityMap, progress, scrollToSection } =
    useScrollSpy({
      sections,
      ...scrollSpyOptions,
    });

  // Calculate nav height
  const itemHeight =
    display === 'labels-only'
      ? sizeConfig.fontSize + sizeConfig.padding
      : sizeConfig.dotSizeActive;
  const navHeight =
    sections.length * (itemHeight + sizeConfig.dotGap) - sizeConfig.dotGap;

  const showLabelsInline =
    display === 'icons-and-labels' || display === 'labels-only';

  // Handle hover
  const handleNavMouseEnter = useCallback(() => {
    if (!expandOnHover || disabled || showLabelsInline) return;

    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setIsHoveringNav(true);
      if (mode === 'ambient') {
        setMode('engaged');
      }
    }, expandDelay);
  }, [expandOnHover, disabled, showLabelsInline, mode, setMode, expandDelay]);

  const handleNavMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    collapseTimeoutRef.current = setTimeout(() => {
      setIsHoveringNav(false);
      setHoveredSectionId(null);
      if (mode === 'engaged') {
        setMode('ambient');
      }
    }, collapseDelay);
  }, [mode, setMode, collapseDelay]);

  // Handle section click
  const handleSectionClick = useCallback(
    (sectionId: string) => {
      const section = sections.find((s) => s.id === sectionId);
      if (section) {
        onSectionClick?.(section);
      }
      scrollToSection(sectionId);
    },
    [sections, scrollToSection, onSectionClick],
  );

  // Auto-hide on scroll
  useEffect(() => {
    if (!autoHide) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY > autoHideThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [autoHide, autoHideThreshold]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (collapseTimeoutRef.current) clearTimeout(collapseTimeoutRef.current);
    };
  }, []);

  // Position classes
  const positionClasses = twMerge(
    behavior === 'fixed' && 'fixed',
    behavior === 'sticky' && 'sticky',
    behavior === 'absolute' && 'absolute',
    'top-1/2 -translate-y-1/2 z-40',
    position === 'left' ? 'left-4' : 'right-4',
  );

  if (sections.length === 0) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: position === 'left' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: position === 'left' ? -20 : 20 }}
          transition={SECTION_NAV_ANIMATIONS.springGentle}
          className={twMerge(
            positionClasses,
            'flex flex-col',
            display === 'labels-only' ? 'items-stretch' : 'items-center',
            SECTION_NAV_STYLES.container.base,
            'backdrop-blur-xl backdrop-saturate-150',
            'rounded-2xl',
            SECTION_NAV_STYLES.container.border,
            SECTION_NAV_STYLES.container.shadow,
            SECTION_NAV_STYLES.container.ring,
            disabled && 'opacity-50 pointer-events-none',
            className,
          )}
          style={{
            padding:
              display === 'labels-only' ? '12px 8px' : sizeConfig.padding,
            minWidth: display === 'labels-only' ? 180 : undefined,
            maxWidth: display === 'labels-only' ? 220 : undefined,
          }}
          onMouseEnter={handleNavMouseEnter}
          onMouseLeave={handleNavMouseLeave}
          aria-label={ariaLabel}
          role="navigation"
        >
          {/* Progress track */}
          {showProgress && !isCollapsed && (
            <div
              className={twMerge(
                'absolute rounded-full',
                SECTION_NAV_STYLES.progress.track,
                position === 'left' ? 'right-1' : 'left-1',
              )}
              style={{
                width: sizeConfig.trackWidth,
                height: navHeight,
                top: sizeConfig.padding,
              }}
            >
              <motion.div
                className={twMerge(
                  'w-full rounded-full',
                  SECTION_NAV_STYLES.progress.fill,
                )}
                initial={{ height: 0 }}
                animate={{ height: `${progress * 100}%` }}
                transition={SECTION_NAV_ANIMATIONS.springSmooth}
              />
            </div>
          )}

          {/* Section items */}
          {showDots && !isCollapsed && (
            <div
              className={twMerge(
                'flex flex-col',
                display === 'labels-only' ? 'w-full' : 'items-center',
              )}
              style={{ gap: display === 'labels-only' ? 2 : sizeConfig.dotGap }}
            >
              {sections.map((section) => {
                const isActive = section.id === activeSectionId;
                const isHovered = section.id === hoveredSectionId;
                const showLabel =
                  (mode === 'engaged' && (isHovered || isActive)) ||
                  showLabelsInline;

                if (display === 'labels-only') {
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => handleSectionClick(section.id)}
                      onMouseEnter={() => setHoveredSectionId(section.id)}
                      onMouseLeave={() => setHoveredSectionId(null)}
                      className={twMerge(
                        'flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-left',
                        'transition-all duration-150',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500/70',
                        isActive
                          ? SECTION_NAV_STYLES.label.activeButton
                          : isHovered
                            ? 'bg-bg-secondary text-text-primary'
                            : 'text-text-secondary hover:text-text-primary',
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {section.icon && (
                        <span
                          className={twMerge(
                            'flex-shrink-0',
                            isActive
                              ? 'text-white'
                              : 'text-text-muted dark:text-text-muted',
                          )}
                        >
                          {section.icon}
                        </span>
                      )}
                      <span
                        className={twMerge(
                          'truncate',
                          isActive && 'font-medium',
                        )}
                        style={{ fontSize: sizeConfig.fontSize }}
                      >
                        {section.label}
                      </span>
                    </button>
                  );
                }

                return (
                  <div
                    key={section.id}
                    className={twMerge(
                      'relative flex items-center',
                      display === 'icons-and-labels' && 'gap-2',
                    )}
                  >
                    {/* Label tooltip for dots-only and icons-only */}
                    {display !== 'icons-and-labels' && showLabel && (
                      <motion.span
                        initial={{
                          opacity: 0,
                          x: position === 'left' ? -8 : 8,
                        }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: position === 'left' ? -8 : 8 }}
                        className={twMerge(
                          'absolute whitespace-nowrap px-2 py-1 rounded-md text-xs font-medium',
                          'bg-bg-elevated border border-border-subtle shadow-lg',
                          isActive
                            ? 'text-text-primary'
                            : 'text-text-secondary',
                          position === 'left'
                            ? 'left-full ml-2'
                            : 'right-full mr-2',
                        )}
                        style={{ fontSize: sizeConfig.fontSize }}
                      >
                        {section.label}
                      </motion.span>
                    )}

                    {/* Dot/Icon */}
                    <button
                      type="button"
                      onClick={() => handleSectionClick(section.id)}
                      onMouseEnter={() => setHoveredSectionId(section.id)}
                      onMouseLeave={() => setHoveredSectionId(null)}
                      className={twMerge(
                        'flex items-center justify-center rounded-full transition-all duration-150',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500/70',
                        isActive
                          ? SECTION_NAV_STYLES.dot.active
                          : isHovered
                            ? SECTION_NAV_STYLES.dot.hover
                            : SECTION_NAV_STYLES.dot.inactive,
                      )}
                      style={{
                        width: isActive
                          ? sizeConfig.dotSizeActive
                          : isHovered
                            ? sizeConfig.dotSizeHovered
                            : sizeConfig.dotSize,
                        height: isActive
                          ? sizeConfig.dotSizeActive
                          : isHovered
                            ? sizeConfig.dotSizeHovered
                            : sizeConfig.dotSize,
                      }}
                      aria-label={section.label}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {(display === 'icons-only' ||
                        display === 'icons-and-labels') &&
                        section.icon && (
                          <span
                            className={twMerge(
                              'flex items-center justify-center',
                              isActive ? 'text-white' : '',
                            )}
                            style={{ fontSize: sizeConfig.iconSize }}
                          >
                            {section.icon}
                          </span>
                        )}
                    </button>

                    {/* Inline label for icons-and-labels */}
                    {display === 'icons-and-labels' && (
                      <span
                        className={twMerge(
                          'whitespace-nowrap transition-colors duration-150',
                          isActive
                            ? 'text-text-primary font-medium'
                            : 'text-text-muted',
                        )}
                        style={{ fontSize: sizeConfig.fontSize }}
                      >
                        {section.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Back to top button */}
          {progress > 0.15 && (
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={twMerge(
                'mt-2 flex items-center justify-center gap-1.5 w-full px-3 py-1.5 rounded-lg',
                'text-xs',
                SECTION_NAV_STYLES.button.base,
                'hover:bg-bg-secondary',
                'transition-colors duration-150',
              )}
            >
              <span>↑</span>
              <span>Back to top</span>
            </button>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default SectionNav;
