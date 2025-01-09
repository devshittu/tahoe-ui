// src/components/Button/SkeletonButton.tsx

'use client';

import React from 'react';
import clsx from 'clsx';

type SkeletonButtonProps = {
  /** Width of the skeleton button */
  width?: string;
  /** Height of the skeleton button */
  height?: string;
  /** Corner rounding */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  /** Additional classes */
  className?: string;
};

const SkeletonButton: React.FC<SkeletonButtonProps> = ({
  width = 'w-32',
  height = 'h-10',
  rounded = 'md',
  className = '',
}) => {
  const roundedClasses = clsx(
    {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    }[rounded],
  );

  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-300',
        width,
        height,
        roundedClasses,
        className,
      )}
    ></div>
  );
};

export default SkeletonButton;
