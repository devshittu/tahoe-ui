// src/app/playground/context-menu/components/ContextMenu.tsx
'use client';

import React, { useCallback, useRef, useState, useId, useEffect } from 'react';
import { Menu, MenuItems, Portal } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLongPress } from '@/hooks/gestures/useLongPress';
import type { ContextMenuProps, MenuPosition } from './types';
import { MENU_CONFIG } from './types';
import { ContextMenuItem } from './ContextMenuItem';

/**
 * ContextMenu - Highly configurable cross-platform context menu
 *
 * Two behavior modes:
 * - 'modal': Fixed viewport position, optional backdrop, blocks interactions
 * - 'contextual': Scrolls with page, auto-closes on scroll (traditional)
 *
 * Features:
 * - Right-click trigger (desktop)
 * - Long-press trigger (touch devices)
 * - Viewport-aware positioning
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Submenu support
 * - Configurable close behaviors
 *
 * @example
 * ```tsx
 * // Modal behavior with backdrop
 * <ContextMenu
 *   items={menuItems}
 *   behavior="modal"
 *   showBackdrop
 *   backdropOpacity={0.5}
 * >
 *   <div>Right-click me</div>
 * </ContextMenu>
 *
 * // Contextual behavior (scrolls with page)
 * <ContextMenu
 *   items={menuItems}
 *   behavior="contextual"
 *   closeOnScroll
 * >
 *   <div>Right-click me</div>
 * </ContextMenu>
 * ```
 */
export function ContextMenu({
  children,
  items,
  disabled = false,
  longPressThreshold = 500,
  onOpen,
  onClose,
  className,
  // Behavior configuration
  behavior = 'contextual',
  showBackdrop = false,
  backdropOpacity = 0.3,
  backdropClassName,
  closeOnScroll = true,
  closeOnResize = true,
  closeOnClickOutside = true,
  closeOnEscape = true,
  scrollThreshold = 10,
}: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<MenuPosition>({ x: 0, y: 0 });
  const [adjustedPosition, setAdjustedPosition] = useState<MenuPosition>({
    x: 0,
    y: 0,
  });
  // Track scroll position at open time for contextual mode
  const initialScrollRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  // Adjust position to keep menu within viewport
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const menu = menuRef.current;
      const rect = menu.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const padding = MENU_CONFIG.viewportPadding;

      let x = position.x;
      let y = position.y;

      // Adjust horizontal position if menu would overflow right edge
      if (x + rect.width > viewportWidth - padding) {
        x = viewportWidth - rect.width - padding;
      }
      // Ensure not beyond left edge
      if (x < padding) {
        x = padding;
      }

      // Adjust vertical position if menu would overflow bottom edge
      if (y + rect.height > viewportHeight - padding) {
        y = viewportHeight - rect.height - padding;
      }
      // Ensure not beyond top edge
      if (y < padding) {
        y = padding;
      }

      setAdjustedPosition({ x, y });
    }
  }, [isOpen, position]);

  // Open menu at position
  const openMenu = useCallback(
    (pos: MenuPosition) => {
      if (disabled) return;
      setPosition(pos);
      setAdjustedPosition(pos);
      // Store initial scroll position for contextual mode
      initialScrollRef.current = { x: window.scrollX, y: window.scrollY };
      setIsOpen(true);
      onOpen?.();
    },
    [disabled, onOpen],
  );

  // Close menu
  const closeMenu = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  // Right-click handler
  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      openMenu({ x: e.clientX, y: e.clientY });
    },
    [disabled, openMenu],
  );

  // Long-press for touch devices
  const { pressProps, progress, isPressing } = useLongPress({
    threshold: longPressThreshold,
    disabled,
    onComplete: () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        openMenu({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    },
  });

  // Handle close behaviors
  useEffect(() => {
    if (!isOpen) return;

    const handlers: Array<{ event: string; handler: EventListener }> = [];

    // Click outside handler
    if (closeOnClickOutside) {
      const handleClickOutside = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        if (
          menuRef.current &&
          !menuRef.current.contains(mouseEvent.target as Node)
        ) {
          // Also check if click is on trigger (allow re-trigger)
          if (triggerRef.current?.contains(mouseEvent.target as Node)) {
            return;
          }
          closeMenu();
        }
      };
      // Delay to prevent immediate close on the opening click
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
        handlers.push({ event: 'mousedown', handler: handleClickOutside });
      }, 10);

      return () => {
        clearTimeout(timeoutId);
        handlers.forEach(({ event, handler }) => {
          document.removeEventListener(event, handler);
        });
      };
    }
  }, [isOpen, closeOnClickOutside, closeMenu]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, closeMenu]);

  // Scroll handler (contextual mode)
  useEffect(() => {
    if (!isOpen || !closeOnScroll || behavior !== 'contextual') return;

    const handleScroll = () => {
      const scrollDeltaX = Math.abs(
        window.scrollX - initialScrollRef.current.x,
      );
      const scrollDeltaY = Math.abs(
        window.scrollY - initialScrollRef.current.y,
      );

      if (scrollDeltaX > scrollThreshold || scrollDeltaY > scrollThreshold) {
        closeMenu();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen, closeOnScroll, behavior, scrollThreshold, closeMenu]);

  // Resize handler
  useEffect(() => {
    if (!isOpen || !closeOnResize) return;

    const handleResize = () => {
      closeMenu();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, closeOnResize, closeMenu]);

  // Animation variants
  const menuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: MENU_CONFIG.animationDuration / 1000,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 400,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      {/* Trigger wrapper */}
      <div
        ref={triggerRef}
        {...pressProps}
        onContextMenu={handleContextMenu}
        className={cn(
          'relative',
          isPressing && 'scale-[0.98] transition-transform duration-100',
          className,
        )}
        style={{
          ...(isPressing && progress > 0.1
            ? { transform: `scale(${1 - progress * 0.03})` }
            : {}),
        }}
      >
        {children}

        {/* Long-press progress indicator */}
        {isPressing && progress > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 rounded-lg ring-2 ring-gray-400/50 dark:ring-gray-500/50"
              style={{ opacity: progress }}
            />
          </div>
        )}
      </div>

      {/* Menu portal */}
      <Portal>
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop (modal mode only) */}
              {behavior === 'modal' && showBackdrop && (
                <motion.div
                  variants={backdropVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.15 }}
                  className={cn(
                    'fixed inset-0 z-40 bg-black',
                    backdropClassName,
                  )}
                  style={{ opacity: backdropOpacity }}
                  onClick={closeOnClickOutside ? closeMenu : undefined}
                  aria-hidden="true"
                />
              )}

              {/* Menu - both modes use fixed positioning, contextual just closes on scroll */}
              <Menu>
                <motion.div
                  ref={menuRef}
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  id={menuId}
                  role="menu"
                  aria-orientation="vertical"
                  className={cn(
                    'fixed z-50 outline-none',
                    'min-w-[180px] max-w-[280px] p-1',
                    'rounded-lg',
                    'bg-white dark:bg-gray-800',
                    'border border-gray-200 dark:border-gray-700',
                    'shadow-lg shadow-black/10 dark:shadow-black/30',
                  )}
                  style={{
                    left: adjustedPosition.x,
                    top: adjustedPosition.y,
                  }}
                >
                  <MenuItems static className="outline-none">
                    {items.map((item) => (
                      <ContextMenuItem
                        key={item.id}
                        item={item}
                        onClose={closeMenu}
                      />
                    ))}
                  </MenuItems>
                </motion.div>
              </Menu>
            </>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}

export default ContextMenu;
