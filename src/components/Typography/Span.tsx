// app/components/Span.tsx
'use client';

import React, { ReactNode } from 'react';
import Text from './Text';

type SpanProps = {
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

const Span = ({
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
}: SpanProps) => {
  return (
    <Text
      className={className}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
      color={color}
      align={align}
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
      textTransform={textTransform}
      textDecoration={textDecoration}
      background={background}
      truncate={truncate}
    >
      {children}
    </Text>
  );
};

export default Span;