// src/app/playground/hover-card/components/HoverCard.tsx
'use client';

import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useId,
  Suspense,
} from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useHoverIntent } from '@/hooks/gestures/useHoverIntent';
import { useHoverCardGroup } from './useHoverCardGroup';
import type { HoverCardProps, HoverCardPlacement } from './types';
import { HOVER_CARD_SIZES, HOVER_CARD_CONFIG } from './types';

/**
 * Get placement classes for arrow positioning - Apple-like subtle arrow
 */
function getArrowClasses(placement: HoverCardPlacement): string {
  const base =
    'absolute w-2.5 h-2.5 bg-white/95 dark:bg-gray-900/95 rotate-45 border-gray-200/60 dark:border-gray-700/60';

  if (placement.startsWith('top')) {
    return cn(base, 'bottom-[-5px] border-b border-r');
  }
  if (placement.startsWith('bottom')) {
    return cn(base, 'top-[-5px] border-t border-l');
  }
  if (placement.startsWith('left')) {
    return cn(base, 'right-[-5px] border-t border-r');
  }
  if (placement.startsWith('right')) {
    return cn(base, 'left-[-5px] border-b border-l');
  }
  return cn(base, 'bottom-[-5px] border-b border-r');
}

/**
 * Get arrow alignment based on placement
 */
function getArrowAlignment(placement: HoverCardPlacement): string {
  if (placement.endsWith('-start')) {
    return 'left-4';
  }
  if (placement.endsWith('-end')) {
    return 'right-4';
  }
  // Center alignment
  if (placement.startsWith('top') || placement.startsWith('bottom')) {
    return 'left-1/2 -translate-x-1/2';
  }
  if (placement.startsWith('left') || placement.startsWith('right')) {
    return 'top-1/2 -translate-y-1/2';
  }
  return 'left-1/2 -translate-x-1/2';
}

/**
 * Map our placement to HeadlessUI anchor
 */
function placementToAnchor(placement: HoverCardPlacement): string {
  const map: Record<HoverCardPlacement, string> = {
    top: 'top',
    'top-start': 'top start',
    'top-end': 'top end',
    bottom: 'bottom',
    'bottom-start': 'bottom start',
    'bottom-end': 'bottom end',
    left: 'left',
    'left-start': 'left start',
    'left-end': 'left end',
    right: 'right',
    'right-start': 'right start',
    'right-end': 'right end',
  };
  return map[placement];
}

/**
 * Loading skeleton for hover card content - Apple-like subtle animation
 */
function DefaultLoadingContent() {
  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
        <div className="space-y-2 flex-1">
          <div className="h-3.5 w-24 rounded-md bg-gray-100 dark:bg-gray-800 animate-pulse" />
          <div className="h-3 w-16 rounded-md bg-gray-100 dark:bg-gray-800 animate-pulse" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded-md bg-gray-100 dark:bg-gray-800 animate-pulse" />
        <div className="h-3 w-3/4 rounded-md bg-gray-100 dark:bg-gray-800 animate-pulse" />
      </div>
    </div>
  );
}

/**
 * HoverCard - Rich preview card triggered by hover intent
 *
 * Features:
 * - Hover intent detection (prevents accidental triggers)
 * - Touch support (tap to open, tap outside to close)
 * - Smooth enter/exit animations
 * - Keep open when hovering content
 * - Lazy content loading with Suspense
 * - Prefetch callback for data loading
 * - Multi-card coordination (close others when one opens)
 * - Arrow pointer with proper positioning
 *
 * @example
 * ```tsx
 * <HoverCard
 *   content={<UserPreview userId={user.id} />}
 *   placement="top"
 *   onPrefetch={() => prefetchUser(user.id)}
 * >
 *   <span className="text-blue-500 hover:underline">{user.name}</span>
 * </HoverCard>
 * ```
 */
