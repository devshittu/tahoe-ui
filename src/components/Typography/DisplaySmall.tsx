// app/components/DisplaySmall.tsx
'use client';

import React, { ReactNode } from 'react';
import Heading from './Heading';

type DisplaySmallProps = {
  children: ReactNode;
  align?: 'left' | 'center' | 'right' | 'justify';
  color?: 'primary' | 'secondary' | 'accent' | string;
  margin?: string;
};

const DisplaySmall = ({
  children,
  align = 'left',
  color = 'primary',
  margin = 'my-4',
}: DisplaySmallProps) => {
  return (
    <Heading
      level={3}
      size="md"
      weight="regular"
      align={align}
      color={color}
      margin={margin}
      truncate={false}
    >
      {children}
    </Heading>
  );
};

export default DisplaySmall;
