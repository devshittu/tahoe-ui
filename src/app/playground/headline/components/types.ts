// src/app/playground/headline/components/types.ts

import { ReactNode, HTMLAttributes } from 'react';

/**
 * Headline size presets
 */
export type HeadlineSize = 'small' | 'medium' | 'large' | 'display';

/**
 * Text alignment
 */
export type HeadlineAlign = 'left' | 'center' | 'right';

/**
 * Semantic heading level
 */
export type HeadlineLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Props for Headline component
 */
export interface HeadlineProps extends Omit<
  HTMLAttributes<HTMLHeadingElement>,
  'children'
> {
  /** Headline text content */
  children: ReactNode;
  /** Size preset */
  size?: HeadlineSize;
  /** Semantic heading level (h1-h6) */
  level?: HeadlineLevel;
  /** Text alignment */
  align?: HeadlineAlign;
  /** Enable text-wrap: balance for optimal line breaks */
  balanced?: boolean;
  /** Additional class name */
  className?: string;
}

/**
 * Props for Subheadline component
 */
export interface SubheadlineProps extends Omit<
  HTMLAttributes<HTMLParagraphElement>,
  'children'
> {
  /** Subheadline text content */
  children: ReactNode;
  /** Size preset (inherits from HeadlineBlock context or uses default) */
  size?: HeadlineSize;
  /** Text alignment */
  align?: HeadlineAlign;
  /** Enable text-wrap: balance */
  balanced?: boolean;
  /** Additional class name */
  className?: string;
}

/**
 * Props for HeadlineBlock composed component
 */
export interface HeadlineBlockProps {
  /** Headline text (shorthand API) */
  headline?: string;
  /** Subheadline text (shorthand API) */
  subheadline?: string;
  /** Children for composable API */
  children?: ReactNode;
  /** Size preset */
  size?: HeadlineSize;
  /** Text alignment */
  align?: HeadlineAlign;
  /** Semantic heading level */
  level?: HeadlineLevel;
  /** Enable text-wrap: balance */
  balanced?: boolean;
  /** Spacing between headline and subheadline */
  spacing?: 'tight' | 'normal' | 'loose';
  /** Additional class name for container */
  className?: string;
}

/**
 * Size configuration tokens
 */
export const HEADLINE_SIZE_CONFIG: Record<
  HeadlineSize,
  {
    headline: string;
    subheadline: string;
    tracking: string;
  }
> = {
  small: {
    headline: 'text-2xl sm:text-3xl',
    subheadline: 'text-base sm:text-lg',
    tracking: 'tracking-tight',
  },
  medium: {
    headline: 'text-3xl sm:text-4xl md:text-5xl',
    subheadline: 'text-lg sm:text-xl',
    tracking: 'tracking-tight',
  },
  large: {
    headline: 'text-4xl sm:text-5xl md:text-6xl',
    subheadline: 'text-xl sm:text-2xl',
    tracking: 'tracking-tighter',
  },
  display: {
    headline: 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
    subheadline: 'text-2xl sm:text-3xl',
    tracking: 'tracking-tighter',
  },
};

/**
 * Alignment classes
 */
export const HEADLINE_ALIGN_CLASSES: Record<HeadlineAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

/**
 * Spacing classes between headline and subheadline
 */
export const HEADLINE_SPACING_CLASSES: Record<
  'tight' | 'normal' | 'loose',
  string
> = {
  tight: 'space-y-2',
  normal: 'space-y-4',
  loose: 'space-y-6',
};
