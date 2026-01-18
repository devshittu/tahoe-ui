// src/app/playground/section-nav/components/primitives/SectionDot.tsx
'use client';

import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { SectionItem, SectionNavSize, SectionNavDisplay } from '../types';
import { SECTION_NAV_ANIMATIONS, getSizeConfig } from '../types';

export interface SectionDotProps {
  /** Section data */
  section: SectionItem;
  /** Whether this section is currently active */
  isActive: boolean;
  /** Whether this dot is being hovered */
  isHovered: boolean;
  /** Position relative to viewport */
  position?: 'above' | 'visible' | 'below';
  /** Click handler */
  onClick: () => void;
  /** Mouse enter handler */
  onMouseEnter: () => void;
  /** Mouse leave handler */
  onMouseLeave: () => void;
  /** Index for staggered animations */
  index: number;
  /** Size variant */
  size?: SectionNavSize;
  /** Display mode */
  display?: SectionNavDisplay;
  /** Additional class name */
  className?: string;
}

/**
 * SectionDot - Individual section indicator
 *
 * Visual states:
 * - Default: Small neutral dot
 * - Hovered: Slightly larger with subtle glow
 * - Active: Large dot with icon, prominent styling
 * - Position-aware: Subtle opacity for above/below sections
 *
 * Display modes:
 * - dots-only: Traditional dot indicators
 * - icons-only: Show icons for all items
 * - icons-and-labels: Full display
 * - labels-only: Text-based list
 */
export const SectionDot = forwardRef<HTMLButtonElement, SectionDotProps>(
  function SectionDot(
    {
      section,
      isActive,
      isHovered,
      position = 'visible',
      onClick,
      onMouseEnter,
      onMouseLeave,
      index,
      size = 'default',
      display = 'dots-only',
      className,
    },
    ref,
  ) {
    const sizeConfig = getSizeConfig(size);
    const { dotSize, dotSizeActive, dotSizeHovered, iconSize } = sizeConfig;

    // For icons-only and icons-and-labels, show icons even when not active
    const showIconAlways =
      display === 'icons-only' || display === 'icons-and-labels';

    // Use consistent size for icons-and-labels mode to maintain alignment
    const consistentIconSize = dotSizeActive;

    // Calculate current size based on state and display mode
    const currentSize =
      display === 'icons-and-labels'
        ? consistentIconSize // Always same size for alignment
        : isActive
          ? dotSizeActive
          : showIconAlways && section.icon
            ? dotSizeHovered + 4
            : isHovered
              ? dotSizeHovered
              : dotSize;

    // Subtle opacity based on position (helps show scroll direction)
    const positionOpacity =
      position === 'above' ? 0.4 : position === 'below' ? 0.6 : 1;

    // Labels-only mode - clean sidebar-style navigation
    if (display === 'labels-only') {
      return (
        <motion.button
          ref={ref}
          type="button"
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={cn(
            'relative flex items-center gap-2.5 w-full',
            'px-3 py-2',
            'text-left',
            'transition-all duration-150',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-inset',
            'rounded-lg',
            isActive
              ? 'bg-gray-900 dark:bg-white'
              : isHovered
                ? 'bg-gray-100 dark:bg-gray-800'
                : 'bg-transparent',
            className,
          )}
          initial={false}
          animate={{ opacity: isActive ? 1 : positionOpacity }}
          whileTap={{ scale: 0.98 }}
          transition={SECTION_NAV_ANIMATIONS.springGentle}
          aria-label={section.label}
          aria-current={isActive ? 'true' : undefined}
        >
          {/* Icon */}
          {section.icon && (
            <span
              className={cn(
                'flex-shrink-0 transition-colors duration-150',
                isActive
                  ? 'text-white dark:text-gray-900'
                  : 'text-gray-400 dark:text-gray-500',
              )}
              style={{ fontSize: iconSize }}
            >
              {section.icon}
            </span>
          )}

          {/* Label */}
          <span
            className={cn(
              'flex-1 truncate transition-colors duration-150',
              isActive
                ? 'text-white dark:text-gray-900 font-medium'
                : 'text-gray-700 dark:text-gray-300',
            )}
            style={{ fontSize: sizeConfig.fontSize }}
          >
            {section.label}
          </span>

          {/* Active dot indicator */}
          {isActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-gray-900 flex-shrink-0" />
          )}
        </motion.button>
      );
    }

    return (
      <motion.button
        ref={ref}
        type="button"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={cn(
          'relative flex items-center justify-center',
          'rounded-full',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70',
          'focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900',
          'cursor-pointer',
          'transition-shadow duration-200',
          className,
        )}
        initial={false}
        animate={{
          width: currentSize,
          height: currentSize,
          opacity: isActive ? 1 : positionOpacity,
        }}
        whileTap={{ scale: 0.96 }}
        transition={SECTION_NAV_ANIMATIONS.springSmooth}
        aria-label={section.label}
        aria-current={isActive ? 'true' : undefined}
        title={section.label}
      >
        {/* Background layer with color transition */}
        <motion.span
          className={cn(
            'absolute inset-0 rounded-full transition-colors duration-200',
            isActive
              ? 'bg-gray-900 dark:bg-white shadow-lg shadow-gray-900/20 dark:shadow-white/10'
              : showIconAlways && section.icon
                ? 'bg-gray-200 dark:bg-gray-700'
                : isHovered
                  ? 'bg-gray-400 dark:bg-gray-500'
                  : 'bg-gray-300 dark:bg-gray-600',
          )}
          initial={false}
          animate={{
            scale: isHovered && !isActive ? 1.05 : 1,
          }}
          transition={SECTION_NAV_ANIMATIONS.springGentle}
        />

        {/* Icon - shown when active OR when display mode shows icons */}
        <AnimatePresence>
          {(isActive || showIconAlways) && section.icon && (
            <motion.span
              key="icon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={SECTION_NAV_ANIMATIONS.springGentle}
              className={cn(
                'relative z-10 flex items-center justify-center',
                isActive
                  ? 'text-white dark:text-gray-900'
                  : 'text-gray-600 dark:text-gray-300',
              )}
              style={{ fontSize: isActive ? iconSize : iconSize - 2 }}
            >
              {section.icon}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Hover ring effect */}
        <AnimatePresence>
          {isHovered && !isActive && (
            <motion.span
              className="absolute inset-0 rounded-full ring-2 ring-gray-400/30 dark:ring-gray-500/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={SECTION_NAV_ANIMATIONS.fast}
            />
          )}
        </AnimatePresence>
      </motion.button>
    );
  },
);

export default SectionDot;
