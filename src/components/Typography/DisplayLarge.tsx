'use client';

import React, { ReactNode } from 'react';
import Heading from './Heading';

type DisplayLargeProps = {
  children: ReactNode;
  align?: 'left' | 'center' | 'right' | 'justify';
  color?: 'primary' | 'secondary' | 'accent' | string;
  margin?: string;
};

const DisplayLarge = ({
  children,
  align = 'center',
  color = 'primary',
  margin = 'my-8',
}: DisplayLargeProps) => {
  return (
    <Heading
      level={1}
      size="xl"
      weight="extrabold"
      align={align}
      color={color}
      margin={margin}
      truncate={false}
    >
      {children}
    </Heading>
  );
};

export default DisplayLarge;

// src/components/Typography/DisplayLarge.tsx
