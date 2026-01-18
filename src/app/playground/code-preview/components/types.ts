// src/app/playground/code-preview/components/types.ts

import type { BundledLanguage, BundledTheme } from 'shiki';

/**
 * Supported programming languages for syntax highlighting
 */
export type CodeLanguage = BundledLanguage;

/**
 * Theme variants for the code preview
 */
export type CodeTheme = BundledTheme;

/**
 * Size variants for the code preview
 */
export type CodePreviewSize = 'compact' | 'default' | 'large';

/**
 * Copy button position
 */
export type CopyButtonPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

/**
 * Line number display mode
 */
export type LineNumbersMode = 'visible' | 'hidden' | 'hover';

/**
 * Props for the CodePreview component
 */
export interface CodePreviewProps {
  /** The code to display */
  code: string;

  /** Programming language for syntax highlighting */
  language?: CodeLanguage;

  /** Custom title for the code block */
  title?: string;

  /** File name to display (overrides title) */
  filename?: string;

  /** Size variant */
  size?: CodePreviewSize;

  /** Show line numbers */
  showLineNumbers?: boolean | LineNumbersMode;

  /** Lines to highlight (1-indexed) */
  highlightLines?: number[];

  /** Show copy button */
  showCopyButton?: boolean;

  /** Copy button position */
  copyButtonPosition?: CopyButtonPosition;

  /** Enable collapsible behavior */
  collapsible?: boolean;

  /** Initial collapsed state (if collapsible) */
  defaultCollapsed?: boolean;

  /** Max visible lines before collapsing (if collapsible) */
  maxLines?: number;

  /** Custom light theme */
  lightTheme?: CodeTheme;

  /** Custom dark theme */
  darkTheme?: CodeTheme;

  /** Show language badge */
  showLanguageBadge?: boolean;

  /** Custom class name */
  className?: string;

  /** Callback when code is copied */
  onCopy?: (code: string) => void;

  /** Callback when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void;

  /** Disable all interactions */
  disabled?: boolean;

  /** Accessible label */
  ariaLabel?: string;
}

/**
 * Props for the CodeBlock primitive
 */
export interface CodeBlockProps {
  /** Pre-rendered HTML from Shiki */
  html: string;

  /** Show line numbers */
  showLineNumbers?: boolean | LineNumbersMode;

  /** Lines to highlight */
  highlightLines?: number[];

  /** Size variant */
  size?: CodePreviewSize;

  /** Custom class name */
  className?: string;
}

/**
 * Props for the CopyButton primitive
 */
export interface CopyButtonProps {
  /** Code to copy */
  code: string;

  /** Position in container */
  position?: CopyButtonPosition;

  /** Size variant */
  size?: CodePreviewSize;

  /** Callback when copied */
  onCopy?: (code: string) => void;

  /** Custom class name */
  className?: string;

  /** Disabled state */
  disabled?: boolean;
}

/**
 * Props for the CollapseToggle primitive
 */
export interface CollapseToggleProps {
  /** Whether currently collapsed */
  isCollapsed: boolean;

  /** Toggle handler */
  onToggle: () => void;

  /** Number of hidden lines */
  hiddenLinesCount?: number;

  /** Size variant */
  size?: CodePreviewSize;

  /** Custom class name */
  className?: string;
}

/**
 * Size configuration for consistent sizing
 */
export interface SizeConfig {
  fontSize: number;
  lineHeight: number;
  padding: number;
  borderRadius: number;
  iconSize: number;
}

/**
 * Get size configuration based on size variant
 */
export const CODE_PREVIEW_SIZES: Record<CodePreviewSize, SizeConfig> = {
  compact: {
    fontSize: 12,
    lineHeight: 18,
    padding: 12,
    borderRadius: 8,
    iconSize: 14,
  },
  default: {
    fontSize: 14,
    lineHeight: 22,
    padding: 16,
    borderRadius: 12,
    iconSize: 16,
  },
  large: {
    fontSize: 16,
    lineHeight: 26,
    padding: 20,
    borderRadius: 16,
    iconSize: 18,
  },
};

export function getSizeConfig(size: CodePreviewSize): SizeConfig {
  return CODE_PREVIEW_SIZES[size];
}

/**
 * Animation constants (Apple-like springs)
 */
export const CODE_PREVIEW_ANIMATIONS = {
  spring: { type: 'spring', stiffness: 300, damping: 30 } as const,
  springGentle: { type: 'spring', stiffness: 200, damping: 25 } as const,
  fast: { duration: 0.15, ease: [0.32, 0.72, 0, 1] } as const,
  base: { duration: 0.25, ease: [0.32, 0.72, 0, 1] } as const,
};

/**
 * Default themes
 */
export const DEFAULT_LIGHT_THEME: CodeTheme = 'github-light';
export const DEFAULT_DARK_THEME: CodeTheme = 'github-dark';
