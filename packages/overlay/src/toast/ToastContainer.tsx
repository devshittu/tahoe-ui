'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useToastState } from './store';
import { Toast } from './Toast';
import type { ToastPosition } from './types';

const positionClasses: Record<ToastPosition, string> = {
  'top-left': 'top-4 left-4 items-start',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'top-right': 'top-4 right-4 items-end',
  'bottom-left': 'bottom-4 left-4 items-start',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'bottom-4 right-4 items-end',
};

interface ToastContainerProps {
  position?: ToastPosition;
  className?: string;
}

/**
 * ToastContainer - renders all active toasts
 */
export function ToastContainer({
  position: positionOverride,
  className,
}: ToastContainerProps) {
  const { toasts, position: storePosition, gap } = useToastState();
  const position = positionOverride ?? storePosition;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isTop = position.startsWith('top');
  const orderedToasts = isTop ? [...toasts].reverse() : toasts;

  const container = (
    <div
      className={twMerge(
        'fixed z-[9999] flex flex-col pointer-events-none',
        'w-full max-w-sm px-4 sm:px-0',
        positionClasses[position],
        className,
      )}
      style={{ gap: `${gap}px` }}
      aria-label="Notifications"
      role="region"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {orderedToasts.map((toast, index) => (
          <div key={toast.id} className="pointer-events-auto w-full">
            <Toast toast={toast} position={position} index={index} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );

  return createPortal(container, document.body);
}

export default ToastContainer;
