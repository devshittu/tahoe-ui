'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Position, LoadingStateConfig } from './types';

type HandlebarZoneProps = {
  position: Position;
  ariaLabel?: string;
  onPointerDown: (e: React.PointerEvent) => void;
  onClick: () => void;
  isBeyondLimit: boolean; // Resistance state
  resistanceIntensity?: number; // 0-1 for visual feedback
  loadingState?: LoadingStateConfig; // Loading state configuration
};

/**
 * Unified HandlebarZone with advanced resistance feedback and loading shimmer
 *
 * Features:
 * - Position-aware layout
 * - Smooth scale/color transitions for resistance
 * - Loading shimmer animation
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
  loadingState,
}: HandlebarZoneProps) {
  const isLoading = loadingState?.isLoading ?? false;
  const lockInteraction = loadingState?.lockInteraction ?? true;
  const shimmerSpeed = loadingState?.shimmerSpeed ?? 'fast';

  // Calculate visual feedback based on resistance
  const scale = isBeyondLimit ? 1 + resistanceIntensity * 0.15 : 1;
  const bgOpacity = 0.4 + resistanceIntensity * 0.4; // Darker when resisting

  // Position-specific classes
  const { zoneClasses, lineClasses } = getPositionClasses(position);

  // Determine shimmer animation duration
  const shimmerDuration = shimmerSpeed === 'fast' ? 1.5 : 3;

  // Handle pointer and click events (disabled during loading if locked)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isLoading && lockInteraction) return;
    onPointerDown(e);
  };

  const handleClick = () => {
    if (isLoading && lockInteraction) return;
    onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isLoading && lockInteraction) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={zoneClasses}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel ?? 'Drag to close or press Enter'}
      aria-busy={isLoading}
      style={{
        cursor: isLoading && lockInteraction ? 'not-allowed' : undefined,
      }}
    >
      <motion.div
        className={`${lineClasses} relative overflow-hidden`}
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
      >
        {/* Loading shimmer overlay */}
        {isLoading && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              duration: shimmerDuration,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}
      </motion.div>
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
