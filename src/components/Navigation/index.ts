// src/components/Navigation/index.ts

/**
 * Navigation Components
 *
 * Tab and pagination components for content navigation.
 */

export { Tabs, default as TabsDefault } from './Tabs';
export { Pagination, default as PaginationDefault } from './Pagination';

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
