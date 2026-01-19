/**
 * @tahoe-ui/typography
 *
 * Typography components for the Tahoe UI design system.
 * Provides comprehensive text styling with 48+ component variants.
 *
 * @packageDocumentation
 *
 * @example
 * ```tsx
 * import {
 *   Text, Heading, Paragraph,
 *   DisplayLarge, DisplayMedium,
 *   Strong, Emphasis, Highlight,
 *   Code, InlineCode,
 *   Label, Badge, Caption,
 *   Link, UnorderedList, ListItem
 * } from '@tahoe-ui/typography';
 *
 * // Hero section
 * <DisplayLarge>Welcome to Tahoe</DisplayLarge>
 * <Lead>Build beautiful interfaces with ease</Lead>
 *
 * // Article content
 * <Heading level={2}>Getting Started</Heading>
 * <Paragraph>
 *   Install the package using <InlineCode>npm install</InlineCode>
 * </Paragraph>
 * ```
 */

// Types
export * from './types';

// Class mappings (for advanced usage)
export * from './classes';

// Core components
export {
  Text,
  Heading,
  Paragraph,
  Span,
  Lead,
  type LeadProps,
  SmallText,
  type SmallTextProps,
} from './core';

// Display components
export {
  DisplayLarge,
  type DisplayLargeProps,
  DisplayMedium,
  type DisplayMediumProps,
  DisplaySmall,
  type DisplaySmallProps,
} from './display';

// Semantic components
export {
  Strong,
  Emphasis,
  Highlight,
  Blockquote,
  type BlockquoteProps,
} from './semantic';

// Code components
export {
  Code,
  type CodeProps,
  InlineCode,
  type InlineCodeProps,
  Preformatted,
  type PreformattedProps,
} from './code';

// UI components
export { Label, Caption, type CaptionProps, Badge } from './ui';

// Link component
export { Link } from './Link';

// List components
export { UnorderedList, OrderedList, ListItem, type ListProps, type ListItemProps } from './Lists';
