// src/app/playground/headline/components/index.ts

/**
 * Headline Block - Apple-style page headlines
 *
 * Features:
 * - Fluid responsive typography
 * - CSS text-wrap: balance for optimal line breaks
 * - Composable and shorthand APIs
 * - Semantic HTML (h1-h6)
 * - Dark mode support
 */

// Components
export { Headline } from './Headline';
export { Subheadline } from './Subheadline';
export { HeadlineBlock } from './HeadlineBlock';

// Types
export type {
  HeadlineProps,
  SubheadlineProps,
  HeadlineBlockProps,
  HeadlineSize,
  HeadlineAlign,
  HeadlineLevel,
} from './types';

// Constants
export {
  HEADLINE_SIZE_CONFIG,
  HEADLINE_ALIGN_CLASSES,
  HEADLINE_SPACING_CLASSES,
} from './types';
