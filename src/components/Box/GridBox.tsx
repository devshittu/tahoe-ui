// src/components/Box/GridBox.tsx
'use client';

import React, { ReactNode } from 'react';
import clsx from 'clsx';
import BaseBox from './BaseBox';

type GridBoxProps = {
  children: ReactNode;
  columns?: '1' | '2' | '3' | '4' | 'auto-fit' | 'auto-fill';
  rows?: '1' | '2' | '3' | '4';
  gap?: '0' | '1' | '2' | '4' | '6' | '8';
  autoFlow?: 'row' | 'col' | 'dense';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  className?: string;
} & React.ComponentProps<typeof BaseBox>;

const GridBox = ({
  children,
  columns = '1',
  rows,
  gap = '0',
  autoFlow,
  justify,
  align,
  className,
  ...props
}: GridBoxProps) => {
  const gridClasses = clsx(
    'grid',
    columns === 'auto-fit' || columns === 'auto-fill'
      ? `grid-cols-${columns}`
      : `grid-cols-${columns}`,
    rows && `grid-rows-${rows}`,
    gap && `gap-${gap}`,
    autoFlow && `grid-flow-${autoFlow}`,
    justify && `justify-${justify}`,
    align && `items-${align}`,
    className,
  );

  return (
    <BaseBox className={gridClasses} {...props}>
      {children}
    </BaseBox>
  );
};

export default GridBox;
