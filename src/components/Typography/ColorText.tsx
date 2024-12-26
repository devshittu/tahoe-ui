// app/components/ColorText.tsx
'use client';

import React, { ReactNode } from 'react';
import Text from './Text';

type ColorScheme = 'blue' | 'red' | 'green' | string;

type ColorTextProps = {
  children: ReactNode;
  colorScheme?: ColorScheme;
  gradient?: boolean;
  opacity?: number;
  className?: string;
};

const ColorText = ({
  children,
  colorScheme = 'blue',
  gradient = false,
  opacity,
  className = '',
}: ColorTextProps) => {
  const colorClass = `text-${colorScheme}-500`;
  const gradientClasses = gradient
    ? `bg-gradient-to-r from-${colorScheme}-400 to-${colorScheme}-600 text-transparent bg-clip-text`
    : '';

  const opacityClass = opacity ? `opacity-${opacity}` : '';

  return (
    <Text
      color={gradient ? undefined : colorScheme}
      className={`${colorClass} ${gradientClasses} ${opacityClass} ${className}`}
    >
      {children}
    </Text>
  );
};

export default ColorText;