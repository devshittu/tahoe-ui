// src/components/Image/HeroImage.tsx
'use client';

import React from 'react';
import BaseImage, { BaseImageProps } from './BaseImage';
import clsx from 'clsx';

type HeroImageProps = BaseImageProps & {
  overlayText?: React.ReactNode;
};

const HeroImage = ({
  overlayText,
  containerClassName = '',
  className = '',
  ...props
}: HeroImageProps) => {
  return (
    <div className={clsx('relative w-full h-96', containerClassName)}>
      <BaseImage
        shape="none"
        className={clsx('object-cover w-full h-full', className)}
        {...props}
      />
      {overlayText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 p-4 rounded">
            {overlayText}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(HeroImage);
