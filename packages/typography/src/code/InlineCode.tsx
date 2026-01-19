'use client';

import React, { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@tahoe-ui/core';

/**
 * InlineCode - Inline code snippet component
 *
 * For inline code within text content. Uses monospace
 * font with subtle background.
 *
 * @example
 * ```tsx
 * <Paragraph>
 *   Use the <InlineCode>useState</InlineCode> hook for state management.
 * </Paragraph>
 * ```
 */
export interface InlineCodeProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  ariaLabel?: string;
}

function InlineCode({
  children,
  ariaLabel,
  className,
  ...props
}: InlineCodeProps) {
  return (
    <code
      className={cn(
        'px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800',
        'text-sm font-mono',
        'text-gray-800 dark:text-gray-200',
        className,
      )}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </code>
  );
}

InlineCode.displayName = 'InlineCode';

export { InlineCode };
export default InlineCode;
