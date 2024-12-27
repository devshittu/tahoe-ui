// app/components/DisplayMedium.tsx
'use client';

import React, { ReactNode } from 'react';
import Heading from './Heading';

type DisplayMediumProps = {
  children: ReactNode;
  align?: 'left' | 'center' | 'right' | 'justify';
  color?: 'primary' | 'secondary' | 'accent' | string;
  margin?: string;
};

const DisplayMedium = ({
  children,
  align = 'center',
  color = 'primary',
  margin = 'my-6',
}: DisplayMediumProps) => {
  return (
    <Heading
      level={2}
      size="lg"
      weight="bold"
      align={align}
      color={color}
      margin={margin}
      truncate={false}
    >
      {children}
    </Heading>
  );
};

export default DisplayMedium;
