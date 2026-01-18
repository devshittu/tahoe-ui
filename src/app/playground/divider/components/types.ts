// src/app/playground/divider/components/types.ts

import { ReactNode } from 'react';

/**
 * Divider orientation
 */
export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Divider visual variants
 */
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

/**
 * Divider thickness
 */
export type DividerThickness = 'thin' | 'medium' | 'thick';

/**
 * Text/content alignment for dividers with children
 */
export type DividerAlign = 'start' | 'center' | 'end';

/**
 * Props for Divider component
 */
export interface DividerProps {
  /** Orientation */
  orientation?: DividerOrientation;
  /** Visual variant */
  variant?: DividerVariant;
  /** Line thickness */
  thickness?: DividerThickness;
  /** Color (uses semantic tokens) */
  color?: 'default' | 'subtle' | 'strong';
  /** Content to display in divider (text or element) */
  children?: ReactNode;
  /** Content alignment when children present */
  align?: DividerAlign;
  /** Spacing around divider (margin) */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
  /** Decorative (aria-hidden) or semantic */
  decorative?: boolean;
}

/**
 * Thickness configuration
 */
export const DIVIDER_THICKNESS_CONFIG: Record<
  DividerThickness,
  {
    horizontal: string;
    vertical: string;
  }
> = {
  thin: {
    horizontal: 'h-px',
    vertical: 'w-px',
  },
  medium: {
    horizontal: 'h-0.5',
    vertical: 'w-0.5',
  },
  thick: {
    horizontal: 'h-1',
    vertical: 'w-1',
  },
};

/**
 * Color configuration
 */
export const DIVIDER_COLOR_CONFIG: Record<
  'default' | 'subtle' | 'strong',
  string
> = {
  default: 'bg-gray-200 dark:bg-gray-800',
  subtle: 'bg-gray-100 dark:bg-gray-900',
  strong: 'bg-gray-300 dark:bg-gray-700',
};

/**
 * Border style for variants (used with children)
 */
export const DIVIDER_VARIANT_CONFIG: Record<DividerVariant, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
};

/**
 * Border color for variants with children
 */
export const DIVIDER_BORDER_COLOR: Record<
  'default' | 'subtle' | 'strong',
  string
> = {
  default: 'border-gray-200 dark:border-gray-800',
  subtle: 'border-gray-100 dark:border-gray-900',
  strong: 'border-gray-300 dark:border-gray-700',
};

/**
 * Spacing configuration
 */
export const DIVIDER_SPACING_CONFIG: Record<
  'none' | 'sm' | 'md' | 'lg',
  {
    horizontal: string;
    vertical: string;
  }
> = {
  none: {
    horizontal: '',
    vertical: '',
  },
  sm: {
    horizontal: 'my-2',
    vertical: 'mx-2',
  },
  md: {
    horizontal: 'my-4',
    vertical: 'mx-4',
  },
  lg: {
    horizontal: 'my-8',
    vertical: 'mx-8',
  },
};

/**
 * Alignment configuration for content
 */
export const DIVIDER_ALIGN_CONFIG: Record<DividerAlign, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
};
