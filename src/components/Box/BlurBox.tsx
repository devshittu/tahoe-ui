// src/components/Box/BlurBox.tsx
'use client';

import React, { ReactNode } from 'react';
import clsx from 'clsx';
import BaseBox from './BaseBox';

type BlurBoxProps = {
  children: ReactNode;
  blur?: 'sm' | 'md' | 'lg';
  className?: string;
} & React.ComponentProps<typeof BaseBox>;

const BlurBox = ({
  children,
  blur = 'md',
  className,
  ...props
}: BlurBoxProps) => {
  const blurClasses = clsx(`backdrop-blur-${blur}`, className);

  return (
    <BaseBox className={blurClasses} {...props}>
      {children}
    </BaseBox>
  );
};

export default BlurBox;
