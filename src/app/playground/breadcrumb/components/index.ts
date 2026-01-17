// src/app/playground/breadcrumb/components/index.ts

/**
 * Breadcrumb Navigator - Animated path navigation
 *
 * Features:
 * - Animated separator transitions
 * - Collapsible overflow with dropdown for long paths
 * - Keyboard navigation
 * - Next.js Link integration
 * - Multiple separator styles
 */

// Components
export { Breadcrumb } from './Breadcrumb';
export { BreadcrumbItem } from './BreadcrumbItem';
export { BreadcrumbSeparator } from './BreadcrumbSeparator';

// Types
export type {
  BreadcrumbProps,
  BreadcrumbItemProps,
  BreadcrumbItemData,
  BreadcrumbSeparator as BreadcrumbSeparatorType,
  BreadcrumbSize,
} from './types';

// Constants
export { BREADCRUMB_SIZE_CONFIG, SEPARATOR_ICONS } from './types';
