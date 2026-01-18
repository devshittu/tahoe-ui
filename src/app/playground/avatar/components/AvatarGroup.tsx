// src/app/playground/avatar/components/AvatarGroup.tsx

'use client';

import { forwardRef, Children, isValidElement, cloneElement } from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from './Avatar';
import {
  AvatarGroupProps,
  AvatarProps,
  AVATAR_GROUP_SPACING,
  AVATAR_SIZE_CONFIG,
} from './types';

/**
 * AvatarGroup - Display multiple avatars with overlap
 *
 * Features:
 * - Overlapping avatar display
 * - Configurable max visible count
 * - "+N" overflow indicator
 * - Consistent size across all avatars
 *
 * @example
 * ```tsx
 * <AvatarGroup max={3}>
 *   <Avatar name="John Doe" />
 *   <Avatar name="Jane Smith" />
 *   <Avatar name="Bob Wilson" />
 *   <Avatar name="Alice Brown" />
 * </AvatarGroup>
 * ```
 */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup(
    { children, max = 5, size = 'md', spacing = 'normal', className },
    ref,
  ) {
    const childArray = Children.toArray(children);
    const visibleChildren = max ? childArray.slice(0, max) : childArray;
    const overflowCount = max ? Math.max(0, childArray.length - max) : 0;
    const sizeConfig = AVATAR_SIZE_CONFIG[size];

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center',
          AVATAR_GROUP_SPACING[spacing],
          className,
        )}
        role="group"
        aria-label={`Group of ${childArray.length} avatars`}
      >
        {visibleChildren.map((child, index) => {
          if (isValidElement<AvatarProps>(child)) {
            return cloneElement(child, {
              key: index,
              size,
              bordered: true,
              className: cn(child.props.className, 'relative'),
            });
          }
          return child;
        })}

        {/* Overflow indicator */}
        {overflowCount > 0 && (
          <div
            className={cn(
              'relative inline-flex items-center justify-center flex-shrink-0',
              'rounded-full',
              'bg-gray-200 dark:bg-gray-700',
              'text-gray-600 dark:text-gray-300',
              'font-medium',
              'ring-2 ring-white dark:ring-gray-900',
              sizeConfig.container,
              sizeConfig.fontSize,
            )}
            aria-label={`${overflowCount} more`}
          >
            +{overflowCount}
          </div>
        )}
      </div>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup';
