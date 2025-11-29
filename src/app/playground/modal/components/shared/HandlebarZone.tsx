'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Position } from './types';

type HandlebarZoneProps = {
  position: Position;
  ariaLabel?: string;
  onPointerDown: (e: React.PointerEvent) => void;
  onClick: () => void;
  isBeyondLimit: boolean; // Resistance state
  resistanceIntensity?: number; // 0-1 for visual feedback
};

/**
 * Unified HandlebarZone with advanced resistance feedback
 *
 * Features:
 * - Position-aware layout
 * - Smooth scale/color transitions for resistance
 * - Keyboard accessibility
 * - Touch-optimized hit targets
 */
export function HandlebarZone({
  position,
  ariaLabel,
  onPointerDown,
  onClick,
  isBeyondLimit,
  resistanceIntensity = 0,
}: HandlebarZoneProps) {
  // Calculate visual feedback based on resistance
  const scale = isBeyondLimit ? 1 + resistanceIntensity * 0.15 : 1;
  const bgOpacity = 0.4 + resistanceIntensity * 0.4; // Darker when resisting

  // Position-specific classes
  const { zoneClasses, lineClasses } = getPositionClasses(position);

  return (
    <div
      className={zoneClasses}
      onPointerDown={onPointerDown}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={ariaLabel ?? 'Drag to close or press Enter'}
    >
      <motion.div
        className={lineClasses}
        animate={{
          scale,
          backgroundColor: isBeyondLimit
            ? `rgba(75, 85, 99, ${bgOpacity})` // Gray-600 with opacity
            : undefined,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 400,
          mass: 0.5,
        }}
      />
    </div>
  );
}

/**
 * Get position-specific classes for handlebar zone and line
 * Now with responsive sizing based on viewport
 */
function getPositionClasses(position: Position) {
  const baseZoneClasses =
    'absolute cursor-grab active:cursor-grabbing touch-none z-50';
  const baseLineClasses = 'rounded-full bg-gray-400 dark:bg-gray-500';

  switch (position) {
    case 'top':
      return {
        // Handlebar at top (close by dragging up)
        zoneClasses: `${baseZoneClasses} top-0 w-full h-[8vh] min-h-[60px] max-h-[80px] flex items-center justify-center`,
        lineClasses: `${baseLineClasses} h-[0.4vh] min-h-[5px] max-h-[8px] w-[8vw] min-w-[60px] max-w-[100px]`,
      };
    case 'bottom':
      return {
        // Handlebar at bottom (close by dragging down)
        zoneClasses: `${baseZoneClasses} bottom-0 w-full h-[8vh] min-h-[60px] max-h-[80px] flex items-center justify-center`,
        lineClasses: `${baseLineClasses} h-[0.4vh] min-h-[5px] max-h-[8px] w-[8vw] min-w-[60px] max-w-[100px]`,
      };
    case 'left':
      return {
        // Handlebar at left (close by dragging left)
        zoneClasses: `${baseZoneClasses} left-0 h-full w-[8vw] min-w-[60px] max-w-[80px] flex items-center justify-center`,
        lineClasses: `${baseLineClasses} w-[0.4vw] min-w-[5px] max-w-[8px] h-[8vh] min-h-[60px] max-h-[100px]`,
      };
    case 'right':
      return {
        // Handlebar at right (close by dragging right)
        zoneClasses: `${baseZoneClasses} right-0 h-full w-[8vw] min-w-[60px] max-w-[80px] flex items-center justify-center`,
        lineClasses: `${baseLineClasses} w-[0.4vw] min-w-[5px] max-w-[8px] h-[8vh] min-h-[60px] max-h-[100px]`,
      };
  }
}

// src/app/playground/modal/components/shared/HandlebarZone.tsx
