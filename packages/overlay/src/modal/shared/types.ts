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
  generateUniqueIds?: boolean;
  enableFocusTrap?: boolean;
  announceToScreenReader?: boolean;
};

export type DragResistanceConfig = {
  enabled?: boolean;
  threshold?: number;
  strength?: number;
  visualFeedback?: boolean;
};

export type BackdropEffectsConfig = {
  blur?: boolean;
  blurAmount?: string;
  scale?: boolean;
  scaleAmount?: number;
  backgroundOpacity?: number;
};

export type SquashStretchConfig = {
  enabled?: boolean;
  trigger?: 'start' | 'during' | 'both';
  intensity?: number;
  duration?: number;
};

export type LoadingStateConfig = {
  isLoading: boolean;
  message?: string;
  lockInteraction?: boolean;
  shimmerColor?: string;
  shimmerSpeed?: 'slow' | 'fast';
};

export type SpringConfig = {
  damping?: number;
  stiffness?: number;
  mass?: number;
};

export type DialogMaxWidthPreset = 'narrow' | 'default' | 'wide' | 'extraWide';

export type DialogSizingConfig = {
  preset?: DialogMaxWidthPreset;
  maxWidth?: number;
  minWidth?: number;
};

// Shared animation configuration
export const SPRING_CONFIG: SpringConfig = {
  damping: 28,
  stiffness: 280,
  mass: 0.8,
};

export const OVERLAY_TRANSITION = {
  duration: 0.2,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

export const SLIDE_TRANSITION = {
  type: 'spring' as const,
  ...SPRING_CONFIG,
};

// Default configurations
export const DEFAULT_BACKDROP_EFFECTS: Required<BackdropEffectsConfig> = {
  blur: true,
  blurAmount: '8px',
  scale: true,
  scaleAmount: 0.98,
  backgroundOpacity: 0.3,
};

export const DEFAULT_SQUASH_STRETCH: Required<SquashStretchConfig> = {
  enabled: true,
  trigger: 'start',
  intensity: 0.03,
  duration: 150,
};

export const DEFAULT_LOADING_STATE: Omit<
  Required<LoadingStateConfig>,
  'message'
> = {
  isLoading: false,
  lockInteraction: true,
  shimmerColor: '',
  shimmerSpeed: 'fast',
};

export const DEFAULT_A11Y_OPTIONS: Partial<A11yOptions> = {
  generateUniqueIds: true,
  enableFocusTrap: true,
  announceToScreenReader: true,
  escapeClose: true,
  lockScroll: false,
  closeOnOutsideClick: true,
  scrollable: true,
};

// Default spacing tokens (standalone - no external dependency)
export const SPACING_DEFAULTS = {
  zIndex: {
    backdrop: 9998,
    modal: 9999,
    closeIndicator: 10000,
  },
  modalSize: {
    small: 30,
    medium: 50,
    large: 75,
    full: 100,
  },
  dialogSize: {
    minWidth: 280,
    maxWidth: {
      narrow: 400,
      default: 600,
      wide: 800,
      extraWide: 1000,
    },
    viewportMax: 90,
  },
  padding: {
    handlebarClearance: 52,
  },
};

// Default motion tokens (standalone)
export const MOTION_DEFAULTS = {
  duration: {
    instant: 0,
    fast: 150,
    base: 250,
    slow: 400,
  },
  spring: {
    default: { type: 'spring' as const, damping: 25, stiffness: 300 },
    snappy: { type: 'spring' as const, damping: 20, stiffness: 400 },
    gentle: { type: 'spring' as const, damping: 30, stiffness: 200 },
    reduced: { type: 'spring' as const, damping: 50, stiffness: 300 },
  },
};
