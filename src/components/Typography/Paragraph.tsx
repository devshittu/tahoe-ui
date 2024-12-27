// app/components/Paragraph.tsx
'use client';

import React, { ReactNode } from 'react';
import Text from './Text';

type ParagraphProps = {
  children: ReactNode;
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
  margin?: string;
};

const Paragraph = ({
  children,
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
  margin = 'my-2',
}: ParagraphProps) => {
  return (
    <p className={margin}>
      <Text
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
    </p>
  );
};

export default Paragraph;
