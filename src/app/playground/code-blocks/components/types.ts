// src/app/playground/code-blocks/components/types.ts

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
  { label: string; icon: string }
> = {
  buttons: { label: 'Buttons', icon: '⬜' },
  inputs: { label: 'Inputs', icon: '📝' },
  feedback: { label: 'Feedback', icon: '💬' },
  navigation: { label: 'Navigation', icon: '🧭' },
  layout: { label: 'Layout', icon: '📐' },
  overlay: { label: 'Overlays', icon: '🪟' },
  'data-display': { label: 'Data Display', icon: '📊' },
  utility: { label: 'Utility', icon: '🔧' },
};

/**
 * Complexity display info
 */
export const COMPLEXITY_INFO: Record<
  ComponentComplexity,
  { label: string; color: string }
> = {
  simple: { label: 'Simple', color: 'emerald' },
  moderate: { label: 'Moderate', color: 'amber' },
  complex: { label: 'Complex', color: 'rose' },
};

/**
 * Animation constants
 */
export const BLOCKS_ANIMATIONS = {
  spring: { type: 'spring', stiffness: 300, damping: 30 } as const,
  fast: { duration: 0.15, ease: [0.32, 0.72, 0, 1] } as const,
  medium: { duration: 0.25, ease: [0.32, 0.72, 0, 1] } as const,
};
