'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
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
 *
 * @example
 * ```tsx
 * // Shorthand API
 * <HeadlineBlock
 *   headline="Welcome"
 *   subheadline="Get started with our platform"
 *   size="large"
 *   align="center"
 * />
 *
 * // Composable API
 * <HeadlineBlock spacing="loose">
 *   <Headline level={2}>Custom Headline</Headline>
 *   <Subheadline>With custom subheadline</Subheadline>
 * </HeadlineBlock>
 * ```
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
        className={twMerge(
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
      className={twMerge(
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
