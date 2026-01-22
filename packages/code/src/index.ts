// packages/code/src/index.ts
/**
 * @tahoe-ui/code
 *
 * Code display and editing components for Tahoe UI.
 *
 * Submodules:
 * - preview: Syntax-highlighted code display with Shiki
 * - blocks: Component registry browser with search and filter
 * - studio: Interactive props editor with live preview
 *
 * @example
 * ```tsx
 * // Code Preview
 * import { CodePreview } from '@tahoe-ui/code/preview';
 *
 * <CodePreview
 *   code={`const greeting = "Hello!";`}
 *   language="typescript"
 *   showLineNumbers
 * />
 *
 * // Code Blocks
 * import { CodeBlocks } from '@tahoe-ui/code/blocks';
 *
 * <CodeBlocks
 *   registry={myComponentRegistry}
 *   showSearch
 *   showCategoryFilter
 * />
 *
 * // Code Studio
 * import { CodeStudio } from '@tahoe-ui/code/studio';
 *
 * <CodeStudio
 *   component={Button}
 *   componentName="Button"
 *   controls={{
 *     children: { type: 'text', defaultValue: 'Click me' },
 *     variant: { type: 'select', options: ['primary', 'secondary'] },
 *   }}
 * />
 * ```
 */

// Re-export from submodules with explicit names to avoid conflicts
// Preview
export {
  CodePreview,
  CodePreviewDefault,
  CodeBlock,
  CopyButton,
  CollapseToggle,
  useHighlighter,
  useCopyToClipboard,
  CODE_PREVIEW_SIZES,
  CODE_PREVIEW_ANIMATIONS,
  CODE_PREVIEW_STYLES,
  DEFAULT_LIGHT_THEME,
  DEFAULT_DARK_THEME,
  LANGUAGE_DISPLAY_NAMES,
  getLanguageDisplayName,
} from './preview';
export type {
  CodePreviewProps,
  CodeBlockProps,
  CopyButtonProps,
  CollapseToggleProps,
  CodePreviewSize,
  CodeLanguage,
  CodeTheme,
  CopyButtonPosition,
  LineNumbersMode,
} from './preview';
export { getSizeConfig as getPreviewSizeConfig } from './preview';
export type { SizeConfig as PreviewSizeConfig } from './preview';

// Blocks
export {
  CodeBlocks,
  CodeBlocksDefault,
  ComponentCard,
  SearchInput,
  CategoryFilter,
  ComplexityFilter,
  ViewModeToggle,
  ResultCount,
  ResetFilters,
  useRegistryState,
  useCopyComponent,
  BLOCKS_SIZES,
  BLOCKS_ANIMATIONS,
  BLOCKS_STYLES,
  CATEGORY_INFO,
  COMPLEXITY_INFO,
} from './blocks';
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
} from './blocks';
export { getSizeConfig as getBlocksSizeConfig } from './blocks';
export type { SizeConfig as BlocksSizeConfig } from './blocks';

// Studio
export {
  CodeStudio,
  CodeStudioDefault,
  PropsPanel,
  ComponentPreview,
  CodeOutput,
  useStudioState,
  STUDIO_SIZES,
  STUDIO_ANIMATIONS,
  STUDIO_STYLES,
  VIEWPORT_PRESETS,
} from './studio';
export type {
  CodeStudioProps,
  PropsPanelProps,
  ComponentPreviewProps,
  CodeOutputProps,
  PropsConfig,
  PropValues,
  PropControl,
  ControlType,
  BaseControl,
  TextControl,
  NumberControl,
  BooleanControl,
  SelectControl,
  ColorControl,
  RangeControl,
  ViewportPreset,
  ViewportConfig,
  StudioSize,
  StudioLayout,
} from './studio';
export { getSizeConfig as getStudioSizeConfig } from './studio';
export type { SizeConfig as StudioSizeConfig } from './studio';
