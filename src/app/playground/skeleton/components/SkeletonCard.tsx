// src/app/playground/skeleton/components/SkeletonCard.tsx

'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from './Skeleton';
import { SkeletonAvatar } from './SkeletonAvatar';
import { SkeletonText } from './SkeletonText';
import { SkeletonCardProps } from './types';

/**
 * SkeletonCard - Compound skeleton for card layouts
 *
 * Pre-composed skeleton that mimics common card patterns
 * with optional avatar, image, and text lines.
 *
 * @example
 * ```tsx
 * <SkeletonCard hasAvatar hasImage lines={2} />
 * ```
 */
export const SkeletonCard = forwardRef<HTMLDivElement, SkeletonCardProps>(
  function SkeletonCard(
    {
      hasAvatar = true,
      hasImage = false,
      lines = 2,
      animation = 'pulse',
      className,
      ...props
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'p-4 rounded-xl',
          'bg-white dark:bg-gray-900',
          'border border-gray-200 dark:border-gray-800',
          className,
        )}
        {...props}
      >
        {/* Header with avatar */}
        {hasAvatar && (
          <div className="flex items-center gap-3 mb-4">
            <SkeletonAvatar size="md" animation={animation} />
            <div className="flex-1 space-y-2">
              <Skeleton
                variant="text"
                width="60%"
                height={14}
                animation={animation}
              />
              <Skeleton
                variant="text"
                width="40%"
                height={12}
                animation={animation}
              />
            </div>
          </div>
        )}

        {/* Image placeholder */}
        {hasImage && (
          <Skeleton
            variant="rounded"
            width="100%"
            height={160}
            className="mb-4"
            animation={animation}
          />
        )}

        {/* Text content */}
        {lines > 0 && <SkeletonText lines={lines} animation={animation} />}
      </div>
    );
  },
);

SkeletonCard.displayName = 'SkeletonCard';
