// src/app/playground/section-nav/components/primitives/ProgressTrack.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { SectionNavSize } from '../types';
import { SECTION_NAV_ANIMATIONS, getSizeConfig } from '../types';

export interface ProgressTrackProps {
  /** Progress value (0-1) */
  progress: number;
  /** Total height of the track */
  height: number;
  /** Position relative to dots */
  position: 'left' | 'right';
  /** Size variant */
  size?: SectionNavSize;
  /** Additional class name */
  className?: string;
}

/**
 * ProgressTrack - Visual scroll progress indicator
 *
 * Shows overall scroll progress through all sections.
 * The filled portion grows smoothly as user scrolls down.
 */
export function ProgressTrack({
  progress,
  height,
  position,
  size = 'default',
  className,
}: ProgressTrackProps) {
  const sizeConfig = getSizeConfig(size);
  const { trackWidth } = sizeConfig;
  const clampedProgress = Math.max(0, Math.min(1, progress));

  return (
    <div
      className={cn(
        'absolute top-1/2 -translate-y-1/2',
        position === 'left' ? '-left-3' : '-right-3',
        className,
      )}
      style={{ height, width: trackWidth }}
      aria-hidden="true"
    >
      {/* Background track */}
      <div
        className={cn(
          'absolute inset-0',
          'bg-gray-200/80 dark:bg-gray-700/60',
          'rounded-full',
        )}
      />

      {/* Filled progress - animate height for smoothness */}
      <motion.div
        className={cn(
          'absolute left-0 right-0 top-0',
          'bg-gradient-to-b from-gray-700 to-gray-900 dark:from-gray-200 dark:to-white',
          'rounded-full',
        )}
        initial={{ height: 0 }}
        animate={{ height: clampedProgress * height }}
        transition={SECTION_NAV_ANIMATIONS.springSmooth}
      />

      {/* Progress indicator dot at current position */}
      <motion.div
        className={cn(
          'absolute left-1/2 -translate-x-1/2',
          'rounded-full',
          'bg-gray-900 dark:bg-white',
          'shadow-sm shadow-gray-900/20 dark:shadow-white/20',
        )}
        style={{
          width: trackWidth + 2,
          height: trackWidth + 2,
        }}
        initial={{ top: 0, opacity: 0 }}
        animate={{
          top: Math.max(0, clampedProgress * height - (trackWidth + 2) / 2),
          opacity: clampedProgress > 0.02 ? 1 : 0,
        }}
        transition={SECTION_NAV_ANIMATIONS.springSmooth}
      />
    </div>
  );
}

export default ProgressTrack;
