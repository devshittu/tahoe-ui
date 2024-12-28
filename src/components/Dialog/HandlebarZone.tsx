'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { DialogHandlebarPosition } from './Dialog';

/** Props for the HandlebarZone component */
type HandlebarZoneProps = {
  /** Position where the handlebar is pinned */
  position: DialogHandlebarPosition;
  /** Accessible label for the handlebar */
  ariaLabel?: string;
  /** Pointer down event to initiate drag */
  onPointerDown: (e: React.PointerEvent) => void;
  /** Click event to close the dialog */
  onClick: () => void;
  /** Indicates if the drag has surpassed the threshold */
  isBeyondLimit: boolean;
};

/**
 * HandlebarZone Component
 *
 * This component renders the draggable handlebar at the specified position.
 * It responds to drag events and provides accessibility features.
 */
export function HandlebarZone({
  position,
  ariaLabel,
  onPointerDown,
  onClick,
  isBeyondLimit,
}: HandlebarZoneProps) {
  let zoneClasses = '';
  let lineClasses = 'rounded-full bg-gray-300 dark:bg-gray-500';

  // Determine classes based on handlebar position
  switch (position) {
    case 'top':
      zoneClasses =
        'absolute top-0 w-full h-10 flex items-center justify-center cursor-pointer';
      lineClasses += ' h-2 w-16';
      break;
    case 'bottom':
      zoneClasses =
        'absolute bottom-0 w-full h-10 flex items-center justify-center cursor-pointer';
      lineClasses += ' h-2 w-16';
      break;
    case 'left':
      zoneClasses =
        'absolute left-0 h-full w-10 flex items-center justify-center cursor-pointer';
      lineClasses += ' w-2 h-16';
      break;
    case 'right':
      zoneClasses =
        'absolute right-0 h-full w-10 flex items-center justify-center cursor-pointer';
      lineClasses += ' w-2 h-16';
      break;
    default:
      zoneClasses =
        'absolute top-0 w-full h-10 flex items-center justify-center cursor-pointer';
      lineClasses += ' h-2 w-16';
      break;
  }

  return (
    <div
      className={zoneClasses}
      onPointerDown={onPointerDown}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
      aria-label={ariaLabel ?? 'Drag handle to close dialog'}
    >
      <motion.div
        className={lineClasses}
        animate={{
          scale: isBeyondLimit ? 1.1 : 1,
          backgroundColor: isBeyondLimit ? '#4B5563' : undefined,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </div>
  );
}
// src/components/Dialog/HandlebarZone.tsx
