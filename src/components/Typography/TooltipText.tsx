// app/components/TooltipText.tsx
'use client';

import React, { ReactNode, useState } from 'react';
import Text from './Text';

type TooltipTextProps = {
  children: ReactNode;
  tooltip: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
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

  const positionClasses: Record<TooltipTextProps['position'], string> = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      style={style}
    >
      {children}
      {visible && (
        <span
          className={`absolute ${positionClasses[position]} bg-black text-white text-xs rounded py-1 px-2 z-10 transition-opacity duration-200 opacity-100`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          {tooltip}
        </span>
      )}
    </span>
  );
};

export default TooltipText;