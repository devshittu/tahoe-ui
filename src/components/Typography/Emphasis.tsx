// app/components/Emphasis.tsx
'use client';

import React, { ReactNode } from 'react';
import Text from './Text';

type EmphasisProps = {
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
    <Text
      fontStyle="italic"
      color={color}
      className={className}
    >
      {children}
    </Text>
  );
};

export default Emphasis;