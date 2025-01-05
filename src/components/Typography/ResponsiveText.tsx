'use client';

import React, { ReactNode } from 'react';
import Text from './Text';

export type ResponsiveTextProps = {
  children: ReactNode;
  sizes: {
    base: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  weight?: 'light' | 'regular' | 'bold' | 'extrabold';
  color?: 'primary' | 'secondary' | 'accent' | string;
  align?: 'left' | 'center' | 'right' | 'justify';
  className?: string;
};

const ResponsiveText = ({
  children,
  sizes,
  weight = 'regular',
  color = 'primary',
  align = 'left',
  className = '',
}: ResponsiveTextProps) => {
  const responsiveClasses = [
    sizes.base,
    sizes.sm ? `sm:${sizes.sm}` : '',
    sizes.md ? `md:${sizes.md}` : '',
    sizes.lg ? `lg:${sizes.lg}` : '',
    sizes.xl ? `xl:${sizes.xl}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Text
      fontWeight={weight}
      color={color}
      align={align}
      className={`${responsiveClasses} ${className}`}
    >
      {children}
    </Text>
  );
};

export default ResponsiveText;

// src/components/Typography/ResponsiveText.tsx
