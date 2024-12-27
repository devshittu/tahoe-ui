import React from 'react';
import BaseImage, { BaseImageProps } from './BaseImage';

const Shimmer = () => (
  <div className="animate-pulse bg-gray-300 w-full h-full rounded-lg"></div>
);

const SkeletonImage = (props: BaseImageProps) => {
  return (
    <BaseImage
      {...props}
      fallback={{
        fallbackNode: <Shimmer />,
      }}
    />
  );
};

export default React.memo(SkeletonImage);
