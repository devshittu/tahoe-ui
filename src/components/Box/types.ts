// src/components/Box/types.ts

/**
 * Layout Primitives Type System
 *
 * Centralized type definitions for the Box component family.
 * Designed for excellent DX with autocomplete and type safety.
 *
 * Reference: design-principles.md
 * - #3 Intentional White Space: 8pt grid system
 * - #4 System-Level Consistency: Single source of truth
 */

import { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';

// ============ Polymorphic Component Types ============

/**
 * Generic polymorphic component type
 * Enables type-safe `as` prop with correct HTML attributes
 */
export type PolymorphicRef<C extends ElementType> =
  ComponentPropsWithoutRef<C>['ref'];

export type AsProp<C extends ElementType> = {
  as?: C;
};

export type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProp<
  C extends ElementType,
  Props = object,
> = AsProp<C> &
  Props &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// ============ Spacing Types (8pt Grid) ============

/**
 * Spacing scale following 8pt grid system
 * Maps to Tailwind spacing utilities
 */
export type SpacingValue =
  | '0' // 0px
  | '0.5' // 2px
  | '1' // 4px
  | '1.5' // 6px
  | '2' // 8px
  | '2.5' // 10px
  | '3' // 12px
  | '3.5' // 14px
  | '4' // 16px
  | '5' // 20px
  | '6' // 24px
  | '7' // 28px
  | '8' // 32px
  | '9' // 36px
  | '10' // 40px
  | '11' // 44px
  | '12' // 48px
  | '14' // 56px
  | '16' // 64px
  | '20' // 80px
  | '24' // 96px
  | '28' // 112px
  | '32' // 128px
  | '36' // 144px
  | '40' // 160px
  | '44' // 176px
  | '48' // 192px
  | '52' // 208px
  | '56' // 224px
  | '60' // 240px
  | '64' // 256px
  | '72' // 288px
  | '80' // 320px
  | '96'; // 384px

/**
 * Gap values - commonly used subset
 */
export type GapValue =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '8'
  | '10'
  | '12'
  | '16'
  | '20'
  | '24';

/**
 * Padding/margin values - commonly used subset
 */
export type SpaceValue =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '8'
  | '10'
  | '12'
  | '16'
  | '20'
  | '24'
  | 'px'; // 1px

// ============ Size Types ============

/**
 * Width/height values
 */
export type SizeValue =
  | 'auto'
  | 'full'
  | 'screen'
  | 'min'
  | 'max'
  | 'fit'
  | '0'
  | '1/2'
  | '1/3'
  | '2/3'
  | '1/4'
  | '3/4'
  | '1/5'
  | '2/5'
  | '3/5'
  | '4/5';

/**
 * Max-width presets (Tailwind defaults)
 */
export type MaxWidthValue =
  | 'none'
  | 'xs' // 320px
  | 'sm' // 384px
  | 'md' // 448px
  | 'lg' // 512px
  | 'xl' // 576px
  | '2xl' // 672px
  | '3xl' // 768px
  | '4xl' // 896px
  | '5xl' // 1024px
  | '6xl' // 1152px
  | '7xl' // 1280px
  | 'full'
  | 'prose'; // 65ch

// ============ Flex Types ============

export type FlexDirection = 'row' | 'row-reverse' | 'col' | 'col-reverse';
export type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';
export type JustifyContent =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'
  | 'stretch';
export type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export type AlignSelf =
  | 'auto'
  | 'start'
  | 'end'
  | 'center'
  | 'stretch'
  | 'baseline';

// ============ Grid Types ============

export type GridColumns =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | 'none';
export type GridRows = '1' | '2' | '3' | '4' | '5' | '6' | 'none';
export type GridFlow = 'row' | 'col' | 'dense' | 'row-dense' | 'col-dense';

// ============ Visual Types ============

export type BorderRadius =
  | 'none'
  | 'sm'
  | 'base'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | 'full';

export type Shadow = 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl';

export type BackgroundColor =
  | 'transparent'
  | 'white'
  | 'black'
  | 'gray-50'
  | 'gray-100'
  | 'gray-200'
  | 'gray-800'
  | 'gray-900'
  | 'gray-950';

// ============ Responsive Types ============

/**
 * Responsive prop wrapper
 * Allows specifying values for different breakpoints
 */
export type Responsive<T> =
  | T
  | {
      base?: T;
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
      '2xl'?: T;
    };

// ============ Base Props ============

/**
 * Common props shared across all layout primitives
 */
export interface BaseLayoutProps {
  children?: ReactNode;
  className?: string;
  /** Padding - all sides */
  p?: SpaceValue;
  /** Padding - horizontal */
  px?: SpaceValue;
  /** Padding - vertical */
  py?: SpaceValue;
  /** Padding - top */
  pt?: SpaceValue;
  /** Padding - right */
  pr?: SpaceValue;
  /** Padding - bottom */
  pb?: SpaceValue;
  /** Padding - left */
  pl?: SpaceValue;
  /** Margin - all sides */
  m?: SpaceValue;
  /** Margin - horizontal */
  mx?: SpaceValue | 'auto';
  /** Margin - vertical */
  my?: SpaceValue | 'auto';
  /** Margin - top */
  mt?: SpaceValue | 'auto';
  /** Margin - right */
  mr?: SpaceValue | 'auto';
  /** Margin - bottom */
  mb?: SpaceValue | 'auto';
  /** Margin - left */
  ml?: SpaceValue | 'auto';
  /** Width */
  w?: SizeValue;
  /** Height */
  h?: SizeValue;
  /** Min width */
  minW?: SizeValue | '0';
  /** Max width */
  maxW?: MaxWidthValue;
  /** Min height */
  minH?: SizeValue | '0' | 'screen';
  /** Max height */
  maxH?: SizeValue | 'screen';
  /** Border radius */
  rounded?: BorderRadius;
  /** Box shadow */
  shadow?: Shadow;
  /** Background color */
  bg?: BackgroundColor;
  /** Overflow behavior */
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  /** Position */
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  /** Z-index */
  z?: '0' | '10' | '20' | '30' | '40' | '50' | 'auto';
}
