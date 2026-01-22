// packages/typography/src/headline/index.ts

export { Headline, default as HeadlineDefault } from './Headline';
export { Subheadline, default as SubheadlineDefault } from './Subheadline';
export {
  HeadlineBlock,
  default as HeadlineBlockDefault,
} from './HeadlineBlock';

export type {
  HeadlineProps,
  SubheadlineProps,
  HeadlineBlockProps,
  HeadlineSize,
  HeadlineAlign,
  HeadlineLevel,
} from './types';

export {
  HEADLINE_SIZE_CONFIG,
  HEADLINE_ALIGN_CLASSES,
  HEADLINE_SPACING_CLASSES,
} from './types';
