// src/components/Image/BaseImage.tsx
'use client';

import React, { forwardRef, CSSProperties } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import clsx from 'clsx';
import { useImageStatus } from './hooks/useImageStatus';

export type ImageShape = 'none' | 'rounded' | 'circle';

export type ImageFallback = {
  fallbackSrc?: string;
  fallbackNode?: React.ReactNode;
};

export type BaseImageProps = Omit<NextImageProps, 'onLoad' | 'onError'> & {
  containerClassName?: string;
  containerStyle?: CSSProperties;
  shape?: ImageShape;
  fallback?: ImageFallback;
  onLoaded?: () => void;
  onErrorFallback?: () => void;
  className?: string;
};

const BaseImage = forwardRef<HTMLDivElement, BaseImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      fill = false,
      priority = false,
      containerClassName = '',
      containerStyle,
      shape = 'none',
      fallback,
      onLoaded,
      onErrorFallback,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const { hasError, isLoaded, handleLoad, handleError } = useImageStatus({
      fallbackSrc: fallback?.fallbackSrc,
      onErrorFallback,
    });

    const shapeClass = {
      none: '',
      rounded: 'rounded-lg overflow-hidden',
      circle: 'rounded-full overflow-hidden',
    }[shape];

    const containerClasses = clsx(
      'relative inline-block',
      shapeClass,
      containerClassName,
    );

    // Determine which image to display
    let imageElement: React.ReactNode;

    if (!hasError) {
      imageElement = (
        <NextImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          onLoad={handleLoad}
          onError={handleError}
          className={clsx('object-cover', className)}
          {...rest}
        />
      );
    } else if (fallback?.fallbackSrc) {
      imageElement = (
        <NextImage
          src={fallback.fallbackSrc}
          alt="Fallback"
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          onLoad={handleLoad}
          onError={() => {
            handleError();
            if (fallback?.fallbackNode) {
              // Intentionally left blank to show fallbackNode
            } else {
              if (onErrorFallback) onErrorFallback();
            }
          }}
          className={clsx('object-contain', className)}
          {...rest}
        />
      );
    } else if (fallback?.fallbackNode) {
      imageElement = fallback.fallbackNode;
    } else {
      if (onErrorFallback) onErrorFallback();
      imageElement = (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 p-4">
          <span>Image failed to load.</span>
        </div>
      );
    }

    return (
      <div ref={ref} className={containerClasses} style={containerStyle}>
        {imageElement}
        {!isLoaded && !hasError && fallback?.fallbackSrc && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <span>Loading...</span>
          </div>
        )}
      </div>
    );
  },
);

BaseImage.displayName = 'BaseImage';
export default React.memo(BaseImage);

// src/components/Image/BaseImage.tsx
