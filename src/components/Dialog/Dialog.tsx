'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useDragControls,
  PanInfo,
  Variants, // Import Variants
} from 'framer-motion';
import FocusLock from 'react-focus-lock';
import { Portal } from '@/HOC/Portal'; // Adjust the path as needed
import { useUIManager } from '@/components/UIManager/uiStore'; // Adjust the path as needed
import { twMerge } from 'tailwind-merge';
import { HandlebarZone } from './HandlebarZone'; // Reusing the same name
import { useDialogConfig } from './useDialogConfig';
import { v4 as uuidv4 } from 'uuid';
import SafeMotionDiv from '../Motion/SafeMotionDiv'; // Ensure you've created this wrapper

/** Defines the possible directions the dialog can slide in from */
export type DialogShowFrom = 'top' | 'bottom' | 'left' | 'right';

/** Defines where the handlebar is pinned */
export type DialogHandlebarPosition = 'top' | 'bottom' | 'left' | 'right';

/** Accessibility and behavior options */
export type DialogA11yOptions = {
  escapeClose?: boolean; // Allows closing the dialog with the Escape key
  role?: 'dialog' | 'alertdialog'; // ARIA role
  ariaLabel?: string; // Accessible label for the dialog
  ariaLabelledby?: string; // ID of the element that labels the dialog
  ariaDescribedby?: string; // ID of the element that describes the dialog
  ariaModal?: boolean; // Indicates whether the dialog is modal
  handlebarAriaLabel?: string; // Accessible label for the handlebar
  scrollable?: boolean; // Controls content scroll
};

/** Main props for the Dialog component */
export type DialogProps = {
  /** If omitted, can rely on a global store */
  isOpen?: boolean;
  /** If omitted, can rely on a global store */
  onClose?: () => void;

  /** Direction from which the dialog slides in */
  showFrom?: DialogShowFrom;
  /** Position where the handlebar is pinned */
  handlebarPosition?: DialogHandlebarPosition;

  /** If true, the dialog will have rounded edges */
  roundedEdges?: boolean;
  /** If true, applies themeable styles (e.g., dark mode) */
  themeable?: boolean;

  /** Accessibility options */
  a11yOptions?: DialogA11yOptions;

  /** If true, locks the background scroll when dialog is open */
  lockScroll?: boolean;
  /** If true, clicking outside the dialog will close it */
  closeOnOutsideClick?: boolean;

  /** Fraction of viewport for drag-based close, e.g. 0.5 => 50% */
  closeThreshold?: number;
  /** If true, displays an enhanced close box overlay */
  enhancedCloseBox?: boolean;
  /** If true, wraps children in a container for layout purposes */
  useContainer?: boolean;

  /** If true, enables a rubber band effect on drag */
  rubberBandOnDrag?: boolean;

  /** Content to display inside the dialog */
  children: React.ReactNode;
};

/**
 * Dialog Component
 *
 * This component renders a modal dialog that can slide in from any direction,
 * has a draggable handlebar, and supports various accessibility and customization options.
 */
