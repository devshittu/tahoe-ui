'use client';

import React, { ReactNode } from 'react';
import { Heading } from '../core/Heading';

/**
 * DisplayMedium - Section-level display text
 *
 * Large centered heading for section titles and
 * feature announcements. Uses h2 semantics with bold weight.
 *
 * @example
 * ```tsx
 * <DisplayMedium>
 *   Features
 * </DisplayMedium>
 * ```
 */
export interface DisplayMediumProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right' | 'justify';
  color?: 'primary' | 'secondary' | 'accent' | string;
  margin?: string;
}

function DisplayMedium({
  children,
  align = 'center',
  color = 'primary',
  margin = 'my-6',
}: DisplayMediumProps) {
  return (
    <Heading
      level={2}
      size="lg"
      weight="bold"
      align={align}
      color={color}
      margin={margin}
      truncate={false}
    >
      {children}
    </Heading>
  );
}

DisplayMedium.displayName = 'DisplayMedium';

export { DisplayMedium };
export default DisplayMedium;
