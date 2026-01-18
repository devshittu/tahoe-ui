// src/app/playground/badge/components/BadgeAnchor.tsx

'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './Badge';
import { BadgeAnchorProps, BADGE_POSITION_CONFIG } from './types';

/**
 * BadgeAnchor - Wrapper that positions a badge on an element
 *
 * Positions a badge at the corner of any element (icons, avatars, buttons).
 * Supports both rectangular and circular overlap modes.
 *
 * @example
 * ```tsx
 * <BadgeAnchor badgeContent={5} color="error">
 *   <MailIcon />
 * </BadgeAnchor>
 *
 * <BadgeAnchor dot color="success" overlap="circular">
 *   <Avatar src="/user.jpg" />
 * </BadgeAnchor>
 * ```
 */
export const BadgeAnchor = forwardRef<HTMLDivElement, BadgeAnchorProps>(
  function BadgeAnchor(
    {
      children,
      badgeContent,
      color = 'error',
      variant = 'solid',
      size = 'sm',
      max = 99,
      dot = false,
      pulse = false,
      position = 'top-right',
      showZero = false,
      overlap = 'rectangular',
      className,
    },
    ref,
  ) {
    // Determine if badge should be visible
    const isVisible =
      dot ||
      (badgeContent !== undefined &&
        badgeContent !== null &&
        (showZero || badgeContent !== 0));

    const positionClasses = BADGE_POSITION_CONFIG[position][overlap];

    return (
      <div ref={ref} className="relative inline-flex">
        {children}

        {isVisible && (
          <span
            className={cn(
              'absolute z-10',
              'transform',
              positionClasses,
              className,
            )}
          >
            <Badge
              color={color}
              variant={dot ? 'dot' : variant}
              size={size}
              max={max}
              dot={dot}
              pulse={pulse}
            >
              {!dot && badgeContent}
            </Badge>
          </span>
        )}
      </div>
    );
  },
);

BadgeAnchor.displayName = 'BadgeAnchor';
