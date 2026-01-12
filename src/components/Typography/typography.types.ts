// src/components/Typography/typography.types.ts
// Centralized type definitions for the Typography system

import { HTMLAttributes, ReactNode, LabelHTMLAttributes } from 'react';

// ============ Base Prop Types ============

export type FontFamily = 'primary' | 'secondary' | 'mono';
export type FontWeight = 'light' | 'regular' | 'bold' | 'extrabold';
export type TextColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'muted'
  | 'inherit';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type LineHeight = 'tight' | 'normal' | 'loose' | 'relaxed';
export type LetterSpacing = 'tight' | 'normal' | 'wide';
export type TextTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'none';
export type TextDecoration = 'underline' | 'line-through' | 'none';
export type TextSize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';

// ============ Shared Base Props ============

export interface TypographyBaseProps {
  fontFamily?: FontFamily;
  fontWeight?: FontWeight;
  color?: TextColor | (string & {}); // Allow custom strings for backward compatibility
  align?: TextAlign;
  lineHeight?: LineHeight;
  letterSpacing?: LetterSpacing;
  textTransform?: TextTransform;
  textDecoration?: TextDecoration;
  truncate?: boolean;
  className?: string;
  children: ReactNode;
}

// ============ Element-Specific Props ============

export type TextProps = TypographyBaseProps &
  Omit<HTMLAttributes<HTMLSpanElement>, keyof TypographyBaseProps>;

export type SpanProps = TypographyBaseProps &
  Omit<HTMLAttributes<HTMLSpanElement>, keyof TypographyBaseProps>;

export type ParagraphProps = TypographyBaseProps &
  Omit<HTMLAttributes<HTMLParagraphElement>, keyof TypographyBaseProps> & {
    margin?: string;
  };

// ============ Heading Props ============

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'xl' | 'lg' | 'md' | 'sm';

export type HeadingProps = Omit<TypographyBaseProps, 'fontWeight'> &
  Omit<HTMLAttributes<HTMLHeadingElement>, keyof TypographyBaseProps> & {
    level?: HeadingLevel;
    size?: HeadingSize;
    weight?: FontWeight;
    margin?: string;
  };

// ============ Semantic Element Props ============

export type StrongProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  children: ReactNode;
  color?: TextColor | (string & {});
  className?: string;
};

export type EmphasisProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  children: ReactNode;
  color?: TextColor | (string & {});
  className?: string;
};

// ============ Form Element Props ============

export type LabelProps = Omit<
  LabelHTMLAttributes<HTMLLabelElement>,
  'children'
> & {
  children: ReactNode;
  size?: 'sm' | 'md';
  color?: TextColor | (string & {});
  fontWeight?: FontWeight;
  required?: boolean;
};

// ============ Link Props ============

export type LinkVariant = 'default' | 'muted' | 'accent';

export type LinkProps = Omit<
  HTMLAttributes<HTMLAnchorElement>,
  'children' | 'href'
> & {
  href: string;
  children: ReactNode;
  external?: boolean;
  underline?: boolean;
  variant?: LinkVariant;
};

// ============ Interactive Element Props ============

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export type TooltipTextProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'children'
> & {
  children: ReactNode;
  tooltip: string;
  position?: TooltipPosition;
  delay?: number;
};

// ============ Highlight Props ============

export type HighlightColor = 'yellow' | 'green' | 'blue' | 'pink' | 'purple';

export type HighlightProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  children: ReactNode;
  bgColor?: HighlightColor;
  textColor?: TextColor;
  className?: string;
};

// ============ ColorText Props ============

export type ColorScheme =
  | 'blue'
  | 'red'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'pink'
  | 'cyan'
  | 'indigo';

export type ColorTextProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'children'
> & {
  children: ReactNode;
  colorScheme?: ColorScheme;
  gradient?: boolean;
  className?: string;
};

// ============ Badge Props ============

export type BadgeVariant = 'filled' | 'outlined' | 'ghost';
export type BadgeColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error';
export type BadgeSize = 'sm' | 'md';

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  children: ReactNode;
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  className?: string;
};

// ============ Display Props ============

export type DisplayProps = Omit<TypographyBaseProps, 'fontWeight'> &
  Omit<HTMLAttributes<HTMLDivElement>, keyof TypographyBaseProps> & {
    weight?: FontWeight;
    margin?: string;
  };

// ============ List Props ============

export type ListProps = HTMLAttributes<HTMLUListElement | HTMLOListElement> & {
  children: ReactNode;
  className?: string;
};

export type ListItemProps = HTMLAttributes<HTMLLIElement> & {
  children: ReactNode;
  className?: string;
};