export function Dialog({
  // Visibility controls
  isOpen,
  onClose,

  // Animation and handlebar positioning
  showFrom = 'top',
  handlebarPosition = 'top',

  // Visual customization
  roundedEdges = false,
  themeable = false,

  // Accessibility
  a11yOptions = {},

  // Behavior controls
  lockScroll = false,
  closeOnOutsideClick = true,
  closeThreshold = 0.5,
  enhancedCloseBox = false,
  useContainer = false,
  rubberBandOnDrag = false,

  // Content
  children,
}: DialogProps) {
  // Destructure accessibility options with defaults
  const {
    escapeClose = true,
    role = 'dialog',
    ariaLabel,
    ariaLabelledby,
    ariaDescribedby,
    ariaModal = true,
    handlebarAriaLabel,
    scrollable = true, // Default to true
  } = a11yOptions;

  // Determine if the dialog is open based on props or assume closed
  const isDialogOpen = isOpen ?? false;

  // Memoize handleClose to prevent unnecessary re-renders
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  // Get animation variants and classes based on showFrom
  const { variants, dialogContainerClasses, dialogClasses } =
    useDialogConfig(showFrom);

  // Initialize drag controls for handlebar
  const dragControls = useDragControls();

  // State to track if drag has surpassed the close threshold
  const [isBeyondLimit, setIsBeyondLimit] = useState(false);

  // Reference for registering with the UI manager (for Escape key handling)
  const register = useUIManager((s) => s.register);
  const unregister = useUIManager((s) => s.unregister);
  const componentId = useRef<string>(uuidv4());

  // Reference for focusing the dialog on open
  const focusRef = useRef<HTMLDivElement>(null);

  // Focus the dialog when it opens
  useEffect(() => {
    if (isDialogOpen && focusRef.current) {
      focusRef.current.focus();
    }
  }, [isDialogOpen]);

  // Register the dialog with the UI manager for Escape key handling
  useEffect(() => {
    const compId = componentId.current;
    if (isDialogOpen) {
      register({ id: compId, onEscape: escapeClose ? handleClose : undefined });
    }
    return () => {
      unregister(compId);
    };
  }, [isDialogOpen, escapeClose, handleClose, register, unregister]);

  // Lock the background scroll when the dialog is open
  useEffect(() => {
    if (isDialogOpen && lockScroll) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isDialogOpen, lockScroll]);

  /**
   * Handles the drag movement to determine if the dialog should close.
   * @param _ev - The event object.
   * @param info - Information about the drag.
   */
  function handleDrag(
    _ev: PointerEvent | MouseEvent | TouchEvent,
    info: PanInfo,
  ) {
    const { x, y } = info.offset;
    let beyond = false;

    if (rubberBandOnDrag) {
      // Minimal drag distance required to mark as beyond limit
      if (handlebarPosition === 'top' || handlebarPosition === 'bottom') {
        if (Math.abs(y) > 50) beyond = true;
      } else {
        if (Math.abs(x) > 50) beyond = true;
      }
    } else {
      // Drag must exceed the closeThreshold fraction of the viewport
      const threshold = closeThreshold;
      switch (handlebarPosition) {
        case 'top':
          if (y > window.innerHeight * threshold) beyond = true;
          break;
        case 'bottom':
          if (-y > window.innerHeight * threshold) beyond = true;
          break;
        case 'left':
          if (x > window.innerWidth * threshold) beyond = true;
          break;
        case 'right':
          if (-x > window.innerWidth * threshold) beyond = true;
          break;
      }
    }

    setIsBeyondLimit(beyond);
  }

  /**
   * Handles the end of the drag gesture.
   * Closes the dialog if the drag exceeded the threshold.
   */
  function handleDragEnd() {
    if (!rubberBandOnDrag && isBeyondLimit) {
      handleClose();
    }
    setIsBeyondLimit(false);
  }

  /**
   * Initiates the drag when the handlebar is pressed.
   * @param e - The pointer event.
   */
  function onHandlebarPointerDown(e: React.PointerEvent) {
    e.preventDefault();
    dragControls.start(e);
  }

  /**
   * Handles clicking on the handlebar to close the dialog.
   */
  function handleHandlebarClick() {
    handleClose();
  }

  // Determine classes based on props
  const roundClass = roundedEdges ? 'rounded-lg sm:rounded-xl' : '';
  const themeClass = themeable
    ? 'dark:bg-gray-800 dark:text-gray-100 bg-white text-gray-900'
    : 'bg-white text-gray-900';

  const finalDialogClasses = twMerge(dialogClasses, roundClass, themeClass);

  // Accessibility attributes
  const ariaProps: React.HTMLAttributes<HTMLDivElement> = {
    role,
    'aria-modal': ariaModal ? 'true' : undefined,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
  };

  // Determine overflow based on scrollable prop (default true)
  const contentScrollClass = scrollable ? 'overflow-auto' : 'overflow-hidden';

  // Optionally wrap children in a container
  const finalChildren = useContainer ? (
    <div className="container mx-auto p-4">{children}</div>
  ) : (
    <div className={`p-4 ${contentScrollClass}`}>{children}</div>
  );

  // Determine drag axis based on handlebarPosition
  const dragAxis: 'x' | 'y' =
    handlebarPosition === 'left' || handlebarPosition === 'right' ? 'x' : 'y';

  // Define drag properties based on rubberBandOnDrag
  const dragProps = rubberBandOnDrag
    ? {
        drag: dragAxis,
        dragControls,
        dragListener: false,
        dragElastic: 0.15,
        dragConstraints: { top: 0, bottom: 0, left: 0, right: 0 },
      }
    : {
        drag: dragAxis,
        dragControls,
        dragListener: false,
        dragElastic: 0.05,
      };

  // Define separate variants for the overlay to prevent type conflicts
  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <Portal id="dialog-portal">
      <AnimatePresence>
        {isDialogOpen && (
          <>
            {/* Overlay for outside click */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[19999]"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              aria-hidden="true"
              {...(closeOnOutsideClick ? { onClick: handleClose } : {})}
            />

            <FocusLock returnFocus>
              <SafeMotionDiv
                ref={focusRef}
                tabIndex={-1}
                className={dialogContainerClasses}
                custom={showFrom}
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                // {...ariaProps}
              >
                <SafeMotionDiv
                  className={twMerge(finalDialogClasses, 'relative')}
                  style={{ touchAction: 'none' }}
                  onDrag={handleDrag}
                  onDragEnd={handleDragEnd}
                  {...dragProps}
                >
                  {/* Handlebar pinned to the specified position */}
                  <HandlebarZone
                    position={handlebarPosition}
                    onPointerDown={onHandlebarPointerDown}
                    onClick={handleHandlebarClick}
                    isBeyondLimit={isBeyondLimit}
                    ariaLabel={handlebarAriaLabel}
                  />

                  {/* Optional Enhanced Close Box, shown only when dragging beyond limit */}
                  {enhancedCloseBox && isBeyondLimit && (
                    <AnimatePresence>
                      <motion.div
                        className="fixed inset-0 flex items-center justify-center z-[10000] pointer-events-none"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        }}
                        aria-live="assertive"
                      >
                        <motion.div
                          className="border-4 border-dashed border-blue-400 p-6 text-blue-600 dark:text-blue-400 bg-white/90 dark:bg-gray-700/90 rounded-lg shadow-lg"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          Release to close
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>
                  )}

                  {/* Dialog Content */}
                  {finalChildren}
                </SafeMotionDiv>
              </SafeMotionDiv>
            </FocusLock>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}

// src/components/Dialog/Dialog.tsx
