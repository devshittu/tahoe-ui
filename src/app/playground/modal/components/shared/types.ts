// Shared types for Dialog and PageMode components
export type Position = 'top' | 'bottom' | 'left' | 'right';

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
  scrollable?: boolean;
};

export type DragResistanceConfig = {
  enabled?: boolean;
  threshold?: number; // Distance in px before resistance kicks in
  strength?: number; // 0-1, how strong the resistance force
  visualFeedback?: boolean; // Show handle darkening/scaling
};

export type SpringConfig = {
  damping?: number;
  stiffness?: number;
  mass?: number;
};

// Shared animation configuration with improved physics
export const SPRING_CONFIG: SpringConfig = {
  damping: 28, // Reduced oscillation
  stiffness: 280, // Slower, more fluid
  mass: 0.8, // More responsive
};

export const OVERLAY_TRANSITION = {
  duration: 0.2,
  ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smooth fade
};

export const SLIDE_TRANSITION = {
  type: 'spring' as const,
  ...SPRING_CONFIG,
};
