/**
 * @tahoe-ui/navigation
 *
 * Navigation components for Tahoe UI - Tabs and Pagination.
 *
 * Features:
 * - Tabs: Multiple variants (underline, pills, enclosed), animated indicator
 * - Pagination: Numbered, simple, and compact variants
 * - Full accessibility support
 * - Keyboard navigation
 */

// Components
export { Tabs } from './Tabs';
export { Pagination } from './Pagination';

// Types
export type {
  TabsProps,
  TabItem,
  TabsVariant,
  TabsSize,
  TabsOrientation,
} from './Tabs';

export type {
  PaginationProps,
  PaginationVariant,
  PaginationSize,
} from './Pagination';

// Icons
export {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from './icons';

// Section Navigation
export {
  SectionNav,
  SectionNavDefault,
  useScrollSpy,
  useScrollSpyDefault,
  SECTION_NAV_ANIMATIONS,
  SECTION_NAV_SIZES,
  SECTION_NAV_STYLES,
  getSectionNavSizeConfig,
} from './sectionnav';
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
} from './sectionnav';

// Dock Bar
export {
  DockBar,
  DockBarDefault,
  DockItem,
  DockItemDefault,
  DOCK_SIZE_CONFIG,
  MAGNETIC_CONFIG,
  DOCK_STYLES,
} from './dockbar';
export type {
  DockBarProps,
  DockItemProps,
  DockItemData,
  DockPosition,
  DockSize,
} from './dockbar';
