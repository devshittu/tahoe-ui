// src/app/playground/code-preview/components/primitives/CollapseToggle.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import type { CollapseToggleProps } from '../types';
import { getSizeConfig, CODE_PREVIEW_ANIMATIONS } from '../types';

/**
 * CollapseToggle - Expand/collapse button for code blocks
 *
 * Apple-like design:
 * - Gradient fade to indicate more content
 * - Centered action button
 * - Shows hidden line count
 */
export function CollapseToggle({
  isCollapsed,
  onToggle,
  hiddenLinesCount = 0,
  size = 'default',
  className,
}: CollapseToggleProps) {
  const sizeConfig = getSizeConfig(size);

  return (
    <div
      className={cn(
        'relative w-full',
        isCollapsed && 'mt-0',
        !isCollapsed && 'mt-2',
        className,
      )}
    >
      {/* Gradient fade overlay when collapsed */}
      {isCollapsed && (
        <div
          className={cn(
            'absolute -top-12 left-0 right-0 h-12',
            'bg-gradient-to-t from-white dark:from-gray-900 to-transparent',
            'pointer-events-none',
          )}
        />
      )}

      {/* Toggle button */}
      <motion.button
        type="button"
        onClick={onToggle}
        className={cn(
          'w-full flex items-center justify-center gap-2',
          'py-2 px-4',
          'rounded-lg',
          // Background
          'bg-gray-50/80 dark:bg-gray-800/50',
          'hover:bg-gray-100/80 dark:hover:bg-gray-700/50',
          // Border
          'border border-gray-200/50 dark:border-gray-700/50',
          // Text
          'text-gray-600 dark:text-gray-400',
          'text-sm font-medium',
          // Focus
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50',
          'transition-colors duration-150',
        )}
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
        transition={CODE_PREVIEW_ANIMATIONS.springGentle}
        aria-expanded={!isCollapsed}
        aria-label={isCollapsed ? 'Expand code' : 'Collapse code'}
      >
        <motion.span
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={CODE_PREVIEW_ANIMATIONS.spring}
        >
          <FiChevronDown size={sizeConfig.iconSize} />
        </motion.span>
        <span>
          {isCollapsed
            ? `Show ${hiddenLinesCount > 0 ? `${hiddenLinesCount} more lines` : 'more'}`
            : 'Show less'}
        </span>
      </motion.button>
    </div>
  );
}

export default CollapseToggle;
