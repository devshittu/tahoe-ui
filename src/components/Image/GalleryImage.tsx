// src/components/Image/GalleryImage.tsx
'use client';

import React from 'react';
import BaseImage, { BaseImageProps } from './BaseImage';
import clsx from 'clsx';

export type GalleryImageProps = BaseImageProps & {
  onClick?: () => void;
  hoverEffect?: 'none' | 'zoom' | 'grayscale';
};

const hoverEffectClasses = {
  none: '',
  zoom: 'transform transition-transform duration-300 hover:scale-105',
  grayscale:
    'filter grayscale hover:grayscale-0 transition-filter duration-300',
};

const GalleryImage = ({
  onClick,
  hoverEffect = 'none',
  containerClassName = '',
  className = '',
  ...props
}: GalleryImageProps) => {
  return (
    <div
      tabIndex={0}
      className={clsx(
        'cursor-pointer',
        hoverEffectClasses[hoverEffect],
        containerClassName,
      )}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
      role="button"
      onClick={onClick}
    >
      <BaseImage
        shape="rounded"
        className={clsx('rounded-lg', className)}
        {...props}
      />
    </div>
  );
};

export default React.memo(GalleryImage);
