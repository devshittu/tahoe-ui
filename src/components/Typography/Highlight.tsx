'use client';

import React, { ReactNode } from 'react';
import Text from './Text';
import clsx from 'clsx';

export type HighlightProps = {
  children: ReactNode;
  bgColor?: string;
  textColor?: 'primary' | 'secondary' | 'accent' | string;
  padding?: string;
  className?: string;
};

const Highlight = ({
  children,
  bgColor = 'yellow-200',
  textColor = 'primary',
  padding = 'px-1',
  className = '',
}: HighlightProps) => {
  const computedClassName = clsx(
    `bg-${bgColor}`,
    `text-${textColor}`,
    padding,
    className,
  );

  return <Text className={computedClassName}>{children}</Text>;
};

export default Highlight;

// src/components/Typography/Highlight.tsx
