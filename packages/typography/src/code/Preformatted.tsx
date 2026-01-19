'use client';

import React, { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@tahoe-ui/core';
import { Code } from './Code';

/**
 * Preformatted - Styled preformatted code block
 *
 * A wrapper around Code with additional styling for
 * standalone code blocks with lighter background.
 *
 * @example
 * ```tsx
 * <Preformatted language="bash">
 *   npm install @tahoe-ui/typography
 * </Preformatted>
 * ```
 */
export interface PreformattedProps extends HTMLAttributes<HTMLPreElement> {
  children: ReactNode;
  language?: string;
  showLineNumbers?: boolean;
  wrapLines?: boolean;
  ariaLabel?: string;
}

function Preformatted({
  children,
  language = 'javascript',
  showLineNumbers = false,
  wrapLines = false,
  ariaLabel,
  className,
  ...props
}: PreformattedProps) {
  return (
    <Code
      language={language}
      showLineNumbers={showLineNumbers}
      wrapLines={wrapLines}
      className={cn(
        'bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700',
        className,
      )}
      ariaLabel={ariaLabel}
      {...props}
    >
      {children}
    </Code>
  );
}

Preformatted.displayName = 'Preformatted';

export { Preformatted };
export default Preformatted;
