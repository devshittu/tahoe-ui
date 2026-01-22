'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import type { DockItemProps } from './types';
import { DOCK_SIZE_CONFIG, MAGNETIC_CONFIG, DOCK_STYLES } from './types';

/**
 * DockItem - Individual dock item with magnetic scaling effect
 *
 * Features:
 * - Magnetic hover scaling based on mouse distance
 * - Badge notification support
 * - Active state indicator
 * - Tooltip label on hover
 *
 * @example
 * ```tsx
 * <DockItem
 *   item={{ id: 'home', icon: <HomeIcon />, label: 'Home', active: true }}
 *   size="md"
 *   mouseDistance={50}
 *   magneticEnabled
 *   maxScale={1.4}
 * />
 * ```
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
  const extraMargin = ((scale - 1) * config.itemSize) / 2;

  const itemContent = (
    <motion.div
      animate={{
        scale,
        marginLeft: extraMargin,
        marginRight: extraMargin,
      }}
      transition={MAGNETIC_CONFIG.spring}
      className={twMerge(
        'relative flex items-center justify-center',
        'rounded-xl',
        'origin-bottom',
        'transition-colors duration-150',
        DOCK_STYLES.item.base,
        'backdrop-blur-sm',
        DOCK_STYLES.item.border,
        'shadow-sm',
        active && DOCK_STYLES.item.active,
        disabled && 'opacity-50 cursor-not-allowed',
        !disabled && DOCK_STYLES.item.hover,
      )}
      style={{
        width: config.itemSize,
        height: config.itemSize,
      }}
    >
      {/* Icon */}
      <span
        className={twMerge(
          config.iconSize,
          DOCK_STYLES.item.text,
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
          className={twMerge(
            'absolute -top-1 -right-1',
            'flex items-center justify-center',
            config.badgeSize,
            'rounded-full',
            DOCK_STYLES.badge.base,
            'font-medium',
            DOCK_STYLES.badge.border,
          )}
        >
          {badge > 99 ? '99+' : badge}
        </motion.span>
      )}
    </motion.div>
  );

  // Active indicator dot
  const activeIndicator = active && (
    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-1.5 flex justify-center">
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={twMerge(
          'w-1.5 h-1.5 rounded-full',
          DOCK_STYLES.indicator.active,
        )}
      />
    </span>
  );

  const wrapperClasses = twMerge(
    'group relative flex flex-col items-center',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500 rounded-xl',
    isScaled ? 'z-10' : 'z-0',
  );

  // Tooltip
  const tooltip = (
    <span
      className={twMerge(
        'absolute left-1/2 -translate-x-1/2 -top-10',
        'px-2 py-1 rounded-md',
        DOCK_STYLES.tooltip.base,
        DOCK_STYLES.tooltip.text,
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
      <a href={href} className={wrapperClasses} aria-label={label}>
        {tooltip}
        {itemContent}
        {activeIndicator}
      </a>
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
