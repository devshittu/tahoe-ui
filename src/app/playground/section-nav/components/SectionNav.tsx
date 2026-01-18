// src/app/playground/section-nav/components/SectionNav.tsx
'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useScrollSpy } from './useScrollSpy';
import {
  ProgressTrack,
  SectionDot,
  SectionLabel,
  QuickActions,
  CommandOverlay,
} from './primitives';
import type { SectionNavProps, SectionNavMode } from './types';
import { SECTION_NAV_ANIMATIONS, getSizeConfig } from './types';

/**
 * SectionNav - Adaptive section navigation component
 *
 * A thoughtfully designed navigation component for long-scroll pages.
 * Adapts between three modes based on user interaction:
 *
 * - **Ambient**: Minimal always-visible state (progress track + dots)
 * - **Engaged**: Expanded state showing labels (on hover/focus)
 * - **Command**: Quick jump overlay triggered by ⌘+key
 *
 * Supports multiple display modes:
 * - dots-only: Traditional dot indicators (labels on hover)
 * - icons-only: Show icons for all items
 * - icons-and-labels: Always show icons and labels
 * - labels-only: Vertical text list
 *
 * @example
 * ```tsx
 * <SectionNav
 *   sections={sections}
 *   size="default"
 *   display="icons-only"
 *   position="right"
 *   collapsible
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
  quickActions = [],
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

  // Mode state (controlled or uncontrolled)
  const [internalMode, setInternalMode] = useState<SectionNavMode>(defaultMode);
  const mode = controlledMode ?? internalMode;

  // Collapsed state for collapsible mode
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const setMode = useCallback(
    (newMode: SectionNavMode) => {
      if (controlledMode === undefined) {
        setInternalMode(newMode);
      }
      onModeChange?.(newMode);
    },
    [controlledMode, onModeChange],
  );

  // Hover state for engaged mode
  const [hoveredSectionId, setHoveredSectionId] = useState<string | null>(null);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const collapseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Visibility state for auto-hide
  const [isVisible, setIsVisible] = useState(!autoHide);
  const lastScrollY = useRef(0);

  // Reduced motion preference
  const prefersReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)',
  );

  // Scroll spy
  const { activeSectionId, visibilityMap, progress, scrollToSection } =
    useScrollSpy({
      sections,
      ...scrollSpyOptions,
      onSectionChange: (section, previous) => {
        scrollSpyOptions.onSectionChange?.(section, previous);
      },
    });

  // Command mode state
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Calculate nav height based on sections and display mode
  const itemHeight =
    display === 'labels-only'
      ? sizeConfig.fontSize + sizeConfig.padding
      : sizeConfig.dotSizeActive;
  const navHeight =
    sections.length * (itemHeight + sizeConfig.dotGap) - sizeConfig.dotGap;

  // Determine if we should show labels inline (icons-and-labels or labels-only mode)
  const showLabelsInline =
    display === 'icons-and-labels' || display === 'labels-only';

  // Handle hover enter
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

  // Handle hover leave
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

  // Handle toggle expand (from quick actions)
  const handleToggleExpand = useCallback(() => {
    if (collapsible) {
      setIsCollapsed((prev) => !prev);
    } else if (mode === 'ambient') {
      setMode('engaged');
    } else if (mode === 'engaged') {
      setMode('ambient');
    }
  }, [collapsible, mode, setMode]);

  // Handle command mode
  const openCommand = useCallback(() => {
    if (!enableCommand || disabled) return;
    setIsCommandOpen(true);
    setMode('command');
  }, [enableCommand, disabled, setMode]);

  const closeCommand = useCallback(() => {
    setIsCommandOpen(false);
    setMode('ambient');
  }, [setMode]);

  // Keyboard shortcut for command mode
  useEffect(() => {
    if (!enableCommand || disabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key.toLowerCase() === commandKey.toLowerCase()
      ) {
        e.preventDefault();
        if (isCommandOpen) {
          closeCommand();
        } else {
          openCommand();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    enableCommand,
    disabled,
    commandKey,
    isCommandOpen,
    openCommand,
    closeCommand,
  ]);

  // Auto-hide on scroll
  useEffect(() => {
    if (!autoHide) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > autoHideThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      lastScrollY.current = currentScrollY;
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
  const positionClasses = cn(
    behavior === 'fixed' && 'fixed',
    behavior === 'sticky' && 'sticky',
    behavior === 'absolute' && 'absolute',
    'top-1/2 -translate-y-1/2 z-40',
    position === 'left' ? 'left-4' : 'right-4',
  );

  // Don't render if no sections or disabled
  if (sections.length === 0) return null;

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ opacity: 0, x: position === 'left' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: position === 'left' ? -20 : 20 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.1 }
                : SECTION_NAV_ANIMATIONS.springGentle
            }
            className={cn(
              positionClasses,
              'flex flex-col',
              display === 'labels-only' ? 'items-stretch' : 'items-center',
              // Glassmorphism background
              'bg-white/80 dark:bg-gray-900/80',
              'backdrop-blur-xl backdrop-saturate-150',
              // Border and shadow
              'rounded-2xl',
              'border border-gray-200/60 dark:border-gray-700/50',
              'shadow-xl shadow-black/5 dark:shadow-black/30',
              // Subtle inner glow
              'ring-1 ring-white/50 dark:ring-white/5 ring-inset',
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
              <ProgressTrack
                progress={progress}
                height={navHeight}
                position={position}
                size={size}
              />
            )}

            {/* Section items - LABELS ONLY MODE */}
            {display === 'labels-only' && showDots && !isCollapsed && (
              <div className="flex flex-col w-full" style={{ gap: 2 }}>
                {sections.map((section) => {
                  const isActive = section.id === activeSectionId;
                  const isHovered = section.id === hoveredSectionId;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => handleSectionClick(section.id)}
                      onMouseEnter={() => setHoveredSectionId(section.id)}
                      onMouseLeave={() => setHoveredSectionId(null)}
                      className={cn(
                        'flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-left',
                        'transition-all duration-150',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70',
                        isActive
                          ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                          : isHovered
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {section.icon && (
                        <span
                          className={cn(
                            'flex-shrink-0',
                            isActive
                              ? 'text-white dark:text-gray-900'
                              : 'text-gray-400 dark:text-gray-500',
                          )}
                        >
                          {section.icon}
                        </span>
                      )}
                      <span
                        className={cn('truncate', isActive && 'font-medium')}
                        style={{ fontSize: sizeConfig.fontSize }}
                      >
                        {section.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Section items - OTHER DISPLAY MODES */}
            <AnimatePresence>
              {display !== 'labels-only' && showDots && !isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={SECTION_NAV_ANIMATIONS.spring}
                  className="flex flex-col items-center relative"
                  style={{ gap: sizeConfig.dotGap }}
                >
                  {sections.map((section, index) => {
                    const visibility = visibilityMap.get(section.id);
                    const isActive = section.id === activeSectionId;
                    const isHovered = section.id === hoveredSectionId;
                    const showLabel =
                      (mode === 'engaged' && (isHovered || isActive)) ||
                      display === 'icons-and-labels';

                    return (
                      <div
                        key={section.id}
                        className={cn(
                          'relative flex items-center',
                          display === 'icons-and-labels' && 'gap-2',
                        )}
                      >
                        {/* Label popup (dots-only and icons-only modes) */}
                        {display !== 'icons-and-labels' && (
                          <SectionLabel
                            label={section.label}
                            visible={showLabel}
                            isActive={isActive}
                            navPosition={position}
                            size={size}
                          />
                        )}

                        {/* Dot/Icon item */}
                        <SectionDot
                          section={section}
                          isActive={isActive}
                          isHovered={isHovered}
                          position={visibility?.position}
                          onClick={() => handleSectionClick(section.id)}
                          onMouseEnter={() => setHoveredSectionId(section.id)}
                          onMouseLeave={() => setHoveredSectionId(null)}
                          index={index}
                          size={size}
                          display={display}
                        />

                        {/* Inline label for icons-and-labels mode */}
                        {display === 'icons-and-labels' && (
                          <span
                            className={cn(
                              'whitespace-nowrap transition-colors duration-150',
                              isActive
                                ? 'text-gray-900 dark:text-white font-medium'
                                : 'text-gray-500 dark:text-gray-400',
                            )}
                            style={{ fontSize: sizeConfig.fontSize }}
                          >
                            {section.label}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick actions - hide expand/collapse for labels-only since it's always expanded */}
            {display !== 'labels-only' && (
              <QuickActions
                mode={mode}
                isExpanded={mode === 'engaged' || showLabelsInline}
                onToggleExpand={handleToggleExpand}
                actions={quickActions}
                progress={progress}
                collapsible={collapsible}
                isCollapsed={isCollapsed}
                size={size}
              />
            )}

            {/* Minimal actions for labels-only mode */}
            {display === 'labels-only' && progress > 0.15 && (
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={cn(
                  'mt-2 flex items-center justify-center gap-1.5 w-full px-3 py-1.5 rounded-lg',
                  'text-xs text-gray-500 dark:text-gray-400',
                  'hover:bg-gray-100 dark:hover:bg-gray-800',
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

      {/* Command overlay */}
      {enableCommand && (
        <CommandOverlay
          isOpen={isCommandOpen}
          onClose={closeCommand}
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

export default SectionNav;
