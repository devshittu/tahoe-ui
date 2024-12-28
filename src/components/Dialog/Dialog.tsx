'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import FocusLock from 'react-focus-lock';
import { Portal } from '@/HOC/Portal';
import { useUIManager } from '../UIManager/uiStore';
import { twMerge } from 'tailwind-merge';
import { HandlebarZone } from './HandlebarZone';
import { useDialogConfig } from './useDialogConfig';
import { v4 as uuidv4 } from 'uuid';
import type { DialogProps } from './types';

type ExtendedDialogProps = DialogProps & {
  rubberBandOnDrag?: boolean;
};

export function Dialog({
  isOpen,
  onClose,
  showFrom = 'top',
  handlebarPosition = 'top',
  roundedEdges = false,
  themeable = false,
  a11yOptions = {},
  children,
  rubberBandOnDrag = false,
}: ExtendedDialogProps) {
  const {
    escapeClose = true,
    ariaLabel,
    ariaLabelledby,
    ariaDescribedby,
    ariaModal = true,
    lockScroll = false,
    closeOnOutsideClick = true,
  } = a11yOptions;

  const { variants, dialogContainerClasses, dialogClasses } =
    useDialogConfig(showFrom);
  const dragControls = useDragControls();
  const [isBeyondLimit, setIsBeyondLimit] = useState(false);
  const componentId = useRef(uuidv4());

  const register = useUIManager((s) => s.register);
  const unregister = useUIManager((s) => s.unregister);
  const focusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && focusRef.current) {
      focusRef.current.focus();
    }
  }, [isOpen]);
  useEffect(() => {
    const currentComponentId = componentId.current; // Copy to a stable variable

    if (isOpen) {
      register({
        id: currentComponentId,
        onEscape: escapeClose ? onClose : undefined,
      });
    }

    return () => {
      unregister(currentComponentId);
    };
  }, [isOpen, onClose, escapeClose, register, unregister]);

  useEffect(() => {
    if (isOpen && lockScroll) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [isOpen, lockScroll]);

  const pullDist = 50;
  const threshold = 0.6; // For non-rubber band

  const handleDrag = (
    e: PointerEvent,
    info: { offset: { x: number; y: number } },
  ) => {
    const { x, y } = info.offset;
    let beyond = false;

    if (rubberBandOnDrag) {
      if (handlebarPosition === 'top' || handlebarPosition === 'bottom') {
        if (Math.abs(y) > pullDist) beyond = true;
      } else {
        if (Math.abs(x) > pullDist) beyond = true;
      }
    } else {
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
  };

  const handleDragEnd = () => {
    if (!rubberBandOnDrag && isBeyondLimit) onClose();
    setIsBeyondLimit(false);
  };

  const onHandlebarPointerDown = (event: React.PointerEvent) => {
    event.preventDefault();
    dragControls.start(event);
  };

  const handleHandlebarClick = () => onClose();

  const roundedClasses = roundedEdges ? 'rounded-lg sm:rounded-xl' : '';
  const themeClasses = themeable
    ? 'dark:bg-gray-800 dark:text-gray-100 bg-white text-gray-900'
    : 'bg-white text-gray-900';

  const finalDialogClasses = twMerge(
    dialogClasses,
    roundedClasses,
    themeClasses,
  );

  // **Make it stiffer** => reduce dragElastic
  // const dragAxis =
  //   handlebarPosition === 'top' || handlebarPosition === 'bottom' ? 'y' : 'x';

  const dragAxis: 'x' | 'y' =
    handlebarPosition === 'top' || handlebarPosition === 'bottom' ? 'y' : 'x';
  const dragProps = rubberBandOnDrag
    ? {
        drag: dragAxis,
        dragControls,
        dragListener: false,
        dragElastic: 0.15, // stiffer
        dragConstraints: { top: 0, bottom: 0, left: 0, right: 0 },
      }
    : {
        drag: dragAxis,
        dragControls,
        dragListener: false,
        dragElastic: 0.05, // stiffer than before
      };

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[19999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeOnOutsideClick ? onClose : undefined}
              aria-hidden="true"
            />

            <FocusLock returnFocus>
              <motion.div
                ref={focusRef}
                tabIndex={-1} // Make it focusable
                className={dialogContainerClasses}
                custom={showFrom}
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div
                  role="dialog"
                  aria-modal={ariaModal ? 'true' : undefined}
                  aria-label={ariaLabel}
                  aria-labelledby={ariaLabelledby}
                  aria-describedby={ariaDescribedby}
                  className={finalDialogClasses + ' relative'}
                  style={{ touchAction: 'none' }}
                  onDrag={handleDrag}
                  onDragEnd={handleDragEnd}
                  {...dragProps}
                >
                  <HandlebarZone
                    position={handlebarPosition}
                    onPointerDown={onHandlebarPointerDown}
                    onClick={handleHandlebarClick}
                    isBeyondLimit={isBeyondLimit}
                  />

                  <div className="p-4 overflow-auto">{children}</div>
                </motion.div>
              </motion.div>
            </FocusLock>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}
// src/components/Dialog/Dialog.tsx
