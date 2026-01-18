// src/app/playground/avatar/components/Avatar.tsx

'use client';

import { forwardRef, useState, useMemo } from 'react';
import { FiUser } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import {
  AvatarProps,
  AVATAR_SIZE_CONFIG,
  AVATAR_STATUS_CONFIG,
  getInitials,
  getColorFromName,
} from './types';

/**
 * Avatar - User profile image with fallback support
 *
 * Design Principles Applied:
 * - #3 Intentional White Space: 8pt grid sizes
 * - #9 Obvious Affordances: Clear interactive states when clickable
 * - #12 Accessibility: Alt text, keyboard accessible
 * - #16 Micro-Interaction Precision: Smooth image loading
 *
 * Features:
 * - Image with graceful fallback to initials
 * - Six size variants (xs to 2xl)
 * - Circle or square shape
 * - Status indicator (online, offline, away, busy)
 * - Deterministic fallback colors based on name
 * - Optional border/ring style
 * - Dark mode support
 *
 * @example
 * ```tsx
 * // With image
 * <Avatar src="/user.jpg" name="John Doe" />
 *
 * // Fallback to initials
 * <Avatar name="Jane Smith" size="lg" />
 *
 * // With status
 * <Avatar src="/user.jpg" name="John" status="online" />
 * ```
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  {
    src,
    alt,
    name,
    size = 'md',
    shape = 'circle',
    status = 'none',
    fallback,
    bordered = false,
    className,
    onClick,
  },
  ref,
) {
  const [imageError, setImageError] = useState(false);
  const sizeConfig = AVATAR_SIZE_CONFIG[size];

  // Determine what to show
  const showImage = src && !imageError;
  const initials = useMemo(() => (name ? getInitials(name) : ''), [name]);
  const fallbackColor = useMemo(
    () => (name ? getColorFromName(name) : 'bg-gray-400'),
    [name],
  );

  // Accessibility
  const accessibleName = alt || name || 'User avatar';
  const isInteractive = !!onClick;

  return (
    <div
      ref={ref}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={cn(
        // Base styles
        'relative inline-flex items-center justify-center flex-shrink-0',
        sizeConfig.container,

        // Shape
        shape === 'circle' ? 'rounded-full' : 'rounded-lg',

        // Border - visible on both light and dark backgrounds
        bordered &&
          'ring-2 ring-gray-300 dark:ring-gray-600 ring-offset-2 ring-offset-white dark:ring-offset-gray-950',

        // Interactive styles
        isInteractive && [
          'cursor-pointer',
          'transition-all duration-150',
          'hover:scale-105 hover:shadow-md',
          'active:scale-100',
          'focus:outline-none',
          'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950',
        ],

        className,
      )}
      aria-label={isInteractive ? accessibleName : undefined}
    >
      {/* Image */}
      {showImage && (
        <img
          src={src}
          alt={accessibleName}
          onError={() => setImageError(true)}
          className={cn(
            'w-full h-full object-cover overflow-hidden',
            shape === 'circle' ? 'rounded-full' : 'rounded-lg',
          )}
        />
      )}

      {/* Fallback */}
      {!showImage && (
        <div
          className={cn(
            'w-full h-full flex items-center justify-center overflow-hidden',
            'text-white font-medium',
            sizeConfig.fontSize,
            fallbackColor,
            shape === 'circle' ? 'rounded-full' : 'rounded-lg',
          )}
          aria-hidden="true"
        >
          {fallback || initials || <FiUser className="w-1/2 h-1/2" />}
        </div>
      )}

      {/* Status indicator */}
      {status !== 'none' && (
        <span
          className={cn(
            'absolute rounded-full',
            'transform translate-x-1/4 translate-y-1/4',
            sizeConfig.statusSize,
            sizeConfig.statusOffset,
            AVATAR_STATUS_CONFIG[status].bg,
            AVATAR_STATUS_CONFIG[status].ring,
            AVATAR_STATUS_CONFIG[status].inner,
          )}
          role="status"
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';
