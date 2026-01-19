'use client';

import React, { forwardRef } from 'react';
import { cn } from '@tahoe-ui/core';
import type { EmphasisProps, TextColor } from '../types';
import { textColorClasses, isNamedColor } from '../classes';

/**
 * Emphasis - Semantic italic text component
 *
 * Uses the <em> element for proper accessibility and SEO.
 * Indicates content with stress emphasis.
 *
 * @example
 * ```tsx
 * <Paragraph>
 *   The quick brown fox <Emphasis>jumps</Emphasis> over the lazy dog.
 * </Paragraph>
 * ```
 */
const Emphasis = forwardRef<HTMLElement, EmphasisProps>(
  ({ children, className, color = 'primary', ...props }, ref) => {
    const colorClass = isNamedColor(color as string)
      ? textColorClasses[color as TextColor]
      : '';

    return (
      <em ref={ref} className={cn('italic', colorClass, className)} {...props}>
        {children}
      </em>
    );
  },
);

Emphasis.displayName = 'Emphasis';

export { Emphasis };
export default Emphasis;
