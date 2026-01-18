// src/app/playground/skeleton/components/SkeletonAvatar.tsx

'use client';

import { forwardRef, useMemo } from 'react';
import { Skeleton } from './Skeleton';
import { SkeletonAvatarProps, SKELETON_AVATAR_SIZES } from './types';

/**
 * SkeletonAvatar - Convenience component for avatar placeholders
 *
 * Renders a circular skeleton with preset sizes.
 *
 * @example
 * ```tsx
 * <SkeletonAvatar size="md" />
 * <SkeletonAvatar size={64} />
 * ```
 */
export const SkeletonAvatar = forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  function SkeletonAvatar({ size = 'md', animation = 'pulse', ...props }, ref) {
    const resolvedSize = useMemo(() => {
      if (typeof size === 'number') return size;
      return SKELETON_AVATAR_SIZES[size];
    }, [size]);

    return (
      <Skeleton
        ref={ref}
        variant="circular"
        width={resolvedSize}
        height={resolvedSize}
        animation={animation}
        {...props}
      />
    );
  },
);

SkeletonAvatar.displayName = 'SkeletonAvatar';
