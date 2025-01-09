// src/components/Image/AvatarImage.tsx
'use client';

import React from 'react';
import BaseImage, { BaseImageProps } from './BaseImage';
import clsx from 'clsx';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type AvatarImageProps = BaseImageProps & {
  size?: AvatarSize;
  border?: boolean;
};

const sizeMap: Record<AvatarSize, string> = {
  xs: 'w-8 h-8',
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
  xl: 'w-28 h-28',
};

const AvatarImage = ({
  size = 'md',
  border = false,
  containerClassName = '',
  ...props
}: AvatarImageProps) => {
  return (
    <BaseImage
      shape={props.shape}
      containerClassName={clsx(
        sizeMap[size],
        border && 'ring-2 ring-white dark:ring-gray-800',
        containerClassName,
      )}
      {...props}
    />
  );
};

export default React.memo(AvatarImage);
