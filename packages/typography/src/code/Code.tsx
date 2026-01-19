'use client';

import React, { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@tahoe-ui/core';

/**
 * Code - Code block component
 *
 * Displays code blocks with monospace font and proper formatting.
 * For syntax highlighting, combine with a highlighting library.
 *
 * @example
 * ```tsx
 * <Code language="typescript">
 *   const greeting = 'Hello, World!';
 * </Code>
 * ```
 */
export interface CodeProps extends HTMLAttributes<HTMLPreElement> {
  children: ReactNode;
  language?: string;
  showLineNumbers?: boolean;
  wrapLines?: boolean;
  ariaLabel?: string;
}

function Code({
  children,
  language = 'javascript',
  showLineNumbers = false,
  wrapLines = false,
  ariaLabel,
  className,
  ...props
}: CodeProps) {
  return (
    <pre
      className={cn(
        'rounded-lg bg-gray-900 p-4 text-sm',
        wrapLines ? 'whitespace-pre-wrap' : 'whitespace-pre overflow-x-auto',
        showLineNumbers && 'pl-12 relative',
        className,
      )}
      aria-label={ariaLabel}
      {...props}
    >
      <code
        className={cn(
          'font-mono text-gray-100',
          language && `language-${language}`,
        )}
      >
        {children}
      </code>
    </pre>
  );
}

Code.displayName = 'Code';

export { Code };
export default Code;
