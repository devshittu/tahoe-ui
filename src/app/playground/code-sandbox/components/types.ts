// src/app/playground/code-sandbox/components/types.ts
'use client';

import type { SandpackPredefinedTemplate } from '@codesandbox/sandpack-react';

/**
 * Sandbox file representation
 */
export interface SandboxFile {
  /** File path (e.g., "/App.tsx") */
  path: string;
  /** File content */
  content: string;
  /** Whether file is read-only */
  readOnly?: boolean;
  /** Whether file is hidden from tree */
  hidden?: boolean;
  /** Whether this is the active/entry file */
  active?: boolean;
}

/**
 * Sandbox files map
 */
export type SandboxFiles = Record<string, string | SandboxFile>;

/**
 * Dependency with version
 */
export interface SandboxDependency {
  name: string;
  version: string;
}

/**
 * Console log entry
 */
export interface ConsoleEntry {
  id: string;
  type: 'log' | 'warn' | 'error' | 'info' | 'clear';
  message: string;
  timestamp: number;
  data?: unknown[];
}

/**
 * Sandbox template presets
 */
export type SandboxTemplate =
  | 'react'
  | 'react-ts'
  | 'nextjs'
  | 'vanilla'
  | 'vanilla-ts'
  | 'vue'
  | 'vue-ts'
  | 'svelte'
  | 'angular'
  | 'solid'
  | 'node';

/**
 * Map our templates to Sandpack templates
 */
export const TEMPLATE_MAP: Record<SandboxTemplate, SandpackPredefinedTemplate> =
  {
    react: 'react',
    'react-ts': 'react-ts',
    nextjs: 'nextjs',
    vanilla: 'vanilla',
    'vanilla-ts': 'vanilla-ts',
    vue: 'vue',
    'vue-ts': 'vue-ts',
    svelte: 'svelte',
    angular: 'angular',
    solid: 'solid',
    node: 'node',
  };

/**
 * Template display info
 */
export const TEMPLATE_INFO: Record<
  SandboxTemplate,
  { label: string; icon: string; extension: string }
> = {
  react: { label: 'React', icon: 'react', extension: 'jsx' },
  'react-ts': { label: 'React + TS', icon: 'react', extension: 'tsx' },
  nextjs: { label: 'Next.js', icon: 'nextjs', extension: 'tsx' },
  vanilla: { label: 'Vanilla JS', icon: 'js', extension: 'js' },
  'vanilla-ts': { label: 'Vanilla TS', icon: 'ts', extension: 'ts' },
  vue: { label: 'Vue', icon: 'vue', extension: 'vue' },
  'vue-ts': { label: 'Vue + TS', icon: 'vue', extension: 'vue' },
  svelte: { label: 'Svelte', icon: 'svelte', extension: 'svelte' },
  angular: { label: 'Angular', icon: 'angular', extension: 'ts' },
  solid: { label: 'Solid', icon: 'solid', extension: 'tsx' },
  node: { label: 'Node.js', icon: 'node', extension: 'js' },
};

/**
 * Editor panel layout
 */
export type SandboxLayout = 'horizontal' | 'vertical' | 'preview-only';

/**
 * Editor theme
 */
export type SandboxTheme = 'light' | 'dark' | 'auto';

/**
 * Size configuration
 */
export type SandboxSize = 'compact' | 'default' | 'large';

export interface SizeConfig {
  fontSize: number;
  padding: number;
  borderRadius: number;
  headerHeight: number;
  sidebarWidth: number;
}

export const SIZE_CONFIGS: Record<SandboxSize, SizeConfig> = {
  compact: {
    fontSize: 12,
    padding: 8,
    borderRadius: 8,
    headerHeight: 36,
    sidebarWidth: 180,
  },
  default: {
    fontSize: 14,
    padding: 12,
    borderRadius: 12,
    headerHeight: 44,
    sidebarWidth: 220,
  },
  large: {
    fontSize: 16,
    padding: 16,
    borderRadius: 16,
    headerHeight: 52,
    sidebarWidth: 260,
  },
};

export function getSizeConfig(size: SandboxSize): SizeConfig {
  return SIZE_CONFIGS[size];
}

/**
 * Main CodeSandbox component props
 */
