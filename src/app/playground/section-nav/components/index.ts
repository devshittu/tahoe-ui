// src/app/playground/section-nav/components/index.ts

// Main components
export { SectionNav } from './SectionNav';
export { Wayfinder } from './Wayfinder';
export { NavPill } from './NavPill';

// Types
export type {
  SectionNavProps,
  SectionItem,
  SectionVisibility,
  UseScrollSpyReturn,
  UseScrollSpyOptions,
  SectionNavMode,
  SectionNavPosition,
  SectionNavBehavior,
  SectionNavSize,
  SectionNavDisplay,
  QuickAction,
} from './types';

export type { WayfinderProps } from './Wayfinder';
export type {
  NavPillProps,
  NavPillPosition,
  NavPillAlign,
  NavPillVariant,
  NavPillDisplay,
} from './NavPill';

// Utilities
export { useScrollSpy } from './useScrollSpy';
export {
  SECTION_NAV_ANIMATIONS,
  SECTION_NAV_SIZES,
  DEFAULT_QUICK_ACTIONS,
  getSizeConfig,
} from './types';

// Re-export primitives for customization
export * from './primitives';
