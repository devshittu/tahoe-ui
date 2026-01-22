// packages/code/src/blocks/types.ts

import type { ReactNode } from 'react';

/**
 * Component category for filtering
 */
export type ComponentCategory =
  | 'buttons'
  | 'inputs'
  | 'feedback'
  | 'navigation'
  | 'layout'
  | 'overlay'
  | 'data-display'
  | 'utility';

/**
 * Component complexity level
 */
export type ComponentComplexity = 'simple' | 'moderate' | 'complex';

/**
 * Dependency information
 */
export interface ComponentDependency {
  /** Package name */
  name: string;
  /** Version range */
  version: string;
  /** Whether it's a dev dependency */
  dev?: boolean;
  /** Whether it's a peer dependency */
  peer?: boolean;
}

/**
 * File in a component
 */
export interface ComponentFile {
  /** File name */
  name: string;
  /** File path relative to component root */
  path: string;
  /** File content (code) */
  content: string;
  /** Language for syntax highlighting */
  language: 'typescript' | 'tsx' | 'css' | 'json';
  /** Whether this is the main entry file */
  isEntry?: boolean;
}

/**
 * Component variant/example
 */
export interface ComponentVariant {
  /** Variant name */
  name: string;
  /** Description */
  description?: string;
  /** Props to apply */
  props: Record<string, unknown>;
}

/**
 * Registry component definition
 */
export interface RegistryComponent {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Short description */
  description: string;
  /** Category for filtering */
  category: ComponentCategory;
  /** Complexity level */
  complexity: ComponentComplexity;
  /** Tags for search */
  tags: string[];
  /** Component files */
  files: ComponentFile[];
  /** External dependencies */
  dependencies: ComponentDependency[];
  /** Internal dependencies (other registry components) */
  internalDependencies?: string[];
  /** Example variants */
  variants?: ComponentVariant[];
  /** Preview component (for rendering) */
  preview?: React.ComponentType<Record<string, unknown>>;
  /** Default props for preview */
  defaultProps?: Record<string, unknown>;
  /** Documentation URL */
  docsUrl?: string;
  /** Whether component is featured */
  featured?: boolean;
  /** Author */
  author?: string;
  /** Last updated date */
  updatedAt?: string;
}

/**
 * Registry configuration
 */
export interface RegistryConfig {
  /** Registry name */
  name: string;
  /** Base path for imports */
  basePath: string;
  /** Components in the registry */
  components: RegistryComponent[];
}

/**
 * Size variants for Code Blocks UI
 */
export type BlocksSize = 'compact' | 'default' | 'large';

/**
 * View mode for component display
 */
export type ViewMode = 'grid' | 'list';

/**
 * Sort options
 */
export type SortOption = 'name' | 'category' | 'complexity' | 'updated';

/**
 * Filter state
 */
export interface FilterState {
  /** Search query */
  query: string;
  /** Category filter */
  category: ComponentCategory | 'all';
  /** Complexity filter */
  complexity: ComponentComplexity | 'all';
  /** Tags filter */
  tags: string[];
}

/**
 * Props for CodeBlocks component
 */
export interface CodeBlocksProps {
  /** Registry configuration */
  registry: RegistryConfig;
  /** Initial view mode */
  defaultView?: ViewMode;
  /** Size variant */
  size?: BlocksSize;
  /** Show search */
  showSearch?: boolean;
  /** Show category filter */
  showCategoryFilter?: boolean;
  /** Show complexity filter */
  showComplexityFilter?: boolean;
  /** Initial category filter */
  initialCategory?: ComponentCategory | 'all';
  /** Callback when component is copied */
  onCopy?: (component: RegistryComponent, files: string[]) => void;
  /** Custom class name */
  className?: string;
}

/**
 * Props for ComponentCard
 */
export interface ComponentCardProps {
  /** Component data */
  component: RegistryComponent;
  /** Size variant */
  size?: BlocksSize;
  /** View mode */
  viewMode?: ViewMode;
  /** Show preview */
  showPreview?: boolean;
  /** Callback when copy is clicked */
  onCopy?: (component: RegistryComponent) => void;
  /** Callback when view code is clicked */
  onViewCode?: (component: RegistryComponent) => void;
  /** Custom class name */
  className?: string;
}

