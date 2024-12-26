// app/components/Text.tsx
'use client';

import React, { ReactNode } from 'react';

type TextProps = {
  children: ReactNode;
  className?: string;
  fontFamily?: 'primary' | 'secondary' | 'mono';
  fontWeight?: 'light' | 'regular' | 'bold' | 'extrabold';
  color?: 'primary' | 'secondary' | 'accent' | string;
  align?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: 'tight' | 'normal' | 'loose';
  letterSpacing?: 'tight' | 'normal' | 'wide';
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
  textDecoration?: 'underline' | 'line-through' | 'none';
  background?: string;
  truncate?: boolean;
};

const fontFamilyClasses: Record<TextProps['fontFamily'], string> = {
  primary: 'font-sans',
  secondary: 'font-serif',
  mono: 'font-mono',
};

const fontWeightClasses: Record<TextProps['fontWeight'], string> = {
  light: 'font-light',
  regular: 'font-normal',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

const colorClasses: Record<TextProps['color'], string> = {
  primary: 'text-gray-800',
  secondary: 'text-gray-600',
  accent: 'text-red-500',
};

const alignClasses: Record<TextProps['align'], string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

const lineHeightClasses: Record<TextProps['lineHeight'], string> = {
  tight: 'leading-tight',
  normal: 'leading-normal',
  loose: 'leading-loose',
};

const letterSpacingClasses: Record<TextProps['letterSpacing'], string> = {
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
};

const textTransformClasses: Record<TextProps['textTransform'], string> = {
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
};

const textDecorationClasses: Record<TextProps['textDecoration'], string> = {
  underline: 'underline',
  'line-through': 'line-through',
  none: 'no-underline',
};

const Text = ({
  children,
  className = '',
  fontFamily = 'primary',
  fontWeight = 'regular',
  color = 'primary',
  align = 'left',
  lineHeight = 'normal',
  letterSpacing = 'normal',
  textTransform = 'none',
  textDecoration = 'none',
  background = '',
  truncate = false,
}: TextProps) => {
  const classes = [
    fontFamilyClasses[fontFamily],
    fontWeightClasses[fontWeight],
    colorClasses[color as keyof typeof colorClasses] || color,
    alignClasses[align],
    lineHeightClasses[lineHeight],
    letterSpacingClasses[letterSpacing],
    textTransform !== 'none' ? textTransformClasses[textTransform] : '',
    textDecoration !== 'none' ? textDecorationClasses[textDecoration] : '',
    background ? `bg-[${background}]` : '',
    truncate ? 'truncate' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{children}</span>;
};

export default Text;