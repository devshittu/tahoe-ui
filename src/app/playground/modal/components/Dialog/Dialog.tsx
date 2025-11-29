'use client';

import React, { useRef } from 'react';
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import { motion, useDragControls } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { Portal } from '@/HOC/Portal';
import SafeMotionDiv from '@/components/Motion/SafeMotionDiv';
import { HandlebarZone } from '../shared/HandlebarZone';
import { useDragResistance } from '../shared/useDragResistance';
import {
  createSlideVariants,
  getDragAxis,
  getDragConstraints,
  getRoundedClasses,
} from '../shared/animations';
import { OVERLAY_TRANSITION } from '../shared/types';
import type {
  Position,
  A11yOptions,
  DragResistanceConfig,
} from '../shared/types';

export type DialogProps = {
  isOpen?: boolean;
  onClose?: () => void;
  showFrom?: Position;
  handlebarPosition?: Position;
  roundedEdges?: boolean;
  themeable?: boolean;
  a11yOptions?: A11yOptions;
  lockScroll?: boolean;
  closeOnOutsideClick?: boolean;
  closeThreshold?: number;
  enhancedCloseBox?: boolean;
  useContainer?: boolean;
  resistance?: DragResistanceConfig;
  children: React.ReactNode;
};

/**
 * Dialog Component - Refactored with HeadlessUI
 *
 * Features:
 * - HeadlessUI foundation for accessibility
 * - Enhanced drag physics with resistance
 * - Smooth, natural animations
 * - Direction-aware gestures
 */
export function Dialog({
  isOpen = false,
  onClose,
  showFrom = 'top',
  handlebarPosition = 'top',
  roundedEdges = false,
  themeable = false,
  a11yOptions = {},
  lockScroll = false,
  closeOnOutsideClick = true,
  closeThreshold = 0.5,
  enhancedCloseBox = false,
  useContainer = false,
  resistance,
  children,
}: DialogProps) {
  const {
    escapeClose = true,
    role = 'dialog',
    ariaLabel,
    ariaLabelledby,
    ariaDescribedby,
    handlebarAriaLabel,
    scrollable = true,
  } = a11yOptions;

  const handleClose = onClose || (() => {});

  // Drag controls
  const dragControls = useDragControls();
  const dragAxis = getDragAxis(handlebarPosition);
  const dragConstraints = getDragConstraints(handlebarPosition);

  // Enhanced drag resistance
  const { dragState, handleDrag, handleDragEnd } = useDragResistance({
    position: handlebarPosition,
    closeThreshold,
    resistance,
    onClose: handleClose,
  });

  // Animation variants
  const variants = createSlideVariants(showFrom);

  // Styling
  const roundClass = getRoundedClasses(showFrom, roundedEdges);
  const themeClass = themeable
    ? 'dark:bg-gray-800 dark:text-gray-100 bg-white text-gray-900'
    : 'bg-white text-gray-900';
  const contentScrollClass = scrollable ? 'overflow-auto' : 'overflow-hidden';

  // Get padding based on handlebar position to avoid overlap
  // Uses responsive units to match handlebar size
  const getContentPadding = () => {
    const responsivePadding = 'p-[max(8vh,60px)]'; // Matches handlebar height/width
    const normalPadding = 'p-4';

    switch (handlebarPosition) {
      case 'top':
        return `pt-[max(8vh,60px)] pb-4 px-4`; // Handlebar at top
      case 'bottom':
        return `pt-4 pb-[max(8vh,60px)] px-4`; // Handlebar at bottom
      case 'left':
        return `pl-[max(8vw,60px)] pr-4 py-4`; // Handlebar at left
      case 'right':
        return `pr-[max(8vw,60px)] pl-4 py-4`; // Handlebar at right
    }
  };

  const dialogClasses = twMerge(
    'relative w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg shadow-xl rounded-2xl max-h-[90vh] flex flex-col overflow-hidden', // Max height + flex for scroll
    themeClass,
  );

  // Gesture handlers
  const onHandlebarPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    dragControls.start(e);
  };

  const handleHandlebarClick = () => handleClose();

  // Content wrapper with proper scroll
  const finalChildren = useContainer ? (
    <div
      className={`container mx-auto flex-1 ${contentScrollClass} ${getContentPadding()}`}
    >
      {children}
    </div>
  ) : (
    <div className={`flex-1 ${contentScrollClass} ${getContentPadding()}`}>
      {children}
    </div>
  );

  return (
    <Portal id="dialog-portal">
      <HeadlessDialog
        open={isOpen}
        onClose={closeOnOutsideClick && escapeClose ? handleClose : () => {}}
        className="relative z-[20000]"
      >
        {/* Backdrop with smooth transition */}
        <Transition.Child
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
            {...(closeOnOutsideClick ? { onClick: handleClose } : {})}
          />
        </Transition.Child>

        {/* Dialog container */}
        <div className="fixed inset-0 flex items-center justify-center px-4">
          <Transition.Child
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <HeadlessDialog.Panel
              as={SafeMotionDiv}
              className={dialogClasses}
              custom={showFrom}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              drag={dragAxis}
              dragControls={dragControls}
              dragListener={false}
              dragElastic={0.05}
              dragConstraints={dragConstraints}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              style={{ touchAction: 'none' }}
            >
              {/* Handlebar */}
              <HandlebarZone
                position={handlebarPosition}
                onPointerDown={onHandlebarPointerDown}
                onClick={handleHandlebarClick}
                isBeyondLimit={dragState.isBeyondLimit}
                resistanceIntensity={dragState.resistanceIntensity}
                ariaLabel={handlebarAriaLabel}
              />

              {/* Enhanced close indicator */}
              {enhancedCloseBox && dragState.shouldClose && (
                <motion.div
                  className="fixed inset-0 flex items-center justify-center z-[10000] pointer-events-none"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    damping: 25,
                    stiffness: 300,
                  }}
                  aria-live="assertive"
                >
                  <div className="border-4 border-dashed border-blue-400 p-6 text-blue-600 dark:text-blue-400 bg-white/90 dark:bg-gray-700/90 rounded-lg shadow-lg">
                    Release to close
                  </div>
                </motion.div>
              )}

              {/* Content */}
              {finalChildren}
            </HeadlessDialog.Panel>
          </Transition.Child>
        </div>
      </HeadlessDialog>
    </Portal>
  );
}
