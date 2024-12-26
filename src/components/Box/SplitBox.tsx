// src/components/Box/SplitBox.tsx
'use client';

import React, { ReactNode } from 'react';
import clsx from 'clsx';
import GridBox from './GridBox';

type SplitBoxProps = {
  children: [ReactNode, ReactNode];
  gap?: '0' | '1' | '2' | '4' | '6' | '8';
  className?: string;
} & React.ComponentProps<typeof GridBox>;

const SplitBox = ({
  children,
  gap = '4',
  className,
  ...props
}: SplitBoxProps) => {
  const splitClasses = clsx('grid-cols-2', `gap-${gap}`, className);

  return (
    <GridBox columns="2" gap={gap} className={splitClasses} {...props}>
      <div>{children[0]}</div>
      <div>{children[1]}</div>
    </GridBox>
  );
};

export default SplitBox;
