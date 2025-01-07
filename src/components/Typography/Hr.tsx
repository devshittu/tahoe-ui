// src/components/Typography/Hr.tsx
'use client';

import React from 'react';
import clsx from 'clsx';

export type HrProps = {
  className?: string;
  thickness?: 'thin' | 'normal' | 'thick';
  color?: 'gray' | 'blue' | 'red' | 'custom';
};

/**
 * A stylized horizontal rule (hr) component.
 * Tailwind classes are used for thickness, color, and additional utility styling.
 */
const Hr = ({ className, thickness = 'normal', color = 'gray' }: HrProps) => {
  const thicknessMap = {
    thin: 'h-[1px]',
    normal: 'h-[2px]',
    thick: 'h-[4px]',
  };

  const colorMap = {
    gray: 'bg-gray-300 dark:bg-gray-600',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    custom: '',
  };

  return (
    <hr
      className={clsx(
        'w-full border-0',
        thicknessMap[thickness],
        colorMap[color],
        className,
      )}
    />
  );
};

export default Hr;

// src/components/Typography/Hr.tsx
