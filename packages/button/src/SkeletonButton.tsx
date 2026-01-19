'use client';

import React from 'react';
import { cn } from '@tahoe-ui/core';
import { type SkeletonButtonProps, SKELETON_ROUNDED_CLASSES } from './types';

/**
 * SkeletonButton Component
 *
 * A placeholder skeleton for buttons during loading states.
 * Provides visual consistency while content is being loaded.
 *
 * @example
 * ```tsx
 * import { SkeletonButton } from '@tahoe-ui/button';
 *
 * // Default skeleton
 * <SkeletonButton />
 *
 * // Custom dimensions
 * <SkeletonButton width="w-24" height="h-12" rounded="full" />
 *
 * // Match specific button size
 * <SkeletonButton width="w-32" height="h-10" rounded="md" />
 * ```
 */
const SkeletonButton: React.FC<SkeletonButtonProps> = ({
  width = 'w-32',
  height = 'h-10',
  rounded = 'md',
  className = '',
}) => {
  const roundedClasses = SKELETON_ROUNDED_CLASSES[rounded];

  return (
    <div
      className={cn(
        'animate-pulse bg-gray-300 dark:bg-gray-700',
        width,
        height,
        roundedClasses,
        className,
      )}
      aria-hidden="true"
    />
  );
};

SkeletonButton.displayName = 'SkeletonButton';

export default SkeletonButton;
export { SkeletonButton };
