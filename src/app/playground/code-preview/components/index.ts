// src/app/playground/code-preview/components/index.ts

// Main component
export { CodePreview } from './CodePreview';

// Types
export type {
  CodePreviewProps,
  CodeLanguage,
  CodeTheme,
  CodePreviewSize,
  CopyButtonPosition,
  LineNumbersMode,
  CodeBlockProps,
  CopyButtonProps,
  CollapseToggleProps,
} from './types';

export {
  CODE_PREVIEW_SIZES,
  CODE_PREVIEW_ANIMATIONS,
  getSizeConfig,
  DEFAULT_LIGHT_THEME,
  DEFAULT_DARK_THEME,
} from './types';

// Primitives for customization
export * from './primitives';

// Hooks
export * from './hooks';
