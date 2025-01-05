'use client';

import React, { ReactNode, useState } from 'react';
import clsx from 'clsx';

export type TooltipTextProps = {
  children: ReactNode;
  tooltip: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
};

const positionClasses: Record<
  NonNullable<TooltipTextProps['position']>,
  string
> = {
  top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
};

const TooltipText = ({
  children,
  tooltip,
  position = 'top',
  delay = 300,
  style = {},
  className = '',
}: TooltipTextProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className={clsx('relative inline-block', className)}
      onMouseEnter={() => setTimeout(() => setVisible(true), delay)}
      onMouseLeave={() => setVisible(false)}
      style={style}
    >
      {children}
      {visible && (
        <span
          className={clsx(
            'absolute whitespace-nowrap bg-black text-white text-xs rounded py-1 px-2 z-10 transition-opacity duration-200',
            positionClasses[position],
          )}
        >
          {tooltip}
        </span>
      )}
    </span>
  );
};

export default TooltipText;

// src/components/Typography/TooltipText.tsx
