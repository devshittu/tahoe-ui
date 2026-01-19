'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import type { SkeletonProps } from './types';

/**
 * Skeleton placeholder component for loading states.
 *
 * @example
 * ```tsx
 * // Text skeleton
 * <Skeleton variant="text" width="200px" />
 *
 * // Circular avatar placeholder
 * <Skeleton variant="circular" width={48} height={48} />
 *
 * // Multiple text lines
 * <Skeleton variant="text" lines={3} />
 *
 * // Rectangular card placeholder
 * <Skeleton variant="rectangular" width="100%" height={200} />
 * ```
 */
export function Skeleton({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  lines = 1,
  className,
}: SkeletonProps) {
  // Determine animation class
  const animationClass =
    animation === 'pulse'
      ? 'animate-pulse'
      : animation === 'shimmer'
        ? 'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%]'
        : '';

  // Variant-specific styles
  const variantStyles: Record<typeof variant, string> = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg',
  };

  // Calculate dimensions
  const getStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {};

    if (typeof width === 'number') {
      style.width = `${width}px`;
    } else if (width && !width.startsWith('w-')) {
      style.width = width;
    }

    if (typeof height === 'number') {
      style.height = `${height}px`;
    } else if (height && !height.startsWith('h-')) {
      style.height = height;
    }

    // For circular variant, ensure aspect ratio
    if (variant === 'circular' && width && !height) {
      style.height = style.width;
    }

    return style;
  };

  // Width class handling
  const widthClass =
    typeof width === 'string' && width.startsWith('w-') ? width : '';
  const heightClass =
    typeof height === 'string' && height.startsWith('h-') ? height : '';

  // Base skeleton element
  const baseClasses = twMerge(
    'bg-gray-200 dark:bg-gray-700',
    variantStyles[variant],
    animationClass,
    widthClass,
    heightClass,
    className
  );

  // Handle multiple text lines
  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={twMerge(
              baseClasses,
              // Last line is shorter for natural appearance
              index === lines - 1 && 'w-3/4'
            )}
            style={getStyle()}
            role="presentation"
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={baseClasses}
      style={getStyle()}
      role="presentation"
      aria-hidden="true"
    />
  );
}

/**
 * Pre-configured text skeleton
 */
export function SkeletonText({
  lines = 1,
  className,
  ...props
}: Omit<SkeletonProps, 'variant'> & { lines?: number }) {
  return <Skeleton variant="text" lines={lines} className={className} {...props} />;
}

/**
 * Pre-configured circular skeleton (for avatars)
 */
export function SkeletonCircle({
  size = 48,
  className,
  ...props
}: Omit<SkeletonProps, 'variant' | 'width' | 'height'> & { size?: number }) {
  return (
    <Skeleton
      variant="circular"
      width={size}
      height={size}
      className={className}
      {...props}
    />
  );
}

/**
 * Pre-configured rectangular skeleton
 */
export function SkeletonRectangle({
  className,
  ...props
}: Omit<SkeletonProps, 'variant'>) {
  return <Skeleton variant="rectangular" className={className} {...props} />;
}

export default Skeleton;
