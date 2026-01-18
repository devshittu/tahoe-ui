// src/components/Box/Section.tsx
'use client';

import React, { forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Section - Semantic section primitive
 *
 * A full-width semantic <section> element with background and spacing support.
 * Ideal for page sections, content blocks, and landing page layouts.
 *
 * Reference: design-principles.md
 * - #3 Intentional White Space: Grouped sections 24-32px apart
 * - #11 Content-First Layout: Full-width containers with inner padding
 * - #12 Accessibility: Semantic HTML with aria-label support
 *
 * @example
 * ```tsx
 * // Basic section
 * <Section py="16">
 *   <Container>Content here</Container>
 * </Section>
 *
 * // With background
 * <Section bg="gray-50" py="24">
 *   <Container>
 *     <Heading>Features</Heading>
 *   </Container>
 * </Section>
 *
 * // Accessible section
 * <Section aria-labelledby="features-heading" bg="white" py="20">
 *   <Container>
 *     <Heading id="features-heading">Features</Heading>
 *   </Container>
 * </Section>
 * ```
 */

export type SectionBackground =
  | 'transparent'
  | 'white'
  | 'gray-50'
  | 'gray-100'
  | 'gray-900'
  | 'gray-950';

export type SectionPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface SectionProps {
  children: ReactNode;
  /** Background color */
  bg?: SectionBackground;
  /** Vertical padding preset */
  py?: SectionPadding;
  /** Custom vertical padding (Tailwind spacing value) */
  pyCustom?: string;
  /** Add border-top */
  borderTop?: boolean;
  /** Add border-bottom */
  borderBottom?: boolean;
  /** Full viewport height */
  fullHeight?: boolean;
  /** Min viewport height */
  minFullHeight?: boolean;
  /** Accessible label */
  'aria-label'?: string;
  /** ID of heading element for aria-labelledby */
  'aria-labelledby'?: string;
  /** Additional className */
  className?: string;
}

/**
 * Vertical padding presets following design principles
 * Sections typically need more spacing (24-48px) than inline elements
 */
const PADDING_CLASSES: Record<SectionPadding, string> = {
  none: 'py-0',
  sm: 'py-8 sm:py-12', // 32px → 48px
  md: 'py-12 sm:py-16', // 48px → 64px
  lg: 'py-16 sm:py-20 lg:py-24', // 64px → 80px → 96px
  xl: 'py-20 sm:py-24 lg:py-32', // 80px → 96px → 128px
  '2xl': 'py-24 sm:py-32 lg:py-40', // 96px → 128px → 160px
};

/**
 * Background color classes
 */
const BACKGROUND_CLASSES: Record<SectionBackground, string> = {
  transparent: 'bg-transparent',
  white: 'bg-white dark:bg-gray-950',
  'gray-50': 'bg-gray-50 dark:bg-gray-900',
  'gray-100': 'bg-gray-100 dark:bg-gray-800',
  'gray-900': 'bg-gray-900 dark:bg-gray-100',
  'gray-950': 'bg-gray-950 dark:bg-white',
};

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      bg = 'transparent',
      py = 'md',
      pyCustom,
      borderTop,
      borderBottom,
      fullHeight,
      minFullHeight,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          // Width
          'w-full',
          // Background
          BACKGROUND_CLASSES[bg],
          // Padding (custom overrides preset)
          pyCustom ? `py-${pyCustom}` : PADDING_CLASSES[py],
          // Borders
          borderTop && 'border-t border-gray-200 dark:border-gray-800',
          borderBottom && 'border-b border-gray-200 dark:border-gray-800',
          // Height
          fullHeight && 'h-screen',
          minFullHeight && 'min-h-screen',
          // Custom
          className,
        )}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        {...rest}
      >
        {children}
      </section>
    );
  },
);

Section.displayName = 'Section';

export default Section;
