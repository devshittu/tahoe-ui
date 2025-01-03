// src/components/Box/StackBox.tsx
'use client';

import React, { ReactNode } from 'react';
import clsx from 'clsx';
import FlexBox from './FlexBox';

type StackBoxProps = {
  children: ReactNode;
  direction?: 'col' | 'row';
  gap?: '0' | '1' | '2' | '4' | '6' | '8';
  className?: string;
} & React.ComponentProps<typeof FlexBox>;

const StackBox = ({
  children,
  direction = 'col',
  gap = '4',
  className,
  ...props
}: StackBoxProps) => {
  const stackClasses = clsx(
    direction === 'col' ? 'flex-col' : 'flex-row',
    `gap-${gap}`,
    className,
  );

  return (
    <FlexBox
      direction={direction}
      gap={gap}
      className={stackClasses}
      {...props}
    >
      {children}
    </FlexBox>
  );
};

export default StackBox;
