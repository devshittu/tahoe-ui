// app/components/ThemedText.tsx
'use client';

import React, { ReactNode } from 'react';
import Text from './Text';

type Theme = 'light' | 'dark' | 'custom';

type ThemedTextProps = {
  children: ReactNode;
  theme: Theme;
  variant?: string;
  overrideStyles?: string;
  className?: string;
};

const themeClasses: Record<Theme, string> = {
  light: 'text-gray-800 bg-white',
  dark: 'text-gray-100 bg-gray-800',
  custom: '',
};

const ThemedText = ({
  children,
  theme,
  variant = '',
  overrideStyles = '',
  className = '',
}: ThemedTextProps) => {
  return (
    <Text
      className={`${themeClasses[theme]} ${variant} ${overrideStyles} ${className}`}
    >
      {children}
    </Text>
  );
};

export default ThemedText;
