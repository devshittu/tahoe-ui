// src/components/Toast/ToastContainer.tsx
'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useToastState } from './store';
import { Toast } from './Toast';
import type { ToastPosition } from './types';

/**
 * Position classes for toast container
 */
const positionClasses: Record<ToastPosition, string> = {
  'top-left': 'top-4 left-4 items-start',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'top-right': 'top-4 right-4 items-end',
  'bottom-left': 'bottom-4 left-4 items-start',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'bottom-4 right-4 items-end',
};

interface ToastContainerProps {
  /** Override default position */
  position?: ToastPosition;
  /** Custom className for container */
  className?: string;
}

/**
 * ToastContainer - renders all active toasts
 *
 * Features:
 * - Portal rendering to document body
 * - Configurable position
 * - Staggered animations
 * - Responsive width
 *
 * Design Principles:
 * - #19 Immediate, Unambiguous Feedback: Visible notification area
 * - #13 Predictable Navigation: Consistent toast position
 * - #3 Intentional White Space: Proper spacing from edges
 */
export function ToastContainer({
  position: positionOverride,
  className,
}: ToastContainerProps) {
  const { toasts, position: storePosition, gap } = useToastState();
  const position = positionOverride ?? storePosition;
  const [mounted, setMounted] = React.useState(false);

  // Ensure client-side rendering for portal
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Reverse order for top positions (newest at top)
  const isTop = position.startsWith('top');
  const orderedToasts = isTop ? [...toasts].reverse() : toasts;

  const container = (
    <div
      className={cn(
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
