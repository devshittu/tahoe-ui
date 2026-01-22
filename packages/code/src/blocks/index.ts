// packages/code/src/blocks/index.ts

export { CodeBlocks, default as CodeBlocksDefault } from './CodeBlocks';

// Primitives
export { ComponentCard } from './primitives/ComponentCard';
export {
  SearchInput,
  CategoryFilter,
  ComplexityFilter,
  ViewModeToggle,
  ResultCount,
  ResetFilters,
} from './primitives/SearchFilter';

// Hooks
export { useRegistryState } from './hooks/useRegistryState';
export { useCopyComponent } from './hooks/useCopyComponent';

// Types
export type {
  CodeBlocksProps,
  ComponentCardProps,
  ComponentCodeProps,
  RegistryConfig,
  RegistryComponent,
  ComponentCategory,
  ComponentComplexity,
  ComponentDependency,
  ComponentFile,
  ComponentVariant,
  BlocksSize,
  ViewMode,
  SortOption,
  FilterState,
  SizeConfig,
} from './types';

// Constants
export {
  BLOCKS_SIZES,
  BLOCKS_ANIMATIONS,
  BLOCKS_STYLES,
  CATEGORY_INFO,
  COMPLEXITY_INFO,
  getSizeConfig,
} from './types';
