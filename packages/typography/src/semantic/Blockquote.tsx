'use client';

import React, { ReactNode } from 'react';
import { cn } from '@tahoe-ui/core';
import { Text } from '../core/Text';

/**
 * Blockquote - Quoted text component
 *
 * Uses the semantic <blockquote> element for quotations.
 * Includes optional citation support.
 *
 * @example
 * ```tsx
 * <Blockquote cite="Albert Einstein">
 *   Imagination is more important than knowledge.
 * </Blockquote>
 * ```
 */
export interface BlockquoteProps {
  children: ReactNode;
  cite?: string;
  borderColor?: string;
  className?: string;
}

function Blockquote({
  children,
  cite,
  borderColor = 'border-gray-300',
  className = '',
}: BlockquoteProps) {
  return (
    <blockquote
      className={cn('border-l-4 pl-4 italic', borderColor, className)}
    >
      <Text>{children}</Text>
      {cite && (
        <footer className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          — {cite}
        </footer>
      )}
    </blockquote>
  );
}

Blockquote.displayName = 'Blockquote';

export { Blockquote };
export default Blockquote;
