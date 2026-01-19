'use client';

import React, { ReactNode } from 'react';
import { Text } from './Text';

/**
 * SmallText - Smaller secondary text component
 *
 * Pre-styled for captions, footnotes, and supplementary content.
 * Uses smaller size with lighter weight and secondary color.
 *
 * @example
 * ```tsx
 * <SmallText>
 *   Updated 2 hours ago
 * </SmallText>
 * ```
 */
export interface SmallTextProps {
  children: ReactNode;
  className?: string;
}

function SmallText({ children, className = '' }: SmallTextProps) {
  return (
    <Text
      className={`text-sm ${className}`}
      fontWeight="light"
      color="secondary"
    >
      {children}
    </Text>
  );
}

SmallText.displayName = 'SmallText';

export { SmallText };
export default SmallText;
