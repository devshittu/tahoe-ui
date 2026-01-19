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
  /** Progress toward close threshold (0-1) for visual feedback */
  closeProgress?: number;
  loadingState?: LoadingStateConfig;
};

/**
 * HandlebarZone - Apple-inspired drag indicator
 *
 * Design principles applied:
 * - #9 Obvious Affordances: Clear drag target with tactile visual depth
 * - #16 Micro-Interaction Precision: Refined hover, active, resistance states
 * - #4 System Consistency: Token-based colors and sizing
 * - #6 Purposeful Motion: Spring physics, reduced motion support
 *
 * Visual refinements:
 * - Delicate proportions matching Apple's modal handlebars
 * - Subtle inner shadow for tactile depth
 * - Gradient overlay for premium feel
 * - Glow effect when approaching close threshold
 * - Smooth state transitions
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

  // Visual feedback based on drag state
  const scale = isBeyondLimit ? 1 + resistanceIntensity * 0.12 : 1;

  // Close progress glow (subtle blue glow as approaching close)
  const glowOpacity = closeProgress > 0.3 ? (closeProgress - 0.3) * 0.7 : 0;
  const glowBlur = closeProgress > 0.3 ? 8 + closeProgress * 8 : 0;

  // Position-specific classes
  const { zoneClasses, lineClasses, isHorizontal } =
    getPositionClasses(position);

  // Shimmer animation timing
  const shimmerDuration = shimmerSpeed === 'fast' ? 1.5 : 3;

  // Spring config
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
      {/* Close progress glow effect */}
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
        animate={{
          scale,
        }}
        whileHover={
          !isLoading
            ? {
                scale: 1.05,
              }
            : undefined
        }
        whileTap={
          !isLoading
            ? {
                scale: 0.95,
              }
            : undefined
        }
        transition={springConfig}
        style={{
          // Dynamic background based on resistance
          background: isBeyondLimit
            ? `linear-gradient(${isHorizontal ? '180deg' : '90deg'},
                rgba(75, 85, 99, ${0.5 + resistanceIntensity * 0.3}) 0%,
                rgba(107, 114, 128, ${0.6 + resistanceIntensity * 0.3}) 100%)`
            : undefined,
        }}
      >
        {/* Loading shimmer overlay */}
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
        {/* Static loading indicator for reduced motion */}
        {isLoading && prefersReducedMotion && (
          <div className="absolute inset-0 rounded-full bg-white/20 dark:bg-white/10" />
        )}
      </motion.div>
    </div>
  );
}

/**
 * Get position-specific classes with Apple-inspired styling
 *
 * Design refinements:
 * - Delicate proportions (4px height, 36-40px width) matching Apple's iOS modals
 * - Touch zone remains 44-48px for accessibility
 * - Subtle gradient background for depth
 * - Inner shadow for tactile feel
 * - Smooth rounded ends
 */
function getPositionClasses(position: Position): {
  zoneClasses: string;
  lineClasses: string;
  isHorizontal: boolean;
} {
  const baseZoneClasses = [
    'absolute',
    'cursor-grab active:cursor-grabbing',
    'touch-none',
    'z-50',
    'flex items-center justify-center',
    // Subtle highlight on hover for affordance
    'transition-colors duration-150',
  ].join(' ');

  // Apple-inspired handlebar: delicate, refined, tactile
  // - Thinner than before (4px instead of 5-8px)
  // - Subtle gradient for depth
  // - Inner shadow for pressed/tactile feel
  // - Slightly translucent for layered look
  const baseLineClasses = [
    'relative',
    'rounded-full',
    'overflow-hidden',
    // Refined gradient background (light mode)
    'bg-gradient-to-b from-gray-300 to-gray-400',
    // Dark mode: lighter, more visible
    'dark:from-gray-500 dark:to-gray-600',
    // Inner shadow for tactile depth
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.1)]',
    'dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_1px_rgba(0,0,0,0.2)]',
    // Subtle outer glow for lift
    'ring-1 ring-black/5 dark:ring-white/5',
  ].join(' ');

  const isHorizontal = position === 'top' || position === 'bottom';

  switch (position) {
    case 'top':
      return {
        // Touch zone: 48px height
        zoneClasses: `${baseZoneClasses} top-0 left-0 right-0 h-12 min-h-11`,
        // Handlebar: 4px height, 36px→40px width (more delicate than before)
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
        // Touch zone: 48px width
        zoneClasses: `${baseZoneClasses} left-0 top-0 bottom-0 w-12 min-w-11`,
        // Handlebar: 4px width, 36px→40px height
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
