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
