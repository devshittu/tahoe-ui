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
  // Enhanced accessibility
  generateUniqueIds?: boolean; // Auto-generate unique IDs for ARIA
  enableFocusTrap?: boolean; // Trap focus within modal
  announceToScreenReader?: boolean; // Announce state changes
};

export type DragResistanceConfig = {
  enabled?: boolean;
  threshold?: number; // Distance in px before resistance kicks in
  strength?: number; // 0-1, how strong the resistance force
  visualFeedback?: boolean; // Show handle darkening/scaling
};

export type BackdropEffectsConfig = {
  blur?: boolean; // Apply backdrop blur to background
  blurAmount?: string; // CSS blur amount (e.g., '8px', '12px')
  scale?: boolean; // Scale down background content
  scaleAmount?: number; // Scale factor (e.g., 0.98 for 98%)
  backgroundOpacity?: number; // Overlay opacity (0-1)
};

export type SquashStretchConfig = {
  enabled?: boolean;
  trigger?: 'start' | 'during' | 'both'; // When to apply effect
  intensity?: number; // Compression intensity (0-1)
  duration?: number; // Animation duration in ms
};

export type LoadingStateConfig = {
  isLoading: boolean;
  message?: string; // Optional loading message for screen readers
  lockInteraction?: boolean; // Disable drag/close during loading
  shimmerColor?: string; // Custom shimmer color (respects theme by default)
  shimmerSpeed?: 'slow' | 'fast'; // Shimmer animation speed
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
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number], // Custom cubic-bezier for smooth fade
};

export const SLIDE_TRANSITION = {
  type: 'spring' as const,
  ...SPRING_CONFIG,
};

// Default configurations with decent defaults
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
  intensity: 0.03, // 3% compression
  duration: 150,
};

export const DEFAULT_LOADING_STATE: Omit<
  Required<LoadingStateConfig>,
  'message'
> = {
  isLoading: false,
  lockInteraction: true,
  shimmerColor: '', // Empty string means use theme-aware default
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

// src/app/playground/modal/components/shared/types.ts
