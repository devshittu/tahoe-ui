// src/app/playground/dock-bar/components/DockBar.tsx
'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { DockBarProps, DockItemData } from './types';
import { DOCK_SIZE_CONFIG, MAGNETIC_CONFIG } from './types';
import { DockItem } from './DockItem';

/**
 * DockBar - macOS-style dock with magnetic hover effect
 *
 * Features:
 * - Magnetic hover effect (items scale toward cursor)
 * - Badge notifications with animations
 * - Keyboard height adaptation (iOS PWA)
 * - Safe area inset handling
 * - Tooltip labels on hover
 *
 * Design Principles:
 * - #6 Purposeful Motion: Magnetic scaling provides delight
 * - #7 Intuitive Interaction: Familiar dock pattern
 * - #17 Mobile-Native: Safe area and keyboard handling
 */
export function DockBar({
  items,
  position = 'bottom',
  size = 'md',
  magnetic = true,
  maxScale = 1.4,
  adaptToKeyboard = true,
  onItemClick,
  className,
}: DockBarProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const [itemRefs] = useState<Map<string, HTMLElement>>(new Map());
  const [mouseDistances, setMouseDistances] = useState<Map<string, number>>(
    new Map(),
  );
  const [isHovering, setIsHovering] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const config = DOCK_SIZE_CONFIG[size];

  // Track mouse position and calculate distances to each item
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!magnetic || !dockRef.current) return;

      const dockRect = dockRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const distances = new Map<string, number>();

      items.forEach((item) => {
        const element = itemRefs.get(item.id);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const itemCenterY = rect.top + rect.height / 2;

        // Calculate distance from mouse to item center
        const distance = Math.sqrt(
          Math.pow(mouseX - itemCenterX, 2) + Math.pow(mouseY - itemCenterY, 2),
        );

        distances.set(item.id, distance);
      });

      setMouseDistances(distances);
    },
    [magnetic, items, itemRefs],
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setMouseDistances(new Map());
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  // Register item refs
  const registerItemRef = useCallback(
    (id: string, element: HTMLElement | null) => {
      if (element) {
        itemRefs.set(id, element);
      } else {
        itemRefs.delete(id);
      }
    },
    [itemRefs],
  );

  // Keyboard height detection for iOS PWA
  useEffect(() => {
    if (!adaptToKeyboard) return;

    // Use visualViewport API if available
    const viewport = window.visualViewport;
    if (!viewport) return;

    const handleResize = () => {
      const heightDiff = window.innerHeight - viewport.height;
      setKeyboardHeight(Math.max(0, heightDiff));
    };

    viewport.addEventListener('resize', handleResize);
    return () => viewport.removeEventListener('resize', handleResize);
  }, [adaptToKeyboard]);

  return (
    <motion.nav
      ref={dockRef}
      initial={{ opacity: 0, y: position === 'bottom' ? 20 : -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={cn(
        'inline-flex items-end', // Align items to bottom for upward scaling
        config.gap,
        config.padding,
        'pb-5', // Extra bottom padding for active indicator dots
        'pt-8', // Extra top padding for scaled items
        'rounded-2xl',
        'bg-white/70 dark:bg-gray-900/70',
        'backdrop-blur-xl',
        'border border-gray-200/50 dark:border-gray-700/50',
        'shadow-lg shadow-black/5 dark:shadow-black/20',
        className,
      )}
      style={{
        // Adapt to keyboard if enabled
        ...(position === 'bottom' && keyboardHeight > 0
          ? { marginBottom: keyboardHeight }
          : {}),
      }}
      role="navigation"
      aria-label="Dock navigation"
    >
      {items.map((item) => (
        <div key={item.id} ref={(el) => registerItemRef(item.id, el)}>
          <DockItem
            item={item}
            size={size}
            mouseDistance={
              isHovering ? (mouseDistances.get(item.id) ?? null) : null
            }
            magneticEnabled={magnetic}
            maxScale={maxScale}
            onClick={onItemClick}
          />
        </div>
      ))}
    </motion.nav>
  );
}

export default DockBar;
