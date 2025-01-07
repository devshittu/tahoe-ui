'use client';

import React, { ReactNode } from 'react';
import Text from './Text';

export type CaptionProps = {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | string;
  fontWeight?: 'light' | 'regular' | 'bold' | 'extrabold';
  className?: string;
};

const Caption = ({
  children,
  color = 'secondary',
  fontWeight = 'light',
  className = '',
}: CaptionProps) => {
  return (
    <span className={`text-xs ${className}`}>
      <Text fontWeight={fontWeight} color={color}>
        {children}
      </Text>
    </span>
  );
};

export default Caption;

// src/components/Typography/Caption.tsx
