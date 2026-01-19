'use client';

import React, { forwardRef } from 'react';
import { cn } from '@tahoe-ui/core';
import type { HighlightProps, TextColor } from '../types';
import { highlightBgClasses, textColorClasses, isNamedColor } from '../classes';

/**
 * Highlight - Text with background highlight
 *
 * Uses the semantic <mark> element to indicate
 * relevant or highlighted content.
 *
 * @example
 * ```tsx
 * <Paragraph>
 *   Search results for "<Highlight bgColor="yellow">React</Highlight>"
 * </Paragraph>
 *
 * <Highlight bgColor="green">New Feature</Highlight>
 * ```
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

export { Highlight };
export default Highlight;
