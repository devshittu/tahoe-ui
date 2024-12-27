// src/components/Box/FlexBox.tsx
'use client';

import React, { ReactNode } from 'react';
import clsx from 'clsx';
import BaseBox from './BaseBox';

type FlexBoxProps = {
  children: ReactNode;
  direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: '0' | '1' | '2' | '4' | '6' | '8';
  className?: string;
} & React.ComponentProps<typeof BaseBox>;

const FlexBox = ({
  children,
  direction = 'row',
  justify = 'start',
  align = 'stretch',
  wrap = 'nowrap',
  gap = '0',
  className,
  ...props
}: FlexBoxProps) => {
  const flexClasses = clsx(
    'flex',
    `flex-${direction}`,
    `justify-${justify}`,
    `items-${align}`,
    `flex-${wrap}`,
    `gap-${gap}`,
    className,
  );

  return (
    <BaseBox className={flexClasses} {...props}>
      {children}
    </BaseBox>
  );
};

export default FlexBox;
