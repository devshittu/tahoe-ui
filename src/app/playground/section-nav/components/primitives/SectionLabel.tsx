// src/app/playground/section-nav/components/primitives/SectionLabel.tsx
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { SectionNavPosition, SectionNavSize } from '../types';
import { SECTION_NAV_ANIMATIONS, getSizeConfig } from '../types';

export interface SectionLabelProps {
  /** Label text */
  label: string;
  /** Whether to show the label */
  visible: boolean;
  /** Whether this is the active section */
  isActive: boolean;
  /** Position of the nav (determines label direction) */
  navPosition: SectionNavPosition;
  /** Size variant */
  size?: SectionNavSize;
  /** Additional class name */
  className?: string;
}

/**
 * SectionLabel - Animated label that appears on hover
 *
 * Features:
 * - Slides in from the appropriate direction
 * - Subtle arrow pointing to the dot
 * - Active state styling
 * - Smooth spring animation
 */
export function SectionLabel({
  label,
  visible,
  isActive,
  navPosition,
  size = 'default',
  className,
}: SectionLabelProps) {
  const isLeft = navPosition === 'left';
  const sizeConfig = getSizeConfig(size);
  const { labelOffset, fontSize } = sizeConfig;

  return (
    <AnimatePresence>
      {visible && (
        <motion.span
          initial={{
            opacity: 0,
            x: isLeft ? -8 : 8,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            x: isLeft ? -8 : 8,
            scale: 0.95,
          }}
          transition={SECTION_NAV_ANIMATIONS.spring}
          className={cn(
            'absolute whitespace-nowrap pointer-events-none',
            'px-3 py-1.5',
            // Position based on nav side
            isLeft ? 'left-full' : 'right-full',
            // Style
            isActive
              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200',
            'font-medium',
            'rounded-lg',
            'shadow-lg shadow-black/8 dark:shadow-black/25',
            'border',
            isActive
              ? 'border-gray-900 dark:border-white'
              : 'border-gray-200/80 dark:border-gray-700/80',
            className,
          )}
          style={{
            maxWidth: 'calc(100vw - 120px)',
            marginLeft: isLeft ? labelOffset : undefined,
            marginRight: isLeft ? undefined : labelOffset,
            fontSize,
          }}
        >
          {label}

          {/* Arrow pointing to dot */}
          <span
            className={cn(
              'absolute top-1/2 -translate-y-1/2',
              'w-2 h-2 rotate-45',
              isActive
                ? 'bg-gray-900 dark:bg-white'
                : 'bg-white dark:bg-gray-800 border-gray-200/80 dark:border-gray-700/80',
              // Position arrow on correct side
              isLeft
                ? '-left-1 border-l border-b border-gray-200/80 dark:border-gray-700/80'
                : '-right-1 border-r border-t border-gray-200/80 dark:border-gray-700/80',
              // Match border color when active
              isActive && 'border-gray-900 dark:border-white',
            )}
            aria-hidden="true"
          />
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export default SectionLabel;
