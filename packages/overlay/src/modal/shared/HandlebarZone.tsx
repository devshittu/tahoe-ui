'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { Position, LoadingStateConfig, MOTION_DEFAULTS } from './types';
import { useReducedMotion } from './hooks/useReducedMotion';

export type HandlebarZoneProps = {
  position: Position;
  ariaLabel?: string;
  onPointerDown: (e: React.PointerEvent) => void;
  onClick: () => void;
  isBeyondLimit: boolean;
  resistanceIntensity?: number;
  closeProgress?: number;
  loadingState?: LoadingStateConfig;
};

/**
 * HandlebarZone - Apple-inspired drag indicator
 */
export function HandlebarZone({
  position,
  ariaLabel,
  onPointerDown,
  onClick,
  isBeyondLimit,
  resistanceIntensity = 0,
  closeProgress = 0,
  loadingState,
}: HandlebarZoneProps) {
  const { prefersReducedMotion, getSpringConfig } = useReducedMotion();

  const isLoading = loadingState?.isLoading ?? false;
  const lockInteraction = loadingState?.lockInteraction ?? true;
  const shimmerSpeed = loadingState?.shimmerSpeed ?? 'fast';

  const scale = isBeyondLimit ? 1 + resistanceIntensity * 0.12 : 1;
  const glowOpacity = closeProgress > 0.3 ? (closeProgress - 0.3) * 0.7 : 0;
  const glowBlur = closeProgress > 0.3 ? 8 + closeProgress * 8 : 0;

  const { zoneClasses, lineClasses, isHorizontal } =
    getPositionClasses(position);

  const shimmerDuration = shimmerSpeed === 'fast' ? 1.5 : 3;
  const springConfig = getSpringConfig(MOTION_DEFAULTS.spring.snappy);

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
      {closeProgress > 0.3 && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: glowOpacity }}
          style={{
            background: `radial-gradient(ellipse at center, rgba(59, 130, 246, ${glowOpacity * 0.3}) 0%, transparent 70%)`,
            filter: `blur(${glowBlur}px)`,
          }}
        />
      )}

      <motion.div
        className={lineClasses}
        initial={false}
        animate={{ scale }}
        whileHover={!isLoading ? { scale: 1.05 } : undefined}
        whileTap={!isLoading ? { scale: 0.95 } : undefined}
        transition={springConfig}
        style={{
          background: isBeyondLimit
            ? `linear-gradient(${isHorizontal ? '180deg' : '90deg'},
                rgba(75, 85, 99, ${0.5 + resistanceIntensity * 0.3}) 0%,
                rgba(107, 114, 128, ${0.6 + resistanceIntensity * 0.3}) 100%)`
            : undefined,
        }}
      >
        {isLoading && !prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 dark:via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              duration: shimmerDuration,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}
        {isLoading && prefersReducedMotion && (
          <div className="absolute inset-0 rounded-full bg-white/20 dark:bg-white/10" />
        )}
      </motion.div>
    </div>
  );
}

function getPositionClasses(position: Position): {
  zoneClasses: string;
  lineClasses: string;
  isHorizontal: boolean;
} {
  const baseZoneClasses = twMerge(
    'absolute',
    'cursor-grab active:cursor-grabbing',
    'touch-none',
    'z-50',
    'flex items-center justify-center',
    'transition-colors duration-150',
  );

  const baseLineClasses = twMerge(
    'relative',
    'rounded-full',
    'overflow-hidden',
    'bg-gradient-to-b from-gray-300 to-gray-400',
    'dark:from-gray-500 dark:to-gray-600',
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.1)]',
    'dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_1px_rgba(0,0,0,0.2)]',
    'ring-1 ring-black/5 dark:ring-white/5',
  );

  const isHorizontal = position === 'top' || position === 'bottom';

  switch (position) {
    case 'top':
      return {
        zoneClasses: `${baseZoneClasses} top-0 left-0 right-0 h-12 min-h-11`,
        lineClasses: `${baseLineClasses} h-1 w-9 sm:w-10`,
        isHorizontal: true,
      };

    case 'bottom':
      return {
        zoneClasses: `${baseZoneClasses} bottom-0 left-0 right-0 h-12 min-h-11`,
        lineClasses: `${baseLineClasses} h-1 w-9 sm:w-10`,
        isHorizontal: true,
      };

    case 'left':
      return {
        zoneClasses: `${baseZoneClasses} left-0 top-0 bottom-0 w-12 min-w-11`,
        lineClasses: `${baseLineClasses} w-1 h-9 sm:h-10`,
        isHorizontal: false,
      };

    case 'right':
      return {
        zoneClasses: `${baseZoneClasses} right-0 top-0 bottom-0 w-12 min-w-11`,
        lineClasses: `${baseLineClasses} w-1 h-9 sm:h-10`,
        isHorizontal: false,
      };
  }
}
