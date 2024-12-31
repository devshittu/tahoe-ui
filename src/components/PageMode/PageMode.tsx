'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useDragControls,
  PanInfo,
  HTMLMotionProps,
  Variants,
} from 'framer-motion';
import FocusLock from 'react-focus-lock';
import { Portal } from '@/HOC/Portal';
import { useUIManager } from '../UIManager/uiStore';
import { twMerge } from 'tailwind-merge';
import { CardStack } from '@/components/background/CardStack';
import { trackPageModeEvent } from '@/components/analytics/analytics';
import { t } from '@/app/i18n';
import { usePageModeConfig } from './usePageModeConfig';
import { HandlebarZone } from './HandlebarZone';
import { v4 as uuidv4 } from 'uuid';
import SafeMotionDiv from '../Motion/SafeMotionDiv'; // Ensure correct path
import { useUIComponent } from '@/stores/useUIComponent';

// Allowed positions for the page mode
export type PageModePosition = 'top' | 'bottom' | 'left' | 'right';

// Accessibility options for the dialog
export type A11yOptions = {
  escapeClose?: boolean;
  role?: 'dialog' | 'alertdialog';
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  ariaModal?: boolean;
  handlebarAriaLabel?: string;
  lockScroll?: boolean;
  closeOnOutsideClick?: boolean;
};

// Main props for PageMode
type PageModeProps = {
  position?: PageModePosition;
  a11yOptions?: A11yOptions;
  useContainer?: boolean;
  roundedEdges?: boolean;
  themeable?: boolean;
  closeThreshold?: number;
  enhancedCloseBox?: boolean;

  /**
   * If false, the content area is not scrollable (e.g., for left/right transitions).
   * Default is true.
   */
  enableContentScroll?: boolean;
};