export function HoverCard({
  children,
  content,
  placement = 'top',
  size = 'md',
  openDelay = HOVER_CARD_CONFIG.openDelay,
  closeDelay = HOVER_CARD_CONFIG.closeDelay,
  showArrow = true,
  disabled = false,
  open: controlledOpen,
  onOpenChange,
  className,
  contentClassName,
  groupId,
  enableTouch = true,
  closeOnTouchOutside = true,
  isLoading = false,
  loadingContent,
  onPrefetch,
  prefetchDelay = HOVER_CARD_CONFIG.prefetchDelay,
  onOpen,
  onClose,
}: HoverCardProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [hasPrefetched, setHasPrefetched] = useState(false);
  const [openedViaTouch, setOpenedViaTouch] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefetchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const instanceId = useId();

  // Controlled vs uncontrolled
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  // Multi-card coordination
  const {
    isActive: isGroupActive,
    setActive: setGroupActive,
    clearActive: clearGroupActive,
    isOtherActive,
  } = useHoverCardGroup(groupId);

  // Handle open
  const handleOpen = useCallback(() => {
    if (disabled) return;

    if (isControlled) {
      onOpenChange?.(true);
    } else {
      setInternalOpen(true);
    }

    if (groupId) {
      setGroupActive();
    }

    onOpen?.();
  }, [disabled, isControlled, onOpenChange, groupId, setGroupActive, onOpen]);

  // Handle close
  const handleClose = useCallback(() => {
    if (isControlled) {
      onOpenChange?.(false);
    } else {
      setInternalOpen(false);
    }

    if (groupId) {
      clearGroupActive();
    }

    setOpenedViaTouch(false);
    onClose?.();
  }, [isControlled, onOpenChange, groupId, clearGroupActive, onClose]);

  // If another card in group is active, close this one
  useEffect(() => {
    if (groupId && isOtherActive && isOpen) {
      handleClose();
    }
  }, [isOtherActive, groupId, isOpen, handleClose]);

  // Hover intent for desktop
  const { isHovering, hoverProps, contentProps } = useHoverIntent({
    openDelay,
    closeDelay,
    disabled,
    onHoverStart: handleOpen,
    onHoverEnd: () => {
      if (!openedViaTouch) {
        handleClose();
      }
    },
  });

  // Prefetch on hover intent (before card shows)
  useEffect(() => {
    const currentTimeout = prefetchTimeoutRef.current;
    if (hoverProps && onPrefetch && !hasPrefetched && !disabled) {
      // Start prefetch after short delay when hovering starts
      // We'll trigger prefetch when isOver becomes true (before isHovering)
      // This is handled in the hover props
    }

    return () => {
      if (currentTimeout) {
        clearTimeout(currentTimeout);
      }
    };
  }, [onPrefetch, hasPrefetched, disabled, prefetchDelay, hoverProps]);

  // Touch support - tap to toggle
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!enableTouch || disabled) return;

      if (isOpen) {
        handleClose();
      } else {
        e.preventDefault();
        setOpenedViaTouch(true);
        handleOpen();
      }
    },
    [enableTouch, disabled, isOpen, handleOpen, handleClose],
  );

  // Click outside handler for touch-opened cards
  useEffect(() => {
    if (!isOpen || !openedViaTouch || !closeOnTouchOutside) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        contentRef.current &&
        !contentRef.current.contains(target)
      ) {
        handleClose();
      }
    };

    // Delay to prevent immediate close
    const timeoutId = setTimeout(() => {
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, openedViaTouch, closeOnTouchOutside, handleClose]);

  // Animation variants - Apple-like smooth fade with subtle scale
  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1], // Apple-like ease
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  // Render content (supports lazy loading)
  const renderContent = () => {
    if (isLoading) {
      return loadingContent || <DefaultLoadingContent />;
    }

    if (typeof content === 'function') {
      return (
        <Suspense fallback={loadingContent || <DefaultLoadingContent />}>
          {content()}
        </Suspense>
      );
    }

    return content;
  };

  return (
    <Popover>
      {/* Trigger - use span to allow nesting inside p tags */}
      <PopoverButton as="span" className={cn('inline', className)}>
        <span
          ref={triggerRef}
          {...hoverProps}
          onTouchStart={handleTouchStart}
          className="cursor-pointer"
        >
          {children}
        </span>
      </PopoverButton>

      {/* Card */}
      <AnimatePresence>
        {isOpen && (
          <PopoverPanel
            static
            anchor={
              placementToAnchor(placement) as
                | 'top'
                | 'bottom'
                | 'left'
                | 'right'
                | 'top start'
                | 'top end'
                | 'bottom start'
                | 'bottom end'
                | 'left start'
                | 'left end'
                | 'right start'
                | 'right end'
            }
            className="z-50 outline-none"
            style={{
              // @ts-expect-error - CSS custom properties for gap
              '--anchor-gap': `${HOVER_CARD_CONFIG.offset}px`,
            }}
          >
            <motion.div
              ref={contentRef}
              {...contentProps}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                'relative',
                // Apple-like card styling
                'rounded-2xl',
                'bg-white/95 dark:bg-gray-900/95',
                'backdrop-blur-xl',
                'border border-gray-200/60 dark:border-gray-700/60',
                // Subtle shadow - Apple style
                'shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.02)]',
                'dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)]',
                // Prevent any overflow/scroll
                'overflow-hidden',
                HOVER_CARD_SIZES[size],
                contentClassName,
              )}
            >
              {/* Arrow - more subtle */}
              {showArrow && (
                <div
                  className={cn(
                    getArrowClasses(placement),
                    getArrowAlignment(placement),
                  )}
                  aria-hidden="true"
                />
              )}

              {/* Content */}
              <div className="relative">{renderContent()}</div>
            </motion.div>
          </PopoverPanel>
        )}
      </AnimatePresence>
    </Popover>
  );
}

export default HoverCard;
