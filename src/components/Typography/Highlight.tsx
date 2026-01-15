'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { HighlightProps, TextColor } from './typography.types';
import {
  highlightBgClasses,
  textColorClasses,
  isNamedColor,
} from './typography.classes';

/**
 * Highlight component for emphasized text with background.
 * Uses the semantic <mark> element.
 */
const Highlight = forwardRef<HTMLElement, HighlightProps>(
  (
    {
      children,
      bgColor = 'yellow',
      textColor = 'primary',
      className,
      ...props
    },
    ref,
  ) => {
    const colorClass = isNamedColor(textColor as string)
      ? textColorClasses[textColor as TextColor]
      : '';

    return (
      <mark
        ref={ref}
        className={cn(
          'rounded-sm px-1',
          highlightBgClasses[bgColor],
          colorClass,
          className,
        )}
        {...props}
      >
        {children}
      </mark>
    );
  },
);

Highlight.displayName = 'Highlight';
export default Highlight;
export type { HighlightProps };
