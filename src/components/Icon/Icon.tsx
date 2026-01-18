// src/components/Icon/Icon.tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { IconProps } from './types';
import { ICON_SIZES, ICON_COLORS, ICON_STROKES } from './types';
import {
  resolveIcon,
  isSemanticIcon,
  SEMANTIC_ICON_COLORS,
} from './semanticIcons';
import type { SemanticIconType } from './types';

/**
 * Icon component with semantic mappings, size scale, and accessibility support.
 *
 * Features:
 * - Size scale: xs (12px) to 2xl (48px)
 * - Semantic icons: 'success', 'error', 'warning', etc.
 * - Color variants aligned with design tokens
 * - Stroke weight control for outline icons
 * - Spin animation for loading states
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * // Using semantic icon
 * <Icon icon="success" size="md" />
 *
 * // Using react-icons directly
 * import { FiHeart } from 'react-icons/fi';
 * <Icon icon={FiHeart} size="lg" color="error" />
 *
 * // Loading spinner
 * <Icon icon="loading" spin />
 *
 * // With accessibility label
 * <Icon icon="settings" label="Open settings" />
 * ```
 */
export function Icon({
  icon,
  size = 'md',
  color = 'default',
  stroke = 'regular',
  label,
  decorative = false,
  className,
  onClick,
  spin = false,
}: IconProps) {
  // Resolve semantic icon to component
  const IconComponent = resolveIcon(icon);

  // Get numeric size
  const numericSize = typeof size === 'number' ? size : ICON_SIZES[size];

  // Determine color class
  let colorClass = ICON_COLORS[color];

  // For semantic feedback icons, use semantic color if color is default
  if (color === 'default' && isSemanticIcon(icon)) {
    const semanticColor = SEMANTIC_ICON_COLORS[icon as SemanticIconType];
    if (semanticColor) {
      colorClass = semanticColor;
    }
  }

  // Get stroke width
  const strokeWidth = ICON_STROKES[stroke];

  // Accessibility attributes
  const a11yProps = decorative
    ? { 'aria-hidden': true as const }
    : {
        role: 'img' as const,
        'aria-label': label,
      };

  // Handle click wrapper
  const handleClick = onClick
    ? (e: React.MouseEvent) => {
        e.stopPropagation();
        onClick();
      }
    : undefined;

  const iconElement = (
    <IconComponent
      size={numericSize}
      strokeWidth={strokeWidth}
      className={cn(
        colorClass,
        spin && 'animate-spin',
        onClick && 'cursor-pointer',
        className,
      )}
      {...a11yProps}
    />
  );

  // Wrap in span for click handling if needed
  if (onClick) {
    return (
      <span
        onClick={handleClick}
        className={cn(
          'inline-flex items-center justify-center',
          'rounded-md transition-colors duration-150',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'focus:outline-none focus:ring-2 focus:ring-blue-500/30',
        )}
        style={{
          padding: Math.max(4, numericSize * 0.25),
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {iconElement}
      </span>
    );
  }

  return iconElement;
}

export default Icon;
