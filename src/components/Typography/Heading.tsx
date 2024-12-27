// app/components/Heading.tsx
'use client';

import React, { ReactNode } from 'react';
import Text from './Text';

type HeadingProps = {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'xl' | 'lg' | 'md' | 'sm';
  weight?: 'light' | 'regular' | 'bold' | 'extrabold';
  color?: 'primary' | 'secondary' | 'accent' | string;
  align?: 'left' | 'center' | 'right' | 'justify';
  margin?: string;
  truncate?: boolean;
};

const sizeClasses: Record<HeadingProps['size'], string> = {
  xl: 'text-4xl md:text-5xl lg:text-6xl',
  lg: 'text-3xl md:text-4xl lg:text-5xl',
  md: 'text-2xl md:text-3xl lg:text-4xl',
  sm: 'text-xl md:text-2xl lg:text-3xl',
};

const Heading = ({
  children,
  level = 1,
  size = 'xl',
  weight = 'bold',
  color = 'primary',
  align = 'left',
  margin = 'my-4',
  truncate = false,
}: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const sizeClass = sizeClasses[size];

  return (
    <Tag className={`${sizeClass} ${margin}`}>
      <Text fontWeight={weight} color={color} align={align} truncate={truncate}>
        {children}
      </Text>
    </Tag>
  );
};

export default Heading;
