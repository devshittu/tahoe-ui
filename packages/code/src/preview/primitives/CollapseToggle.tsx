'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import type { CollapseToggleProps } from '../types';
import {
  getSizeConfig,
  CODE_PREVIEW_ANIMATIONS,
  CODE_PREVIEW_STYLES,
} from '../types';

// Simple chevron icon
const ChevronIcon = ({
  size,
  direction,
}: {
  size: number;
  direction: 'up' | 'down';
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform: direction === 'up' ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease',
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/**
 * CollapseToggle - Toggle button for collapsible code blocks
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
    <motion.button
      type="button"
      onClick={onToggle}
      className={twMerge(
        'flex items-center gap-1.5',
        'text-sm font-medium',
        CODE_PREVIEW_STYLES.collapseToggle.base,
        CODE_PREVIEW_STYLES.collapseToggle.hover,
        'transition-colors duration-150',
        'focus:outline-none focus-visible:underline',
        className,
      )}
      whileHover={{ x: 2 }}
      transition={CODE_PREVIEW_ANIMATIONS.fast}
      aria-expanded={!isCollapsed}
      aria-label={
        isCollapsed
          ? `Show ${hiddenLinesCount} more lines`
          : 'Collapse code block'
      }
    >
      <span className={CODE_PREVIEW_STYLES.collapseToggle.icon}>
        <ChevronIcon
          size={sizeConfig.iconSize}
          direction={isCollapsed ? 'down' : 'up'}
        />
      </span>
      <span>
        {isCollapsed
          ? `Show ${hiddenLinesCount} more line${hiddenLinesCount !== 1 ? 's' : ''}`
          : 'Show less'}
      </span>
    </motion.button>
  );
}

export default CollapseToggle;
