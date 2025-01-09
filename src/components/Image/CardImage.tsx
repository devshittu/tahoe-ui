// src/components/Image/CardImage.tsx
'use client';

import React from 'react';
import BaseImage, { BaseImageProps } from './BaseImage';
import clsx from 'clsx';

export type CardImageProps = BaseImageProps & {
  overlayText?: React.ReactNode;
  overlayPosition?: 'top' | 'center' | 'bottom';
  overlayBgColor?: string; // e.g., 'bg-black bg-opacity-50'
  caption?: string; // e.g., 'bg-black bg-opacity-50'
};

const CardImage = ({
  overlayText,
  overlayPosition = 'bottom',
  overlayBgColor = 'bg-black bg-opacity-50',
  containerClassName = '',
  className = '',
  caption = '',
  ...props
}: CardImageProps) => {
  // Position classes
  const positionClasses = {
    top: 'top-0',
    center: 'top-1/2 transform -translate-y-1/2',
    bottom: 'bottom-0',
  };

  return (
    <figure className={clsx('relative', containerClassName)}>
      <BaseImage
        shape="rounded"
        className={clsx('rounded-lg', className)}
        {...props}
      />
      {overlayText && (
        <figcaption
          className={clsx(
            'absolute left-0 w-full p-2 text-white',
            overlayBgColor,
            positionClasses[overlayPosition],
            'text-center',
          )}
          title={caption.toString()}
        >
          {overlayText}
        </figcaption>
      )}
    </figure>
  );
};

export default React.memo(CardImage);
