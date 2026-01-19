'use client';

import React, { ReactNode } from 'react';
import { Heading } from '../core/Heading';

/**
 * DisplaySmall - Subsection display text
 *
 * Medium-sized heading for subsections and cards.
 * Uses h3 semantics with regular weight for subtlety.
 *
 * @example
 * ```tsx
 * <DisplaySmall>
 *   Getting Started
 * </DisplaySmall>
 * ```
 */
export interface DisplaySmallProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right' | 'justify';
  color?: 'primary' | 'secondary' | 'accent' | string;
  margin?: string;
}

function DisplaySmall({
  children,
  align = 'left',
  color = 'primary',
  margin = 'my-4',
}: DisplaySmallProps) {
  return (
    <Heading
      level={3}
      size="md"
      weight="regular"
      align={align}
      color={color}
      margin={margin}
      truncate={false}
    >
      {children}
    </Heading>
  );
}

DisplaySmall.displayName = 'DisplaySmall';

export { DisplaySmall };
export default DisplaySmall;
