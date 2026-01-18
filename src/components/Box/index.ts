// src/components/Box/index.ts

/**
 * Layout Primitives
 *
 * A modern, DX-friendly layout system built on Tailwind CSS.
 * All components follow the 8pt grid system and design principles.
 *
 * Components:
 * - Box: Foundation polymorphic primitive
 * - Flex: Flexbox layout
 * - Grid: CSS Grid layout
 * - Stack: Vertical/horizontal stacking
 * - Center: Centering utility
 * - Container: Max-width content wrapper
 * - Spacer: Structural spacing element
 * - Section: Semantic page sections
 */

// Core primitives
export { default as Box } from './Box';
export { default as Flex } from './Flex';
export { default as Grid } from './Grid';
export { default as Stack } from './Stack';
export { default as Center } from './Center';

// Layout utilities
export { default as Container } from './Container';
export { default as Spacer } from './Spacer';
export { default as Section } from './Section';

// Types
export type {
  // Base types
  SpacingValue,
  GapValue,
  SpaceValue,
  SizeValue,
  MaxWidthValue,
  // Flex types
  FlexDirection,
  FlexWrap,
  JustifyContent,
  AlignItems,
  AlignSelf,
  // Grid types
  GridColumns,
  GridRows,
  GridFlow,
  // Visual types
  BorderRadius,
  Shadow,
  BackgroundColor,
  // Responsive
  Responsive,
  // Base props
  BaseLayoutProps,
} from './types';

// Component prop types
export type { BoxProps } from './Box';
export type { FlexProps, FlexOwnProps } from './Flex';
export type { GridProps, GridOwnProps } from './Grid';
export type { StackProps, StackOwnProps, StackDirection } from './Stack';
export type { CenterProps, CenterOwnProps } from './Center';
export type {
  ContainerProps,
  ContainerSize,
  ContainerPadding,
} from './Container';
export type { SpacerProps, SpacerSize, SpacerDirection } from './Spacer';
export type {
  SectionProps,
  SectionBackground,
  SectionPadding,
} from './Section';
