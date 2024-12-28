// app/components/Label.tsx
'use client';

import React, { ReactNode } from 'react';
import Text from './Text';

type LabelProps = {
  children: ReactNode;
  size?: 'sm' | 'md';
  color?: 'primary' | 'secondary' | 'accent' | string;
  fontWeight?: 'light' | 'regular' | 'bold' | 'extrabold';
  className?: string;
};

const sizeClasses: Record<NonNullable<LabelProps['size']>, string> = {
  sm: 'text-xs',
  md: 'text-sm',
};

const Label = ({
  children,
  size = 'sm',
  color = 'primary',
  fontWeight = 'bold',
  className = '',
}: LabelProps) => {
  return (
    <span className={`${sizeClasses[size]} ${className}`}>
      <Text fontWeight={fontWeight} color={color}>
        {children}
      </Text>
    </span>
  );
};

export default Label;
