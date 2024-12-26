// app/components/ReadableText.tsx
'use client';

import React, { ReactNode } from 'react';
import Text from './Text';

type ReadableTextProps = {
  children: ReactNode;
  fontSize?: string;
  lineHeight?: string;
  contrast?: boolean;
  fontFamily?: 'primary' | 'secondary' | 'mono';
  className?: string;
};

const ReadableText = ({
  children,
  fontSize = 'text-base',
  lineHeight = 'leading-relaxed',
  contrast = true,
  fontFamily = 'primary',
  className = '',
}: ReadableTextProps) => {
  const contrastClass = contrast ? 'text-gray-800 bg-white' : '';

  return (
    <Text
      className={`${fontSize} ${lineHeight} ${contrastClass} ${className}`}
      fontFamily={fontFamily}
    >
      {children}
    </Text>
  );
};

export default ReadableText;