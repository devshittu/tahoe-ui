'use client';

import React, { ReactNode } from 'react';
import Text from './Text';

export type EmphasisProps = {
  children: ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'accent' | string;
};

const Emphasis = ({
  children,
  className = '',
  color = 'primary',
}: EmphasisProps) => {
  return (
    <Text color={color} className={`italic ${className}`}>
      {children}
    </Text>
  );
};

export default Emphasis;

// src/components/Typography/Emphasis.tsx
