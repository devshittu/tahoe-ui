'use client';

import React, { ReactNode } from 'react';
import { Heading } from '../core/Heading';

/**
 * DisplayLarge - Hero-level display text
 *
 * Extra-large, centered heading for hero sections and
 * prominent titles. Uses h1 semantics with extrabold weight.
 *
 * @example
 * ```tsx
 * <DisplayLarge>
 *   Welcome to Tahoe
 * </DisplayLarge>
 * ```
 */
export interface DisplayLargeProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right' | 'justify';
  color?: 'primary' | 'secondary' | 'accent' | string;
  margin?: string;
}

function DisplayLarge({
  children,
  align = 'center',
  color = 'primary',
  margin = 'my-8',
}: DisplayLargeProps) {
  return (
    <Heading
      level={1}
      size="xl"
      weight="extrabold"
      align={align}
      color={color}
      margin={margin}
      truncate={false}
    >
      {children}
    </Heading>
  );
}

DisplayLarge.displayName = 'DisplayLarge';

export { DisplayLarge };
export default DisplayLarge;
