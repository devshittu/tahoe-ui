// src/app/playground/progress-bar/components/ProgressBar.tsx

'use client';

import { forwardRef, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  ProgressBarProps,
  PROGRESS_SIZE_CONFIG,
  PROGRESS_COLOR_CONFIG,
  PROGRESS_ANIMATION_CONFIG,
  defaultLabelFormat,
} from './types';

/**
 * ProgressBar - Visual indicator for task completion or loading
 *
 * Design Principles Applied:
 * - #2 Visual Hierarchy Through Restraint: Semantic colors
 * - #3 Intentional White Space: 8pt grid heights
 * - #6 Purposeful Motion: Smooth value transitions, respect reduced motion
 * - #12 Accessibility: Full ARIA progressbar pattern
 * - #18 Thoughtful Loading States: Indeterminate for unknown duration
 *
 * Features:
 * - Determinate (0-100%) and indeterminate modes
 * - Five color options
 * - Three sizes
 * - Optional percentage label
 * - Striped and animated variants
 * - Respects prefers-reduced-motion
 * - Full ARIA progressbar semantics
 *
 * @example
 * ```tsx
 * // Determinate progress
 * <ProgressBar value={75} />
 *
 * // Indeterminate loading
 * <ProgressBar indeterminate color="primary" />
 *
 * // With label
 * <ProgressBar value={45} showLabel />
 * ```
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  function ProgressBar(
    {
      value = 0,
      max = 100,
      indeterminate = false,
      color = 'primary',
      size = 'md',
      showLabel = false,
      labelFormat = defaultLabelFormat,
      striped = false,
      animated = false,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) {
    const shouldReduceMotion = useReducedMotion();
    const sizeConfig = PROGRESS_SIZE_CONFIG[size];
    const colorConfig = PROGRESS_COLOR_CONFIG[color];

    // Clamp value between 0 and max
    const clampedValue = useMemo(
      () => Math.min(Math.max(0, value), max),
      [value, max],
    );

    // Calculate percentage
    const percentage = useMemo(
      () => (clampedValue / max) * 100,
      [clampedValue, max],
    );

    // Determine if animations should run
    const enableAnimation = !shouldReduceMotion && (animated || indeterminate);

    return (
      <div className={cn('w-full', className)}>
        {/* Label */}
        {showLabel && !indeterminate && (
          <div className="flex justify-between items-center mb-1">
            <span
              className={cn(
                sizeConfig.labelSize,
                colorConfig.label,
                'font-medium',
              )}
            >
              {labelFormat(clampedValue, max)}
            </span>
          </div>
        )}

        {/* Progress track */}
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : clampedValue}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={ariaLabel || (indeterminate ? 'Loading' : 'Progress')}
          className={cn(
            'relative overflow-hidden',
            sizeConfig.height,
            sizeConfig.radius,
            colorConfig.track,
          )}
          {...props}
        >
          {indeterminate ? (
            // Indeterminate animation
            <motion.div
              className={cn(
                'absolute inset-y-0 w-1/3',
                sizeConfig.radius,
                colorConfig.fill,
              )}
              initial={{ x: '-100%' }}
              animate={
                enableAnimation
                  ? { x: ['calc(-100%)', 'calc(400%)'] }
                  : undefined
              }
              transition={
                enableAnimation
                  ? {
                      duration: PROGRESS_ANIMATION_CONFIG.indeterminateDuration,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
                  : undefined
              }
            />
          ) : (
            // Determinate progress fill
            <motion.div
              className={cn(
                'h-full',
                sizeConfig.radius,
                colorConfig.fill,
                // Striped pattern
                striped &&
                  'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:20px_100%]',
              )}
              initial={false}
              animate={{ width: `${percentage}%` }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : PROGRESS_ANIMATION_CONFIG.spring
              }
              style={
                enableAnimation && striped
                  ? {
                      animation: `progress-stripe ${PROGRESS_ANIMATION_CONFIG.stripeDuration}s linear infinite`,
                    }
                  : undefined
              }
            />
          )}
        </div>

        {/* Inline styles for stripe animation (scoped) */}
        {enableAnimation && striped && (
          <style jsx global>{`
            @keyframes progress-stripe {
              from {
                background-position: 20px 0;
              }
              to {
                background-position: 0 0;
              }
            }
          `}</style>
        )}
      </div>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';
