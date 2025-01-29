// // src/components/Image/AvatarImage.tsx
// 'use client';

// import React from 'react';
// import BaseImage, { BaseImageProps } from './BaseImage';
// import clsx from 'clsx';

// export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// export type AvatarImageProps = BaseImageProps & {
//   size?: AvatarSize;
//   border?: boolean;
// };

// const sizeMap: Record<AvatarSize, string> = {
//   xs: 'w-8 h-8',
//   sm: 'w-10 h-10',
//   md: 'w-14 h-14',
//   lg: 'w-20 h-20',
//   xl: 'w-28 h-28',
// };

// const AvatarImage = ({
//   size = 'md',
//   border = false,
//   containerClassName = '',
//   ...props
// }: AvatarImageProps) => {
//   return (
//     <BaseImage
//       shape={props.shape}
//       containerClassName={clsx(
//         sizeMap[size],
//         border && 'ring-2 ring-white dark:ring-gray-800',
//         containerClassName,
//       )}
//       {...props}
//     />
//   );
// };

// export default React.memo(AvatarImage);

// src/components/Image/AvatarImage.tsx

'use client';

import React from 'react';
import BaseImage, { BaseImageProps } from './BaseImage';
import clsx from 'clsx';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type AvatarImageProps = BaseImageProps & {
  size?: AvatarSize;
  border?: boolean;
};

const sizeMap: Record<AvatarSize, { sizeClass: string; sizePx: number }> = {
  xs: { sizeClass: 'w-6 h-6', sizePx: 24 }, // 24px
  sm: { sizeClass: 'w-8 h-8', sizePx: 32 }, // 32px
  md: { sizeClass: 'w-10 h-10', sizePx: 40 }, // 40px
  lg: { sizeClass: 'w-12 h-12', sizePx: 48 }, // 48px
  xl: { sizeClass: 'w-14 h-14', sizePx: 56 }, // 56px
  xxl: { sizeClass: 'w-16 h-16', sizePx: 64 }, // 64px
};

const AvatarImage = ({
  size = 'md',
  border = false,
  containerClassName = '',
  ...props
}: AvatarImageProps) => {
  return (
    <BaseImage
      shape="circle"
      containerClassName={clsx(
        sizeMap[size].sizeClass,
        border && 'ring-2 ring-white dark:ring-gray-800',
        containerClassName,
      )}
      width={sizeMap[size].sizePx}
      height={sizeMap[size].sizePx}
      {...props}
    />
  );
};

export default React.memo(AvatarImage);
