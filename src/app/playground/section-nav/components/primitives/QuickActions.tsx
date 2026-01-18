// src/app/playground/section-nav/components/primitives/QuickActions.tsx
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp, FiChevronDown, FiChevronUp, FiList } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import type { QuickAction, SectionNavMode, SectionNavSize } from '../types';
import { SECTION_NAV_ANIMATIONS, getSizeConfig } from '../types';

export interface QuickActionsProps {
  /** Current mode */
  mode: SectionNavMode;
  /** Whether expanded (engaged mode) */
  isExpanded: boolean;
  /** Toggle expand/collapse */
  onToggleExpand: () => void;
  /** Custom quick actions */
  actions?: QuickAction[];
  /** Whether at top of page (hides back-to-top) */
  isAtTop?: boolean;
  /** Scroll progress (shows back-to-top after threshold) */
  progress: number;
  /** Whether collapsible mode is enabled */
  collapsible?: boolean;
  /** Whether currently collapsed */
  isCollapsed?: boolean;
  /** Size variant */
  size?: SectionNavSize;
  /** Additional class name */
  className?: string;
}

/**
 * QuickActions - Utility buttons for the nav
 *
 * Default actions:
 * - Expand/Collapse toggle
 * - Back to top (when scrolled)
 *
 * Supports custom actions passed via props.
 */
export function QuickActions({
  mode,
  isExpanded,
  onToggleExpand,
  actions = [],
  isAtTop = false,
  progress,
  collapsible = false,
  isCollapsed = false,
  size = 'default',
  className,
}: QuickActionsProps) {
  const showBackToTop = progress > 0.15 && !isAtTop;
  const sizeConfig = getSizeConfig(size);

  const buttonSize =
    size === 'compact' ? 'w-6 h-6' : size === 'large' ? 'w-9 h-9' : 'w-7 h-7';
  const iconSize = size === 'compact' ? 10 : size === 'large' ? 16 : 14;
  const smallButtonSize =
    size === 'compact' ? 'w-5 h-5' : size === 'large' ? 'w-7 h-7' : 'w-6 h-6';
  const smallIconSize = size === 'compact' ? 10 : size === 'large' ? 14 : 12;

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If collapsed, show expand button
  if (collapsible && isCollapsed) {
    return (
      <motion.button
        type="button"
        onClick={onToggleExpand}
        className={cn(
          'flex items-center justify-center',
          buttonSize,
          'rounded-xl',
          'bg-gray-100/80 dark:bg-gray-800/60',
          'hover:bg-gray-200/80 dark:hover:bg-gray-700/60',
          'text-gray-600 dark:text-gray-300',
          'transition-colors duration-150',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70',
          className,
        )}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={SECTION_NAV_ANIMATIONS.springGentle}
        title="Expand navigation"
        aria-label="Expand navigation"
      >
        <FiList size={iconSize} />
      </motion.button>
    );
  }

  // In ambient mode, show subtle expand chevron
  if (mode === 'ambient' && !isExpanded) {
    return (
      <motion.button
        type="button"
        onClick={onToggleExpand}
        className={cn(
          'mt-2 flex items-center justify-center',
          smallButtonSize,
          'rounded-full',
          'bg-transparent hover:bg-gray-100/80 dark:hover:bg-gray-800/80',
          'text-gray-400 dark:text-gray-500',
          'transition-colors duration-150',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70',
          className,
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={SECTION_NAV_ANIMATIONS.springGentle}
        title="Expand navigation"
        aria-label="Expand navigation"
      >
        <FiChevronDown size={smallIconSize} />
      </motion.button>
    );
  }

  // In engaged/expanded mode, show all actions
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={SECTION_NAV_ANIMATIONS.springGentle}
      className={cn('flex flex-col items-center gap-1.5 mt-3', className)}
    >
      {/* Separator */}
      <div className="w-5 h-px bg-gray-200/80 dark:bg-gray-700/60 mb-1" />

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            onClick={handleBackToTop}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={SECTION_NAV_ANIMATIONS.springGentle}
            className={cn(
              'flex items-center justify-center',
              buttonSize,
              'rounded-xl',
              'bg-gray-100/80 dark:bg-gray-800/60',
              'hover:bg-gray-200/80 dark:hover:bg-gray-700/60',
              'text-gray-600 dark:text-gray-300',
              'transition-colors duration-150',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70',
            )}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            title="Back to top"
            aria-label="Scroll back to top"
          >
            <FiArrowUp size={iconSize} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Custom actions */}
      {actions.map((action) => (
        <motion.button
          key={action.id}
          type="button"
          onClick={action.onClick}
          disabled={action.enabled === false}
          className={cn(
            'flex items-center justify-center',
            buttonSize,
            'rounded-xl',
            'bg-gray-100/80 dark:bg-gray-800/60',
            'hover:bg-gray-200/80 dark:hover:bg-gray-700/60',
            'text-gray-600 dark:text-gray-300',
            'transition-colors duration-150',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70',
            action.enabled === false && 'opacity-40 cursor-not-allowed',
          )}
          whileHover={action.enabled !== false ? { scale: 1.03 } : undefined}
          whileTap={action.enabled !== false ? { scale: 0.97 } : undefined}
          transition={SECTION_NAV_ANIMATIONS.springGentle}
          title={action.label}
          aria-label={action.label}
        >
          {action.icon}
        </motion.button>
      ))}

      {/* Collapse button */}
      <motion.button
        type="button"
        onClick={onToggleExpand}
        className={cn(
          'flex items-center justify-center',
          smallButtonSize,
          'rounded-full',
          'bg-transparent hover:bg-gray-100/80 dark:hover:bg-gray-800/80',
          'text-gray-400 dark:text-gray-500',
          'transition-colors duration-150',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70',
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={SECTION_NAV_ANIMATIONS.springGentle}
        title={collapsible ? 'Collapse navigation' : 'Minimize'}
        aria-label={collapsible ? 'Collapse navigation' : 'Minimize'}
      >
        <FiChevronUp size={smallIconSize} />
      </motion.button>
    </motion.div>
  );
}

export default QuickActions;
