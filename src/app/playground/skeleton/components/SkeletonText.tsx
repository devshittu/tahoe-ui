// src/app/playground/skeleton/components/SkeletonText.tsx

'use client';

import { forwardRef } from 'react';
import { Skeleton } from './Skeleton';
import {
  SkeletonTextProps,
  SKELETON_TEXT_HEIGHT,
  SKELETON_TEXT_GAP,
} from './types';

/**
 * SkeletonText - Convenience component for text placeholders
 *
 * Renders multiple skeleton lines with the last line shorter
 * for a more natural paragraph appearance.
 *
 * @example
 * ```tsx
 * <SkeletonText lines={3} />
 * ```
 */
export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  function SkeletonText(
    {
      lines = 3,
      lastLineWidth = '75%',
      height = SKELETON_TEXT_HEIGHT,
      lineGap = SKELETON_TEXT_GAP,
      animation = 'pulse',
      ...props
    },
    ref,
  ) {
    if (lines === 1) {
      return (
        <Skeleton
          ref={ref}
          variant="text"
          height={height}
          animation={animation}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        className="flex flex-col"
        style={{ gap: typeof lineGap === 'number' ? `${lineGap}px` : lineGap }}
      >
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            height={height}
            width={index === lines - 1 ? lastLineWidth : '100%'}
            animation={animation}
            {...props}
          />
        ))}
      </div>
    );
  },
);

SkeletonText.displayName = 'SkeletonText';
