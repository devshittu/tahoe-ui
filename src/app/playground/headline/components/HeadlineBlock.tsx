// src/app/playground/headline/components/HeadlineBlock.tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Headline } from './Headline';
import { Subheadline } from './Subheadline';
import type { HeadlineBlockProps } from './types';
import { HEADLINE_SPACING_CLASSES, HEADLINE_ALIGN_CLASSES } from './types';

/**
 * HeadlineBlock - Composed headline + subheadline component
 *
 * Supports two APIs:
 * 1. Shorthand: <HeadlineBlock headline="Title" subheadline="Subtitle" />
 * 2. Composable: <HeadlineBlock><Headline>Title</Headline><Subheadline>Subtitle</Subheadline></HeadlineBlock>
 *
 * Features:
 * - Apple-style page headers
 * - Fluid responsive typography
 * - Consistent spacing system
 * - Dark mode support
 *
 * Design Principles:
 * - #1 Purpose-Driven Minimalism: Every element justified
 * - #2 Visual Hierarchy: Clear headline/subheadline relationship
 * - #11 Content-First Layout: Typography serves comprehension
 */
export function HeadlineBlock({
  headline,
  subheadline,
  children,
  size = 'large',
  align = 'center',
  level = 1,
  balanced = true,
  spacing = 'normal',
  className,
}: HeadlineBlockProps) {
  // If children provided, use composable API
  if (children) {
    return (
      <div
        className={cn(
          HEADLINE_SPACING_CLASSES[spacing],
          HEADLINE_ALIGN_CLASSES[align],
          className,
        )}
      >
        {children}
      </div>
    );
  }

  // Shorthand API
  return (
    <div
      className={cn(
        HEADLINE_SPACING_CLASSES[spacing],
        HEADLINE_ALIGN_CLASSES[align],
        className,
      )}
    >
      {headline && (
        <Headline size={size} level={level} align={align} balanced={balanced}>
          {headline}
        </Headline>
      )}
      {subheadline && (
        <Subheadline size={size} align={align} balanced={balanced}>
          {subheadline}
        </Subheadline>
      )}
    </div>
  );
}

export default HeadlineBlock;
