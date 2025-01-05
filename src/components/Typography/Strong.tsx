'use client';

import React, { ReactNode } from 'react';
import Text from './Text';

export type StrongProps = {
  children: ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'accent' | string;
};

const Strong = ({
  children,
  className = '',
  color = 'primary',
}: StrongProps) => {
  return (
    <Text fontWeight="bold" color={color} className={className}>
      {children}
    </Text>
  );
};

export default Strong;

// src/components/Typography/Strong.tsx