/**
 * Props for ComponentCode modal
 */
export interface ComponentCodeProps {
  /** Component data */
  component: RegistryComponent;
  /** Whether modal is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Copy handler */
  onCopy?: (files: string[]) => void;
  /** Size variant */
  size?: BlocksSize;
}

/**
 * Size configuration
 */
export interface SizeConfig {
  fontSize: number;
  padding: number;
  gap: number;
  borderRadius: number;
  cardMinHeight: number;
}

export const BLOCKS_SIZES: Record<BlocksSize, SizeConfig> = {
  compact: {
    fontSize: 12,
    padding: 12,
    gap: 12,
    borderRadius: 8,
    cardMinHeight: 120,
  },
  default: {
    fontSize: 14,
    padding: 16,
    gap: 16,
    borderRadius: 12,
    cardMinHeight: 160,
  },
  large: {
    fontSize: 16,
    padding: 20,
    gap: 20,
    borderRadius: 16,
    cardMinHeight: 200,
  },
};

export function getSizeConfig(size: BlocksSize): SizeConfig {
  return BLOCKS_SIZES[size];
}

/**
 * Category display info
 */
export const CATEGORY_INFO: Record<
  ComponentCategory,
  { label: string; color: string }
> = {
  buttons: { label: 'Buttons', color: 'brand-primary' },
  inputs: { label: 'Inputs', color: 'brand-secondary' },
  feedback: { label: 'Feedback', color: 'success' },
  navigation: { label: 'Navigation', color: 'info' },
  layout: { label: 'Layout', color: 'warning' },
  overlay: { label: 'Overlays', color: 'error' },
  'data-display': { label: 'Data Display', color: 'brand-accent' },
  utility: { label: 'Utility', color: 'text-muted' },
};

/**
 * Complexity display info
 */
export const COMPLEXITY_INFO: Record<
  ComponentComplexity,
  { label: string; color: string }
> = {
  simple: { label: 'Simple', color: 'success' },
  moderate: { label: 'Moderate', color: 'warning' },
  complex: { label: 'Complex', color: 'error' },
};

/**
 * Animation constants
 */
export const BLOCKS_ANIMATIONS = {
  spring: { type: 'spring', stiffness: 300, damping: 30 } as const,
  fast: { duration: 0.15, ease: [0.32, 0.72, 0, 1] } as const,
  medium: { duration: 0.25, ease: [0.32, 0.72, 0, 1] } as const,
};

/**
 * CSS variable-backed styles
 */
export const BLOCKS_STYLES = {
  container: {
    base: 'bg-bg-secondary/50 dark:bg-bg-tertiary/50',
    border: 'border border-border-subtle/50 dark:border-border-subtle/50',
  },
  header: {
    base: 'bg-bg-elevated/60 dark:bg-bg-elevated/60',
    border: 'border-b border-border-subtle/50 dark:border-border-subtle/50',
  },
  card: {
    base: 'bg-bg-elevated dark:bg-bg-elevated',
    border: 'border border-border-subtle/60 dark:border-border-subtle/50',
    hover: 'hover:border-border-default dark:hover:border-border-default',
    shadow: 'shadow-sm hover:shadow-md',
  },
  search: {
    base: 'bg-bg-primary dark:bg-bg-secondary',
    border: 'border border-border-subtle dark:border-border-subtle',
    focus:
      'focus:border-brand-primary-500 focus:ring-2 focus:ring-brand-primary-500/20',
    placeholder: 'placeholder:text-text-muted',
    text: 'text-text-primary dark:text-text-primary',
  },
  filter: {
    base: 'bg-bg-secondary dark:bg-bg-tertiary',
    active: 'bg-brand-primary-500 text-white',
    inactive:
      'text-text-secondary hover:bg-bg-tertiary dark:hover:bg-bg-secondary',
  },
  badge: {
    simple: 'bg-success/10 text-success',
    moderate: 'bg-warning/10 text-warning',
    complex: 'bg-error/10 text-error',
  },
  empty: {
    icon: 'text-text-muted dark:text-text-muted',
    title: 'text-text-primary dark:text-text-primary',
    description: 'text-text-secondary dark:text-text-muted',
    button: 'bg-brand-primary-600 text-white hover:bg-brand-primary-700',
  },
} as const;
