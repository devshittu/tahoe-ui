// src/app/playground/skeleton/components/Skeleton.tsx

'use client';

import { forwardRef, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  SkeletonProps,
  SKELETON_VARIANT_CONFIG,
  SKELETON_ANIMATION_CONFIG,
  SKELETON_TEXT_HEIGHT,
  SKELETON_TEXT_GAP,
} from './types';

/**
 * Skeleton - Content placeholder for loading states
 *
 * Design Principles Applied:
 * - #6 Purposeful Motion: Subtle shimmer animation
 * - #12 Accessibility: Respects prefers-reduced-motion
 * - #18 Thoughtful Loading States: Content-shaped placeholders
 *
 * Features:
 * - Four shape variants (text, circular, rectangular, rounded)
 * - Two animation types (pulse, wave) + none
 * - Configurable dimensions
 * - Multi-line text support
 * - Respects prefers-reduced-motion
 * - Dark mode support
 *
 * @example
 * ```tsx
 * // Basic skeleton
 * <Skeleton width={200} height={20} />
 *
 * // Avatar placeholder
 * <Skeleton variant="circular" width={40} height={40} />
 *
 * // Text lines
 * <Skeleton variant="text" lines={3} />
 * ```
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    {
      variant = 'rectangular',
      animation = 'pulse',
      width,
      height,
      radius,
      lines = 1,
      lineGap = SKELETON_TEXT_GAP,
      className,
      style,
      ...props
    },
    ref,
  ) {
    const shouldReduceMotion = useReducedMotion();
    const variantConfig = SKELETON_VARIANT_CONFIG[variant];

    // Resolve dimensions
    const resolvedWidth = useMemo(() => {
      if (width !== undefined) {
        return typeof width === 'number' ? `${width}px` : width;
      }
      if (variant === 'circular') return '40px';
      return '100%';
    }, [width, variant]);

    const resolvedHeight = useMemo(() => {
      if (height !== undefined) {
        return typeof height === 'number' ? `${height}px` : height;
      }
      if (variant === 'circular') return '40px';
      if (variant === 'text') return `${SKELETON_TEXT_HEIGHT}px`;
      return '100px';
    }, [height, variant]);

    const resolvedRadius = useMemo(() => {
      if (radius !== undefined) {
        return typeof radius === 'number' ? `${radius}px` : radius;
      }
      return undefined;
    }, [radius]);

    const resolvedGap = useMemo(() => {
      return typeof lineGap === 'number' ? `${lineGap}px` : lineGap;
    }, [lineGap]);

    // Determine effective animation
    const effectiveAnimation = shouldReduceMotion ? 'none' : animation;

    // Animation variants
    const pulseAnimation =
      effectiveAnimation === 'pulse'
        ? {
            opacity: [1, 0.5, 1],
          }
        : undefined;

    const waveAnimation =
      effectiveAnimation === 'wave'
        ? {
            backgroundPosition: ['200% 0', '-200% 0'],
          }
        : undefined;

    // Render single skeleton element
    const renderSkeleton = (key?: number, isLast?: boolean) => (
      <motion.div
        key={key}
        ref={key === undefined ? ref : undefined}
        className={cn(
          // Base styles
          'bg-gray-200 dark:bg-gray-700',

          // Border radius
          !resolvedRadius && variantConfig.radius,

          // Wave animation gradient
          effectiveAnimation === 'wave' &&
            'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%]',

          className,
        )}
        style={{
          width: isLast && variant === 'text' ? '75%' : resolvedWidth,
          height: resolvedHeight,
          borderRadius: resolvedRadius,
          aspectRatio: variantConfig.aspectRatio,
          ...style,
        }}
        animate={pulseAnimation || waveAnimation}
        transition={
          effectiveAnimation !== 'none'
            ? {
                duration:
                  effectiveAnimation === 'pulse'
                    ? SKELETON_ANIMATION_CONFIG.pulseDuration
                    : SKELETON_ANIMATION_CONFIG.waveDuration,
                repeat: Infinity,
                ease: SKELETON_ANIMATION_CONFIG.easing,
              }
            : undefined
        }
        aria-hidden="true"
      />
    );

    // Text variant with multiple lines
    if (variant === 'text' && lines > 1) {
      return (
        <div
          ref={ref}
          className={cn('flex flex-col', className)}
          style={{ gap: resolvedGap }}
          aria-hidden="true"
        >
          {Array.from({ length: lines }).map((_, index) =>
            renderSkeleton(index, index === lines - 1),
          )}
        </div>
      );
    }

    return renderSkeleton();
  },
);

Skeleton.displayName = 'Skeleton';
