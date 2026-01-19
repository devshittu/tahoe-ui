'use client';

import React, { ReactNode } from 'react';
import { Paragraph } from './Paragraph';

/**
 * Lead - Introductory paragraph component
 *
 * A larger, bolder paragraph style for leading content.
 * Ideal for article introductions or hero subtitles.
 *
 * @example
 * ```tsx
 * <Heading level={1}>Article Title</Heading>
 * <Lead>
 *   This introductory paragraph sets the context for the article.
 * </Lead>
 * ```
 */
export interface LeadProps {
  children: ReactNode;
  className?: string;
}

function Lead({ children, className = '' }: LeadProps) {
  return (
    <Paragraph
      fontWeight="bold"
      className={`text-lg md:text-xl ${className}`}
      margin="my-4"
    >
      {children}
    </Paragraph>
  );
}

Lead.displayName = 'Lead';

export { Lead };
export default Lead;
