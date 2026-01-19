'use client';

import React, { ReactNode } from 'react';
import { cn } from '@tahoe-ui/core';
import { Text } from '../core/Text';

/**
 * Caption - Small caption text component
 *
 * For image captions, table footnotes, and supplementary
 * information. Uses smaller text with secondary color.
 *
 * @example
 * ```tsx
 * <figure>
 *   <img src="photo.jpg" alt="Landscape" />
 *   <Caption>Photo by John Doe, 2024</Caption>
 * </figure>
 * ```
 */
export interface CaptionProps {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | string;
  fontWeight?: 'light' | 'regular' | 'bold' | 'extrabold';
  className?: string;
}

function Caption({
  children,
  color = 'secondary',
  fontWeight = 'light',
  className = '',
}: CaptionProps) {
  return (
    <span className={cn('text-xs', className)}>
      <Text fontWeight={fontWeight} color={color}>
        {children}
      </Text>
    </span>
  );
}

Caption.displayName = 'Caption';

export { Caption };
export default Caption;
