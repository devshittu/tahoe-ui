// // src/components/StackedAvatar.tsx

// 'use client';

// import React, { FC } from 'react';
// import AvatarImage from '@/components/Image/AvatarImage';
// import { FiPlus } from 'react-icons/fi';
// import clsx from 'clsx';

// type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

// type Participant = {
//   id: string;
//   name: string;
//   avatarUrl: string;
// };

// type StackedAvatarProps = {
//   participants: Participant[];
//   max?: number;
//   size?: AvatarSize;
//   className?: string;
//   onAdd?: () => void; // Callback for add button
// };

// const sizeMap: Record<AvatarSize, { sizeClass: string; sizePx: number }> = {
//   xs: { sizeClass: 'w-6 h-6', sizePx: 24 },
//   sm: { sizeClass: 'w-8 h-8', sizePx: 32 },
//   md: { sizeClass: 'w-10 h-10', sizePx: 40 },
//   lg: { sizeClass: 'w-12 h-12', sizePx: 48 },
//   xl: { sizeClass: 'w-14 h-14', sizePx: 56 },
//   xxl: { sizeClass: 'w-16 h-16', sizePx: 64 },
// };

// const StackedAvatar: FC<StackedAvatarProps> = ({
//   participants,
//   max = 4,
//   size = 'md',
//   className = '',
//   onAdd,
// }) => {
//   const displayedParticipants = participants.slice(0, max - 1);
//   const extraCount = participants.length - (max - 1);

//   return (
//     <div className={clsx('flex -space-x-4 rtl:space-x-reverse', className)}>
//       {displayedParticipants.map((participant) => (
//         <AvatarImage
//           key={participant.id}
//           src={participant.avatarUrl}
//           alt={participant.name}
//           size={size}
//           border={true}
//         />
//       ))}

//       {extraCount > 1 && (
//         <button
//           onClick={onAdd}
//           className={clsx(
//             sizeMap[size].sizeClass,
//             'flex items-center justify-center text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800',
//           )}
//           title={`+${extraCount} more`}
//         >
//           {/* TODO: ADD THE MAIN BUTTON ON THE CODE */}+{extraCount}
//         </button>
//       )}
//     </div>
//   );
// };

// export default StackedAvatar;

// src/components/StackedAvatar.tsx

'use client';

import React, { FC } from 'react';
import AvatarImage from '@/components/Image/AvatarImage';
import { FiPlus } from 'react-icons/fi';
import clsx from 'clsx';

export type AvatarItem = {
  id: string;
  name: string;
  avatarUrl?: string; // Supports both avatarUrl and src naming
  src?: string;
};

export type StackedAvatarProps = {
  items: AvatarItem[]; // Generic list of items (users, friends, participants, etc.)
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
  onAdd?: () => void; // Callback for clicking the "+N" button
};

const sizeMap: Record<
  'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl',
  { sizeClass: string; sizePx: number }
> = {
  xs: { sizeClass: 'w-6 h-6', sizePx: 24 },
  sm: { sizeClass: 'w-8 h-8', sizePx: 32 },
  md: { sizeClass: 'w-10 h-10', sizePx: 40 },
  lg: { sizeClass: 'w-12 h-12', sizePx: 48 },
  xl: { sizeClass: 'w-14 h-14', sizePx: 56 },
  xxl: { sizeClass: 'w-16 h-16', sizePx: 64 },
};

const StackedAvatar: FC<StackedAvatarProps> = ({
  items,
  max = 4,
  size = 'md',
  className = '',
  onAdd,
}) => {
  // Normalize items to ensure we always get `avatarUrl`
  const normalizedItems = items.map((item) => ({
    id: item.id,
    name: item.name,
    avatarUrl: item.avatarUrl || item.src || '', // Fallback for src or avatarUrl
  }));

  const displayedItems = normalizedItems.slice(0, max - 1);
  const extraCount = normalizedItems.length - (max - 1);

  return (
    <div className={clsx('flex -space-x-4 rtl:space-x-reverse', className)}>
      {displayedItems.map((item) => (
        <AvatarImage
          key={item.id}
          src={item.avatarUrl}
          alt={item.name}
          size={size}
          border={true}
        />
      ))}

      {extraCount > 1 && (
        <button
          onClick={onAdd}
          className={clsx(
            sizeMap[size].sizeClass,
            'flex items-center justify-center text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800',
          )}
          title={`+${extraCount} more`}
        >
          +{extraCount}
        </button>
      )}
    </div>
  );
};

export default StackedAvatar;
