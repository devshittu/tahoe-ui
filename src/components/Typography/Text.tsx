'use client';

import React, { ReactNode, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type TextProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  className?: string;
  fontFamily?: 'primary' | 'secondary' | 'mono';
  fontWeight?: 'light' | 'regular' | 'bold' | 'extrabold';
  color?: 'primary' | 'secondary' | 'accent' | string;
  align?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: 'tight' | 'normal' | 'loose';
  letterSpacing?: 'tight' | 'normal' | 'wide';
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  textDecoration?: 'underline' | 'line-through' | 'none';
  background?: string;
  truncate?: boolean;
};

const fontFamilyClasses = {
  primary: 'font-sans',
  secondary: 'font-serif',
  mono: 'font-mono',
} as const;

const fontWeightClasses = {
  light: 'font-light',
  regular: 'font-normal',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
} as const;

const colorClasses = {
  primary: 'text-gray-800',
  secondary: 'text-gray-600',
  accent: 'text-red-500',
} as const;

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
} as const;

const lineHeightClasses = {
  tight: 'leading-tight',
  normal: 'leading-normal',
  loose: 'leading-loose',
} as const;

const letterSpacingClasses = {
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
} as const;

const textTransformClasses = {
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
  none: '',
} as const;

const textDecorationClasses = {
  underline: 'underline',
  'line-through': 'line-through',
  none: '',
} as const;

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
  ...props
}: TextProps) => {
  const computedClasses = clsx(
    fontFamilyClasses[fontFamily],
    fontWeightClasses[fontWeight],
    colorClasses[color as keyof typeof colorClasses] || color,
    alignClasses[align],
    lineHeightClasses[lineHeight],
    letterSpacingClasses[letterSpacing],
    textTransformClasses[textTransform],
    textDecorationClasses[textDecoration],
    background ? `bg-[${background}]` : '',
    { truncate },
    className,
  );

  return (
    <span className={twMerge(computedClasses)} {...props}>
      {children}
    </span>
  );
};

export default Text;

// src/components/Typography/Text.tsx
