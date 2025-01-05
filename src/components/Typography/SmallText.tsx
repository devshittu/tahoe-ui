'use client';

import React, { ReactNode } from 'react';
import Text from './Text';

export type SmallTextProps = {
  children: ReactNode;
  className?: string;
};

const SmallText = ({ children, className = '' }: SmallTextProps) => {
  return (
    <Text
      className={`text-sm ${className}`}
      fontWeight="light"
      color="secondary"
    >
      {children}
    </Text>
  );
};

export default SmallText;

// src/components/Typography/SmallText.tsx
