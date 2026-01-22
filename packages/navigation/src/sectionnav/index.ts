// packages/navigation/src/sectionnav/index.ts

export { SectionNav, default as SectionNavDefault } from './SectionNav';
export { useScrollSpy, default as useScrollSpyDefault } from './useScrollSpy';

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

export {
  SECTION_NAV_ANIMATIONS,
  SECTION_NAV_SIZES,
  SECTION_NAV_STYLES,
  getSizeConfig as getSectionNavSizeConfig,
} from './types';