export function PageMode({
  position = 'bottom',
  a11yOptions = {},
  useContainer = false,
  roundedEdges = false,
  themeable = false,
  closeThreshold = 0.5,
  enhancedCloseBox = true,
  enableContentScroll = true, // default to true
}: PageModeProps) {
  // Deconstruct a11y options
  const {
    escapeClose = true,
    role = 'dialog',
    ariaLabel,
    ariaLabelledby,
    ariaDescribedby,
    ariaModal = true,
    handlebarAriaLabel,
    lockScroll = false,
    closeOnOutsideClick = true,
  } = a11yOptions;

  // Pull from global UI store
  const { isOpen, isClosing, content, close } = useUIComponent();

  // Framer Motion
  const dragControls = useDragControls();
  const [showCloseZone, setShowCloseZone] = useState(false);
  const [isBeyondLimit, setIsBeyondLimit] = useState(false);

  // PageMode Config
  const {
    variants,
    dragDirection,
    dragConstraints,
    dragElastic,
    layoutStyles,
  } = usePageModeConfig(position);
  const normalizedCloseThreshold = Math.min(Math.max(closeThreshold, 0), 1);

  // ID for UI Manager registration
  const componentId = useRef(uuidv4());
  const register = useUIManager((s) => s.register);
  const unregister = useUIManager((s) => s.unregister);

  // Focus management
  const focusRef = useRef<HTMLDivElement | null>(null);

  // Autofocus if open
  useEffect(() => {
    if (isOpen && focusRef.current) {
      focusRef.current.focus();
    }
  }, [isOpen]);

  // Register/unregister with UI manager
  useEffect(() => {
    const currentId = componentId.current;
    if (isOpen) {
      register({ id: currentId, onEscape: escapeClose ? close : undefined });
      trackPageModeEvent('PageModeOpened');
    }
    return () => {
      if (currentId) {
        unregister(currentId);
        // Only track close event if was open and is now closing
        if (isOpen && isClosing) {
          trackPageModeEvent('PageModeClosed');
        }
      }
    };
  }, [isOpen, isClosing, close, escapeClose, register, unregister]);

  // Lock scroll if specified
  useEffect(() => {
    if (isOpen && lockScroll) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [isOpen, lockScroll]);

  /**
   * Handles the drag movement to determine if the dialog should close.
   * @param event - The event object.
   * @param info - Information about the drag.
   */
  const handleDrag = (
    event: PointerEvent | MouseEvent | TouchEvent,
    info: PanInfo,
  ) => {
    const { x, y } = info.offset;
    let inCloseZone = false;

    // Check if we exceed threshold for closing
    if (
      position === 'bottom' &&
      y > window.innerHeight * normalizedCloseThreshold
    )
      inCloseZone = true;
    if (
      position === 'top' &&
      -y > window.innerHeight * normalizedCloseThreshold
    )
      inCloseZone = true;
    if (
      position === 'left' &&
      -x > window.innerWidth * normalizedCloseThreshold
    )
      inCloseZone = true;
    if (
      position === 'right' &&
      x > window.innerWidth * normalizedCloseThreshold
    )
      inCloseZone = true;
    setShowCloseZone(inCloseZone);

    // Track if we exceed the container in the opposite direction
    let beyondLimit = false;
    if (position === 'bottom' && y < 0) beyondLimit = true;
    if (position === 'top' && y > 0) beyondLimit = true;
    if (position === 'left' && x > 0) beyondLimit = true;
    if (position === 'right' && x < 0) beyondLimit = true;
    setIsBeyondLimit(beyondLimit);
  };

  /**
   * Handles the end of the drag gesture.
   * Closes the dialog if the drag exceeded the threshold.
   * @param event - The event object.
   * @param info - Information about the drag.
   */
  const handleDragEnd = (
    event: PointerEvent | MouseEvent | TouchEvent,
    info: PanInfo,
  ) => {
    const { x, y } = info.offset;

    if (
      position === 'bottom' &&
      y > window.innerHeight * normalizedCloseThreshold
    )
      close();
    if (
      position === 'top' &&
      -y > window.innerHeight * normalizedCloseThreshold
    )
      close();
    if (
      position === 'left' &&
      -x > window.innerWidth * normalizedCloseThreshold
    )
      close();
    if (
      position === 'right' &&
      x > window.innerWidth * normalizedCloseThreshold
    )
      close();

    setShowCloseZone(false);
    setIsBeyondLimit(false);
  };

  const handleHandlebarClick = () => close();

  const onHandlebarPointerDown = (event: React.PointerEvent) => {
    event.preventDefault();
    dragControls.start(event);
  };

  // Rounded edges depending on position
  function getRoundedClasses(pos: PageModePosition) {
    switch (pos) {
      case 'bottom':
        return 'rounded-t-xl sm:rounded-t-2xl';
      case 'top':
        return 'rounded-b-xl sm:rounded-b-2xl';
      case 'left':
        return 'rounded-r-xl sm:rounded-r-2xl';
      case 'right':
        return 'rounded-l-xl sm:rounded-l-2xl';
      default:
        return '';
    }
  }

  // Container classes for main motion div
  const containerClasses = twMerge(
    'fixed z-[9999] flex flex-col h-full will-change-transform shadow-xl',
    roundedEdges && getRoundedClasses(position),
    themeable ? 'dark:bg-gray-800 bg-white' : 'bg-white text-gray-900',
  );

  // Accessibility-related props
  const dialogProps: Partial<HTMLMotionProps<'div'>> = {
    role,
    'aria-modal': ariaModal ? 'true' : undefined,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
  };

  // If enableContentScroll = false => 'overflow-hidden', else handle by position
  let contentOverflow: string;
  if (!enableContentScroll) {
    contentOverflow = 'overflow-hidden';
  } else {
    if (position === 'top' || position === 'bottom') {
      contentOverflow = 'overflow-y-auto';
    } else {
      contentOverflow = 'overflow-hidden';
    }
  }

  // Minimal margin if top or bottom to not overlap handlebar
  const marginClass =
    position === 'bottom' ? 'mt-12' : position === 'top' ? 'mb-12' : '';

  const renderedContent = useContainer ? (
    <div className="container mx-auto h-full">{content}</div>
  ) : (
    content
  );

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden="true"
              {...(closeOnOutsideClick ? { onClick: close } : {})}
            >
              <CardStack />
            </motion.div>

            {/* Close zone overlay */}
            {showCloseZone && enhancedCloseBox && (
              <AnimatePresence>
                <motion.div
                  className="fixed inset-0 flex items-center justify-center z-[10000] pointer-events-none"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  aria-live="assertive"
                >
                  <motion.div
                    className="border-4 border-dashed border-blue-400 p-6 text-blue-600 dark:text-blue-400 bg-white/90 dark:bg-gray-700/90 rounded-lg shadow-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {t('releaseToClose')}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}

            <FocusLock returnFocus>
              <SafeMotionDiv
                {...dialogProps}
                ref={focusRef}
                tabIndex={-1}
                className={containerClasses}
                style={layoutStyles}
                custom={position}
                variants={variants}
                initial="hidden"
                animate={isClosing ? 'exit' : 'visible'}
                exit="exit"
                drag={dragDirection}
                dragControls={dragControls}
                dragListener={false}
                dragElastic={dragElastic}
                dragConstraints={dragConstraints}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
              >
                {/* Handlebar for drag */}
                <HandlebarZone
                  position={position}
                  onPointerDown={onHandlebarPointerDown}
                  onClick={handleHandlebarClick}
                  isBeyondLimit={isBeyondLimit}
                  ariaLabel={handlebarAriaLabel}
                />

                <div
                  className={twMerge(
                    'flex-1 p-4',
                    contentOverflow,
                    marginClass,
                  )}
                >
                  {renderedContent}
                </div>
              </SafeMotionDiv>
            </FocusLock>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}

// src/components/PageMode/PageMode.tsx
