// src/components/Box/InteractiveBox.tsx
'use client';

import React, { ReactNode } from 'react';
import clsx from 'clsx';
import BaseBox from './BaseBox';

type InteractiveBoxProps = {
  children: ReactNode;
  hoverEffect?: 'scale' | 'shadow' | 'opacity' | 'none';
  focusEffect?: 'ring' | 'shadow' | 'none';
  activeEffect?: 'scale' | 'shadow' | 'none';
  disabled?: boolean;
  className?: string;
} & React.ComponentProps<typeof BaseBox>;

const InteractiveBox = ({
  children,
  hoverEffect = 'none',
  focusEffect = 'none',
  activeEffect = 'none',
  disabled = false,
  className,
  ...props
}: InteractiveBoxProps) => {
  const interactiveClasses = clsx(
    hoverEffect === 'scale' && 'hover:scale-105 transition-transform',
    hoverEffect === 'shadow' && 'hover:shadow-lg transition-shadow',
    hoverEffect === 'opacity' && 'hover:opacity-80 transition-opacity',
    focusEffect === 'ring' && 'focus:ring-2 focus:ring-blue-500',
    focusEffect === 'shadow' && 'focus:shadow-outline',
    activeEffect === 'scale' && 'active:scale-95',
    activeEffect === 'shadow' && 'active:shadow-inner',
    disabled && 'opacity-50 cursor-not-allowed',
    className,
  );

  return (
    <BaseBox
      className={interactiveClasses}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </BaseBox>
  );
};

export default InteractiveBox;
