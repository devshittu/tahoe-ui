// app/components/FluidTypography.tsx
'use client';

import React, { ReactNode } from 'react';
import Text from './Text';

type FluidTypographyProps = {
  children: ReactNode;
  minSize: string;
  maxSize: string;
  scalingFactor?: number;
  unit?: 'px' | 'rem' | 'em' | 'vw' | 'vh';
  weight?: 'light' | 'regular' | 'bold' | 'extrabold';
  color?: 'primary' | 'secondary' | 'accent' | string;
  align?: 'left' | 'center' | 'right' | 'justify';
  className?: string;
};

const FluidTypography = ({
  children,
  minSize,
  maxSize,
  scalingFactor = 100,
  unit = 'px',
  weight = 'regular',
  color = 'primary',
  align = 'left',
  className = '',
}: FluidTypographyProps) => {
  const fontSize = `clamp(${minSize}${unit}, ${scalingFactor}vw, ${maxSize}${unit})`;

  return (
    <Text
      style={{ fontSize }}
      fontWeight={weight}
      color={color}
      align={align}
      className={className}
    >
      {children}
    </Text>
  );
};

export default FluidTypography;
