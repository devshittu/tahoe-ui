// src/app/playground/modal/components/shared/HandlebarZone.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Position, LoadingStateConfig } from './types';
import { useReducedMotion } from './hooks/useReducedMotion';
import { MOTION_TOKENS } from '@/config/tokens';

export type HandlebarZoneProps = {
  position: Position;
  ariaLabel?: string;
  onPointerDown: (e: React.PointerEvent) => void;
  onClick: () => void;
  isBeyondLimit: boolean;
  resistanceIntensity?: number;
  loadingState?: LoadingStateConfig;
};

/**
 * Unified HandlebarZone with token-based sizing and reduced motion support
 *
 * Features:
 * - Position-aware layout with proper touch targets (44-48px per design principles)
 * - Smooth scale/color transitions for resistance feedback
 * - Loading shimmer animation with reduced motion support
 * - Keyboard accessibility
 * - Responsive sizing (narrower on small screens for left/right)
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
  const { prefersReducedMotion, getSpringConfig } = useReducedMotion();

  const isLoading = loadingState?.isLoading ?? false;
  const lockInteraction = loadingState?.lockInteraction ?? true;
  const shimmerSpeed = loadingState?.shimmerSpeed ?? 'fast';

  // Calculate visual feedback based on resistance
  const scale = isBeyondLimit ? 1 + resistanceIntensity * 0.15 : 1;
  const bgOpacity = 0.4 + resistanceIntensity * 0.4;

  // Position-specific classes with token-based sizing
  const { zoneClasses, lineClasses } = getPositionClasses(position);

  // Shimmer animation (disabled for reduced motion)
  const shimmerDuration = shimmerSpeed === 'fast' ? 1.5 : 3;

  // Spring config (instant for reduced motion)
  const springConfig = getSpringConfig(MOTION_TOKENS.spring.snappy);

  // Event handlers
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
            ? `rgba(75, 85, 99, ${bgOpacity})`
            : undefined,
        }}
        transition={springConfig}
      >
        {/* Loading shimmer overlay */}
        {isLoading && !prefersReducedMotion && (
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
        {/* Static loading indicator for reduced motion */}
        {isLoading && prefersReducedMotion && (
          <div className="absolute inset-0 bg-white/20 dark:bg-white/10" />
        )}
      </motion.div>
    </div>
  );
}

/**
 * Get position-specific classes with responsive sizing
 *
 * Touch targets: 44-56px per design principles
 * - Horizontal (top/bottom): h-12 (48px), scaling up on larger screens
 * - Vertical (left/right): w-12 (48px), narrower on small screens
 *
 * Handlebar line: Premium responsive sizing
 * - Thickness: 5px → 6px → 8px (mobile → tablet → desktop)
 * - Width: 48px → 64px → 80px for horizontal
 * - Height: 48px → 64px → 80px for vertical
 * - Subtle inner shadow for depth (Apple-inspired)
 */
function getPositionClasses(position: Position) {
  const baseZoneClasses =
    'absolute cursor-grab active:cursor-grabbing touch-none z-50 flex items-center justify-center';

  // Premium handlebar line with responsive sizing and subtle depth
  // Shadow creates inner depth without looking heavy
  const baseLineClasses = [
    'rounded-full',
    'bg-gray-400 dark:bg-gray-500',
    // Premium inner shadow for depth
    'shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]',
    'dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]',
  ].join(' ');

  switch (position) {
    case 'top':
      return {
        // Horizontal zone: 48px → 56px height on larger screens
        zoneClasses: `${baseZoneClasses} top-0 left-0 right-0 h-12 sm:h-14 min-h-11 max-h-14`,
        // Line: Responsive thickness (5px→6px→8px) and width (48px→64px→80px)
        lineClasses: `${baseLineClasses} h-[5px] sm:h-1.5 lg:h-2 w-12 sm:w-16 lg:w-20`,
      };

    case 'bottom':
      return {
        // Horizontal zone: 48px → 56px height on larger screens
        zoneClasses: `${baseZoneClasses} bottom-0 left-0 right-0 h-12 sm:h-14 min-h-11 max-h-14`,
        // Line: Responsive thickness (5px→6px→8px) and width (48px→64px→80px)
        lineClasses: `${baseLineClasses} h-[5px] sm:h-1.5 lg:h-2 w-12 sm:w-16 lg:w-20`,
      };

    case 'left':
      return {
        // Vertical zone: 44px on mobile, 48px on tablet, 56px on desktop
        zoneClasses: `${baseZoneClasses} left-0 top-0 bottom-0 w-11 sm:w-12 lg:w-14 min-w-10 max-w-14`,
        // Line: Responsive thickness (5px→6px→8px) and height (48px→64px→80px)
        lineClasses: `${baseLineClasses} w-[5px] sm:w-1.5 lg:w-2 h-12 sm:h-16 lg:h-20`,
      };

    case 'right':
      return {
        // Vertical zone: 44px on mobile, 48px on tablet, 56px on desktop
        zoneClasses: `${baseZoneClasses} right-0 top-0 bottom-0 w-11 sm:w-12 lg:w-14 min-w-10 max-w-14`,
        // Line: Responsive thickness (5px→6px→8px) and height (48px→64px→80px)
        lineClasses: `${baseLineClasses} w-[5px] sm:w-1.5 lg:w-2 h-12 sm:h-16 lg:h-20`,
      };
  }
}
