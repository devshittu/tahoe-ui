// src/components/Image/ThumbnailImage.tsx
'use client';

import React from 'react';
import BaseImage, { BaseImageProps } from './BaseImage';
import clsx from 'clsx';
import Link from '@/components/Typography/Link'; // Assuming you have a Link component

export type ThumbnailImageProps = BaseImageProps & {
  href: string;
};

const ThumbnailImage = ({
  href,
  containerClassName = '',
  className = '',
  ...props
}: ThumbnailImageProps) => {
  return (
    <Link href={href} className={clsx(containerClassName)}>
      <BaseImage
        shape="rounded"
        className={clsx('rounded-md', className)}
        {...props}
      />
    </Link>
  );
};

export default React.memo(ThumbnailImage);