export interface CodeSandboxProps {
  /** Initial files */
  files?: SandboxFiles;
  /** Entry file path */
  entry?: string;
  /** Template preset */
  template?: SandboxTemplate;
  /** External dependencies */
  dependencies?: Record<string, string>;
  /** Layout mode */
  layout?: SandboxLayout;
  /** Size variant */
  size?: SandboxSize;
  /** Theme */
  theme?: SandboxTheme;
  /** Show file tree sidebar */
  showFileTree?: boolean;
  /** Show console panel */
  showConsole?: boolean;
  /** Show editor */
  showEditor?: boolean;
  /** Allow adding/removing files */
  allowFileOperations?: boolean;
  /** Read-only mode */
  readOnly?: boolean;
  /** Auto-run on code change */
  autoRun?: boolean;
  /** Debounce delay for auto-run (ms) */
  autoRunDelay?: number;
  /** Container height */
  height?: string | number;
  /** Custom class name */
  className?: string;
  /** Callback when files change */
  onFilesChange?: (files: SandboxFiles) => void;
  /** Callback when active file changes */
  onActiveFileChange?: (path: string) => void;
}

/**
 * File tree item for display
 */
export interface FileTreeItem {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileTreeItem[];
  isOpen?: boolean;
  depth: number;
}

/**
 * Editor panel props
 */
export interface EditorPanelProps {
  files: SandboxFiles;
  activeFile: string;
  onFileChange: (path: string, content: string) => void;
  onActiveFileChange: (path: string) => void;
  size?: SandboxSize;
  theme?: SandboxTheme;
  readOnly?: boolean;
  className?: string;
}

/**
 * File tree props
 */
export interface FileTreeProps {
  files: SandboxFiles;
  activeFile: string;
  onFileSelect: (path: string) => void;
  onFileCreate?: (path: string) => void;
  onFileDelete?: (path: string) => void;
  onFileRename?: (oldPath: string, newPath: string) => void;
  allowOperations?: boolean;
  size?: SandboxSize;
  className?: string;
}

/**
 * Preview panel props
 */
export interface PreviewPanelProps {
  size?: SandboxSize;
  className?: string;
}

/**
 * Console panel props
 */
export interface ConsolePanelProps {
  entries: ConsoleEntry[];
  onClear: () => void;
  size?: SandboxSize;
  className?: string;
}

/**
 * Animation configurations
 */
export const SANDBOX_ANIMATIONS = {
  fast: { duration: 0.15 },
  normal: { duration: 0.25 },
  spring: { type: 'spring' as const, stiffness: 300, damping: 25 },
};

/**
 * Default React TypeScript starter files
 */
export const DEFAULT_REACT_TS_FILES: SandboxFiles = {
  '/App.tsx': `import React, { useState } from 'react';
import './styles.css';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1>Hello Sandbox</h1>
      <p>Start editing to see changes</p>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
    </div>
  );
}
`,
  '/styles.css': `.app {
  font-family: system-ui, -apple-system, sans-serif;
  padding: 2rem;
  text-align: center;
}

h1 {
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

p {
  color: #666;
  margin-bottom: 1.5rem;
}

button {
  background: #0070f3;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #0060df;
}
`,
};

/**
 * File extension to language mapping for Monaco
 */
export const EXTENSION_LANGUAGE_MAP: Record<string, string> = {
  ts: 'typescript',
  tsx: 'typescript',
  js: 'javascript',
  jsx: 'javascript',
  css: 'css',
  scss: 'scss',
  less: 'less',
  html: 'html',
  json: 'json',
  md: 'markdown',
  vue: 'vue',
  svelte: 'svelte',
};

export function getLanguageFromPath(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase() || '';
  return EXTENSION_LANGUAGE_MAP[ext] || 'plaintext';
}

/**
 * File icon mapping
 */
export const FILE_ICONS: Record<string, string> = {
  ts: '📘',
  tsx: '⚛️',
  js: '📒',
  jsx: '⚛️',
  css: '🎨',
  scss: '🎨',
  html: '🌐',
  json: '📋',
  md: '📝',
  svg: '🖼️',
  png: '🖼️',
  jpg: '🖼️',
  folder: '📁',
  'folder-open': '📂',
};

export function getFileIcon(path: string, isFolder = false): string {
  if (isFolder) return FILE_ICONS['folder'];
  const ext = path.split('.').pop()?.toLowerCase() || '';
  return FILE_ICONS[ext] || '📄';
}
