// src/app/playground/modal/components/shared/HandlebarZone.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Position, LoadingStateConfig } from './types';
import { useReducedMotion } from './hooks/useReducedMotion';
import { SPACING_TOKENS, MOTION_TOKENS } from '@/config/tokens';

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
 * Get position-specific classes with token-based sizing
 *
 * Touch targets: 44-48px per design principles
 * - Horizontal (top/bottom): h-12 (48px)
 * - Vertical (left/right): w-12 (48px), narrower on small screens
 */
function getPositionClasses(position: Position) {
  const baseZoneClasses =
    'absolute cursor-grab active:cursor-grabbing touch-none z-50 flex items-center justify-center';
  const baseLineClasses = 'rounded-full bg-gray-400 dark:bg-gray-500';

  // Token-based values
  const { handlebar } = SPACING_TOKENS;

  switch (position) {
    case 'top':
      return {
        // Horizontal zone: 48px height, full width
        zoneClasses: `${baseZoneClasses} top-0 left-0 right-0 h-12 min-h-[${handlebar.horizontal.minHeight}px] max-h-14`,
        // Line: 5px height, 48-80px width
        lineClasses: `${baseLineClasses} h-[5px] w-12 min-w-[${handlebar.line.length.min}px] max-w-20`,
      };

    case 'bottom':
      return {
        // Horizontal zone: 48px height, full width
        zoneClasses: `${baseZoneClasses} bottom-0 left-0 right-0 h-12 min-h-[${handlebar.horizontal.minHeight}px] max-h-14`,
        // Line: 5px height, 48-80px width
        lineClasses: `${baseLineClasses} h-[5px] w-12 min-w-[${handlebar.line.length.min}px] max-w-20`,
      };

    case 'left':
      return {
        // Vertical zone: 48px width (44px on small screens), full height
        zoneClasses: `${baseZoneClasses} left-0 top-0 bottom-0 w-12 min-w-[${handlebar.vertical.minWidth}px] max-w-14 max-sm:w-11 max-sm:min-w-10`,
        // Line: 5px width, 48-80px height
        lineClasses: `${baseLineClasses} w-[5px] h-12 min-h-[${handlebar.line.length.min}px] max-h-20`,
      };

    case 'right':
      return {
        // Vertical zone: 48px width (44px on small screens), full height
        zoneClasses: `${baseZoneClasses} right-0 top-0 bottom-0 w-12 min-w-[${handlebar.vertical.minWidth}px] max-w-14 max-sm:w-11 max-sm:min-w-10`,
        // Line: 5px width, 48-80px height
        lineClasses: `${baseLineClasses} w-[5px] h-12 min-h-[${handlebar.line.length.min}px] max-h-20`,
      };
  }
}
