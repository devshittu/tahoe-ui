// src/components/ui/ConfirmationPopover.tsx
'use client';

import React, {
  ReactNode,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import {
  computePosition,
  offset,
  flip,
  shift,
  arrow,
  autoUpdate,
} from '@floating-ui/dom';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { FiAlertTriangle } from 'react-icons/fi';

export interface ConfirmationPopoverProps {
  isOpen: boolean;
  children: ReactNode;
  message?: string;
  destructive?: boolean;
  startTime?: number;
  timeout?: number;
  className?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export function ConfirmationPopover({
  isOpen,
  children,
  message = 'Click again to confirm',
  destructive = true,
  startTime = 0,
  timeout = 5000,
  className = '',
  placement = 'top',
}: ConfirmationPopoverProps) {
  const arrowRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const referenceRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(1);
  const rafRef = useRef<number | undefined>(undefined);
  const cleanupRef = useRef<(() => void) | null>(null);

  // Calculate progress using RAF
  useEffect(() => {
    if (!isOpen || !startTime) {
      setProgress(1);
      return;
    }

    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const remaining = Math.max(0, timeout - elapsed);
      const progressValue = remaining / timeout;

      setProgress(progressValue);

      if (progressValue > 0) {
        rafRef.current = requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();

    return () => {
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isOpen, startTime, timeout]);

  // Position the floating element using computePosition
  useEffect(() => {
    const referenceEl = referenceRef.current;
    const floatingEl = floatingRef.current;
    const arrowEl = arrowRef.current;

    if (!referenceEl || !floatingEl || !isOpen) {
      return;
    }

    const ARROW_HEIGHT = 7;
    const GAP = 4;

    const update = () => {
      computePosition(referenceEl, floatingEl, {
        placement,
        middleware: [
          offset(ARROW_HEIGHT + GAP),
          flip({ padding: 8 }),
          shift({ padding: 8 }),
          arrow({ element: arrowEl!, padding: 4 }),
        ],
      }).then(({ x, y, placement: finalPlacement, middlewareData }) => {
        Object.assign(floatingEl.style, {
          left: `${x}px`,
          top: `${y}px`,
        });

        // Position arrow
        if (arrowEl && middlewareData.arrow) {
          const { x: arrowX, y: arrowY } = middlewareData.arrow;
          const staticSide = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right',
          }[finalPlacement.split('-')[0]] as string;

          Object.assign(arrowEl.style, {
            left: arrowX != null ? `${arrowX}px` : '',
            top: arrowY != null ? `${arrowY}px` : '',
            right: '',
            bottom: '',
            [staticSide]: '-4px',
          });
        }
      });
    };

    // Initial update
    update();

    // Auto-update on scroll/resize
    cleanupRef.current = autoUpdate(referenceEl, floatingEl, update);

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [isOpen, placement]);

  const progressPercentage = Math.round(progress * 100);

  // Stable ref callback
  const setReferenceRef = useCallback((node: HTMLElement | null) => {
    referenceRef.current = node;
  }, []);

  // Get child element
  const child = React.Children.only(children) as React.ReactElement;

  // Memoize cloned child - this prevents cloneElement during every render
  // The cloning only happens when child changes
  const clonedChild = React.useMemo(
    () =>
      React.cloneElement(child, {
        ref: setReferenceRef,
      } as any),
    [child, setReferenceRef],
  );

  return (
    <>
      {clonedChild}

      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={floatingRef}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 30,
                  mass: 0.8,
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 9999,
                }}
                className={className}
              >
                <div
                  className={`
                    relative px-4 py-3 rounded-lg shadow-xl
                    backdrop-blur-md
                    ${
                      destructive
                        ? 'bg-red-500/95 dark:bg-red-600/95 text-white'
                        : 'bg-slate-900/95 dark:bg-slate-800/95 text-white'
                    }
                    border
                    ${
                      destructive
                        ? 'border-red-400/50 dark:border-red-500/50'
                        : 'border-slate-700/50 dark:border-slate-600/50'
                    }
                  `}
                >
                  {/* Arrow */}
                  <div
                    ref={arrowRef}
                    className={`absolute w-3 h-3 rotate-45 ${
                      destructive
                        ? 'bg-red-500 dark:bg-red-600'
                        : 'bg-slate-900 dark:bg-slate-800'
                    }`}
                  />

                  {/* Content */}
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <FiAlertTriangle className="w-5 h-5 flex-shrink-0" />
                    </motion.div>

                    <div className="flex-1">
                      <p className="text-sm font-semibold leading-tight">
                        {message}
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white/70 rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.05, ease: 'linear' }}
                    />
                  </div>

                  {/* Remaining time */}
                  <div className="mt-1 text-xs text-white/60 text-center">
                    {Math.ceil((progress * timeout) / 1000)}s remaining
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
