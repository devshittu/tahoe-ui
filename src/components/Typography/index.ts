// src/components/Typography/index.ts
// Typography component library exports

// ============ Core Components ============
export { default as Text } from './Text';
export { default as Heading } from './Heading';
export { default as Paragraph } from './Paragraph';
export { default as Span } from './Span';
export { default as Lead } from './Lead';
export { default as SmallText } from './SmallText';

// ============ Display Variants ============
export { default as DisplayLarge } from './DisplayLarge';
export { default as DisplayMedium } from './DisplayMedium';
export { default as DisplaySmall } from './DisplaySmall';

// ============ Links ============
export { default as Link } from './Link';

// ============ Semantic Elements ============
export { default as Emphasis } from './Emphasis';
export { default as Strong } from './Strong';
export { default as Highlight } from './Highlight';
export { default as Blockquote } from './Blockquote';

// ============ Code ============
export { default as Code } from './Code';
export { default as InlineCode } from './InlineCode';
export { default as Preformatted } from './Preformatted';

// ============ UI Elements ============
export { default as TooltipText } from './TooltipText';
export { default as Label } from './Label';
export { default as Caption } from './Caption';
export { default as Badge } from './Badge';

// ============ Specialized ============
export { default as ResponsiveText } from './ResponsiveText';
export { default as FluidTypography } from './FluidTypography';
export { default as ThemedText } from './ThemedText';
export { default as ColorText } from './ColorText';
export { default as AccessibleText } from './AccessibleText';
export { default as ReadableText } from './ReadableText';
export { default as Hr } from './Hr';
export { default as TypingText } from './TypingText';

// ============ Lists ============
export { UnorderedList, OrderedList, ListItem } from './Lists';

// ============ Types ============
export type {
  // Base types
  FontFamily,
  FontWeight,
  TextColor,
  TextAlign,
  LineHeight,
  LetterSpacing,
  TextTransform,
  TextDecoration,
  TextSize,
  TypographyBaseProps,
  // Component props
  TextProps,
  SpanProps,
  ParagraphProps,
  HeadingLevel,
  HeadingSize,
  HeadingProps,
  StrongProps,
  EmphasisProps,
  LabelProps,
  LinkVariant,
  LinkProps,
  TooltipPosition,
  TooltipTextProps,
  HighlightColor,
  HighlightProps,
  ColorScheme,
  ColorTextProps,
  BadgeVariant,
  BadgeColor,
  BadgeSize,
  BadgeProps,
  DisplayProps,
  ListProps,
  ListItemProps,
} from './typography.types';
