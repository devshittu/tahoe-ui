// src/app/playground/dock-bar/components/DockItem.tsx
'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { DockItemProps } from './types';
import { DOCK_SIZE_CONFIG, MAGNETIC_CONFIG } from './types';

/**
 * DockItem - Individual dock item with magnetic scaling effect
 *
 * Features:
 * - Magnetic hover scaling based on mouse distance
 * - Badge notification support
 * - Active state indicator
 * - Tooltip label on hover
 * - Next.js Link integration
 *
 * Design Principles:
 * - #6 Purposeful Motion: Magnetic effect provides feedback
 * - #9 Obvious Affordances: Items clearly interactive
 * - #16 Micro-Interaction Precision: Smooth scaling transitions
 */
export function DockItem({
  item,
  size,
  mouseDistance,
  magneticEnabled,
  maxScale,
  onClick,
}: DockItemProps) {
  const config = DOCK_SIZE_CONFIG[size];
  const { id, icon, label, href, badge, active, disabled } = item;

  // Calculate scale based on mouse distance
  const { scale, isScaled } = useMemo(() => {
    if (!magneticEnabled || mouseDistance === null || disabled) {
      return { scale: 1, isScaled: false };
    }

    const { effectRadius } = MAGNETIC_CONFIG;
    if (mouseDistance > effectRadius) {
      return { scale: 1, isScaled: false };
    }

    // Smooth falloff: closer = larger scale
    const normalizedDistance = mouseDistance / effectRadius;
    const scaleFactor = 1 - normalizedDistance;
    const calculatedScale = 1 + scaleFactor * (maxScale - 1);
    return { scale: calculatedScale, isScaled: calculatedScale > 1.05 };
  }, [magneticEnabled, mouseDistance, maxScale, disabled]);

  // Calculate horizontal margin to prevent overlap
  // When scale > 1, we need extra margin = (scale - 1) * itemSize / 2
  const extraMargin = ((scale - 1) * config.itemSize) / 2;

  const itemContent = (
    <motion.div
      animate={{
        scale,
        marginLeft: extraMargin,
        marginRight: extraMargin,
      }}
      transition={MAGNETIC_CONFIG.spring}
      className={cn(
        'relative flex items-center justify-center',
        'rounded-xl',
        'origin-bottom', // Scale from bottom so items grow upward
        'transition-colors duration-150',
        'bg-white/80 dark:bg-gray-800/80',
        'backdrop-blur-sm',
        'border border-gray-200/50 dark:border-gray-700/50',
        'shadow-sm',
        active && 'ring-1 ring-gray-400 dark:ring-gray-500',
        disabled && 'opacity-50 cursor-not-allowed',
        !disabled && 'hover:bg-white dark:hover:bg-gray-700',
      )}
      style={{
        width: config.itemSize,
        height: config.itemSize,
      }}
    >
      {/* Icon - centered with flex */}
      <span
        className={cn(
          config.iconSize,
          'text-gray-700 dark:text-gray-200',
          'flex items-center justify-center',
        )}
      >
        {icon}
      </span>

      {/* Badge */}
      {badge !== undefined && badge > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={cn(
            'absolute -top-1 -right-1',
            'flex items-center justify-center',
            config.badgeSize,
            'rounded-full',
            'bg-red-500 text-white',
            'font-medium',
            'border-2 border-white dark:border-gray-900',
          )}
        >
          {badge > 99 ? '99+' : badge}
        </motion.span>
      )}
    </motion.div>
  );

  // Active indicator dot - rendered inside wrapper, centered
  const activeIndicator = active && (
    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-1.5 flex justify-center">
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-1.5 h-1.5 rounded-full bg-gray-600 dark:bg-gray-400"
      />
    </span>
  );

  const wrapperClasses = cn(
    'group relative flex flex-col items-center',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded-xl',
    isScaled ? 'z-10' : 'z-0', // Scaled items appear above neighbors
  );

  // Tooltip
  const tooltip = (
    <span
      className={cn(
        'absolute left-1/2 -translate-x-1/2 -top-10',
        'px-2 py-1 rounded-md',
        'bg-gray-900 dark:bg-gray-100',
        'text-white dark:text-gray-900',
        'text-xs font-medium whitespace-nowrap',
        'opacity-0 group-hover:opacity-100',
        'transition-opacity duration-150',
        'pointer-events-none',
        'z-10',
      )}
    >
      {label}
    </span>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={wrapperClasses} aria-label={label}>
        {tooltip}
        {itemContent}
        {activeIndicator}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => !disabled && onClick?.(item)}
      disabled={disabled}
      className={wrapperClasses}
      aria-label={label}
    >
      {tooltip}
      {itemContent}
      {activeIndicator}
    </button>
  );
}

export default DockItem;
