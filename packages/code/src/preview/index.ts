// packages/code/src/preview/index.ts

export { CodePreview, default as CodePreviewDefault } from './CodePreview';

// Primitives
export { CodeBlock } from './primitives/CodeBlock';
export { CopyButton } from './primitives/CopyButton';
export { CollapseToggle } from './primitives/CollapseToggle';

// Hooks
export { useHighlighter } from './hooks/useHighlighter';
export { useCopyToClipboard } from './hooks/useCopyToClipboard';

// Types
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
  SizeConfig,
} from './types';

// Constants
export {
  CODE_PREVIEW_SIZES,
  CODE_PREVIEW_ANIMATIONS,
  CODE_PREVIEW_STYLES,
  DEFAULT_LIGHT_THEME,
  DEFAULT_DARK_THEME,
  LANGUAGE_DISPLAY_NAMES,
  getSizeConfig,
  getLanguageDisplayName,
} from './types';
