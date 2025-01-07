'use client';

import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Text from './Text';

export type ColorScheme = 'blue' | 'red' | 'green' | string;

export type ColorTextProps = {
  children: ReactNode;
  colorScheme?: ColorScheme;
  gradient?: boolean;
  opacity?: number;
  className?: string;
};

const predefinedColors: Record<string, string> = {
  blue: 'blue',
  red: 'red',
  green: 'green',
  yellow: 'yellow',
  purple: 'purple',
  pink: 'pink',
  cyan: 'cyan',
  indigo: 'indigo',
  // Add more predefined colors as needed
};

const ColorText = ({
  children,
  colorScheme = 'blue',
  gradient = false,
  opacity,
  className = '',
}: ColorTextProps) => {
  // Determine if the colorScheme is predefined
  const isPredefined = predefinedColors.hasOwnProperty(colorScheme);

  // Base text color class
  const colorClass = isPredefined ? `text-${colorScheme}-500` : '';

  // Gradient classes
  const gradientClasses =
    gradient && isPredefined
      ? `bg-gradient-to-r from-${colorScheme}-400 to-${colorScheme}-600 text-transparent bg-clip-text`
      : '';

  // Opacity class
  const opacityClass = opacity ? `opacity-${opacity}` : '';

  // Combine all classes using clsx and twMerge
  const combinedClassName = twMerge(
    clsx(colorClass, gradientClasses, opacityClass, className),
  );

  return (
    <Text
      color={gradient || !isPredefined ? undefined : colorScheme}
      className={combinedClassName}
    >
      {children}
    </Text>
  );
};

export default ColorText;

// src/components/Typography/ColorText.tsx
