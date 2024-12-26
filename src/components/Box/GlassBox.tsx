// src/components/Box/GlassBox.tsx
'use client';

import React, { ReactNode } from 'react';
import clsx from 'clsx';
import BaseBox from './BaseBox';

type GlassBoxProps = {
  children: ReactNode;
  blur?: 'sm' | 'md' | 'lg';
  opacity?: number;
  className?: string;
} & React.ComponentProps<typeof BaseBox>;

const GlassBox = ({
  children,
  blur = 'md',
  opacity = 50,
  className,
  ...props
}: GlassBoxProps) => {
  const glassClasses = clsx(
    `bg-white bg-opacity-${opacity}`,
    `backdrop-filter backdrop-blur-${blur}`,
    'border border-white border-opacity-20',
    'shadow-lg',
    className
  );

  return (
    <BaseBox className={glassClasses} {...props}>
      {children}
    </BaseBox>
  );
};

export default GlassBox;
