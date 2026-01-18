// src/app/playground/code-preview/page.tsx
'use client';

import React, { useState } from 'react';
import {
  FiCode,
  FiCopy,
  FiHash,
  FiMaximize2,
  FiSun,
  FiMoon,
} from 'react-icons/fi';
import { cn } from '@/lib/utils';
import { Heading, Text } from '@/components/Typography';
import {
  CodePreview,
  type CodePreviewSize,
  type CopyButtonPosition,
} from './components';

// Supported languages for the demo
type DemoLanguage = 'typescript' | 'tsx' | 'json' | 'css' | 'bash';

// Example code snippets
const EXAMPLE_CODE: Record<DemoLanguage, string> = {
  typescript: `import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'rounded-xl font-medium transition-colors',
        variant === 'primary' && 'bg-blue-600 text-white',
        variant === 'secondary' && 'bg-gray-100 text-gray-900',
        variant === 'ghost' && 'bg-transparent hover:bg-gray-100',
      )}
    >
      {children}
    </motion.button>
  );
}`,

  tsx: `<CodePreview
  code={exampleCode}
  language="typescript"
  filename="Button.tsx"
  size="default"
  showLineNumbers
  showCopyButton
  collapsible
  maxLines={10}
  highlightLines={[5, 6, 7]}
/>`,

  json: `{
  "name": "tahoe-ui",
  "version": "1.0.0",
  "dependencies": {
    "react": "^19.0.0",
    "framer-motion": "^11.0.0",
    "tailwindcss": "^3.4.0"
  }
}`,

  css: `.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 500;
  transition: all 150ms ease;
}

.button:hover {
  transform: scale(1.02);
}`,

  bash: `# Install dependencies
yarn add @tahoe-ui/core

# Start development server
yarn dev

# Build for production
yarn build`,
};

/**
 * CodePreview Playground
 *
 * Demonstrates all features of the CodePreview component:
 * - Syntax highlighting (multiple languages)
 * - Theme-aware (light/dark)
 * - Copy-to-clipboard
 * - Collapsible code blocks
 * - Line numbers
 * - Line highlighting
 */
export default function CodePreviewPlayground() {
  // Controls state
  const [language, setLanguage] = useState<DemoLanguage>('typescript');
  const [size, setSize] = useState<CodePreviewSize>('default');
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [showCopyButton, setShowCopyButton] = useState(true);
  const [copyPosition, setCopyPosition] =
    useState<CopyButtonPosition>('top-right');
  const [collapsible, setCollapsible] = useState(false);
  const [maxLines, setMaxLines] = useState(15);
  const [showLanguageBadge, setShowLanguageBadge] = useState(true);
  const [highlightLines, setHighlightLines] = useState<number[]>([]);
  const [showFilename, setShowFilename] = useState(true);

  // Get current example code
  const currentCode = EXAMPLE_CODE[language];

  // Filename map
  const filenameMap: Record<DemoLanguage, string> = {
    typescript: 'Button.tsx',
    tsx: 'usage.tsx',
    json: 'package.json',
    css: 'styles.css',
    bash: 'install.sh',
  };

  // Filename based on language
  const filename = showFilename ? filenameMap[language] : undefined;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <Heading level={1} className="mb-4">
            Code Preview
          </Heading>
          <Text className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Syntax-highlighted code display with copy-to-clipboard, collapsible
            blocks, and theme-aware styling. Powered by Shiki.
          </Text>

          {/* Controls */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap gap-4">
              {/* Language */}
              <label className="flex items-center gap-2 text-sm">
                <FiCode className="text-gray-500" size={14} />
                <span className="text-gray-600 dark:text-gray-400">
                  Language:
                </span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as DemoLanguage)}
                  className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="typescript">TypeScript</option>
                  <option value="tsx">TSX</option>
                  <option value="json">JSON</option>
                  <option value="css">CSS</option>
                  <option value="bash">Bash</option>
                </select>
              </label>

              {/* Size */}
              <label className="flex items-center gap-2 text-sm">
                <FiMaximize2 className="text-gray-500" size={14} />
                <span className="text-gray-600 dark:text-gray-400">Size:</span>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value as CodePreviewSize)}
                  className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="compact">Compact</option>
                  <option value="default">Default</option>
                  <option value="large">Large</option>
                </select>
              </label>

              {/* Copy position */}
              <label className="flex items-center gap-2 text-sm">
                <FiCopy className="text-gray-500" size={14} />
                <span className="text-gray-600 dark:text-gray-400">
                  Copy position:
                </span>
                <select
                  value={copyPosition}
                  onChange={(e) =>
                    setCopyPosition(e.target.value as CopyButtonPosition)
                  }
                  className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="top-right">Top Right</option>
                  <option value="top-left">Top Left</option>
                  <option value="bottom-right">Bottom Right</option>
                  <option value="bottom-left">Bottom Left</option>
                </select>
              </label>

              {/* Max lines (for collapsible) */}
              {collapsible && (
                <label className="flex items-center gap-2 text-sm">
                  <FiHash className="text-gray-500" size={14} />
                  <span className="text-gray-600 dark:text-gray-400">
                    Max lines:
                  </span>
                  <input
                    type="number"
                    value={maxLines}
                    onChange={(e) => setMaxLines(Number(e.target.value))}
                    min={3}
                    max={50}
                    className="w-16 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                  />
                </label>
              )}
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-4 mt-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={showLineNumbers}
                  onChange={(e) => setShowLineNumbers(e.target.checked)}
                  className="rounded"
                />
                <span className="text-gray-600 dark:text-gray-400">
                  Line numbers
                </span>
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={showCopyButton}
                  onChange={(e) => setShowCopyButton(e.target.checked)}
                  className="rounded"
                />
                <span className="text-gray-600 dark:text-gray-400">
                  Copy button
                </span>
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={collapsible}
                  onChange={(e) => setCollapsible(e.target.checked)}
                  className="rounded"
                />
                <span className="text-gray-600 dark:text-gray-400">
                  Collapsible
                </span>
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={showLanguageBadge}
                  onChange={(e) => setShowLanguageBadge(e.target.checked)}
                  className="rounded"
                />
                <span className="text-gray-600 dark:text-gray-400">
                  Language badge
                </span>
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={showFilename}
                  onChange={(e) => setShowFilename(e.target.checked)}
                  className="rounded"
                />
                <span className="text-gray-600 dark:text-gray-400">
                  Show filename
                </span>
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={highlightLines.length > 0}
                  onChange={(e) =>
                    setHighlightLines(e.target.checked ? [1, 2, 3] : [])
                  }
                  className="rounded"
                />
                <span className="text-gray-600 dark:text-gray-400">
                  Highlight lines 1-3
                </span>
              </label>
            </div>
          </div>
        </header>

        {/* Main demo */}
        <section className="mb-16">
          <Heading level={2} className="mb-6">
            Interactive Demo
          </Heading>
          <CodePreview
            code={currentCode}
            language={language}
            filename={filename}
            size={size}
            showLineNumbers={showLineNumbers}
            showCopyButton={showCopyButton}
            copyButtonPosition={copyPosition}
            collapsible={collapsible}
            maxLines={maxLines}
            showLanguageBadge={showLanguageBadge}
            highlightLines={highlightLines}
            onCopy={(code) => console.log('Copied:', code.slice(0, 50) + '...')}
          />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <Heading level={2} className="mb-6">
            Examples
          </Heading>

          <div className="space-y-8">
            {/* Minimal */}
            <div>
              <Text
                fontWeight="medium"
                className="mb-3 text-gray-700 dark:text-gray-300"
              >
                Minimal
              </Text>
              <CodePreview
                code={`const greeting = "Hello, World!";
console.log(greeting);`}
                language="typescript"
                showLanguageBadge={false}
              />
            </div>

            {/* With filename and line numbers */}
            <div>
              <Text
                fontWeight="medium"
                className="mb-3 text-gray-700 dark:text-gray-300"
              >
                With filename and line numbers
              </Text>
              <CodePreview
                code={EXAMPLE_CODE.json}
                language="json"
                filename="package.json"
                showLineNumbers
              />
            </div>

            {/* Highlighted lines */}
            <div>
              <Text
                fontWeight="medium"
                className="mb-3 text-gray-700 dark:text-gray-300"
              >
                With highlighted lines
              </Text>
              <CodePreview
                code={EXAMPLE_CODE.css}
                language="css"
                filename="styles.css"
                showLineNumbers
                highlightLines={[6, 7, 8]}
              />
            </div>

            {/* Compact size */}
            <div>
              <Text
                fontWeight="medium"
                className="mb-3 text-gray-700 dark:text-gray-300"
              >
                Compact size
              </Text>
              <CodePreview
                code={EXAMPLE_CODE.bash}
                language="bash"
                size="compact"
              />
            </div>

            {/* Collapsible */}
            <div>
              <Text
                fontWeight="medium"
                className="mb-3 text-gray-700 dark:text-gray-300"
              >
                Collapsible (long code)
              </Text>
              <CodePreview
                code={EXAMPLE_CODE.typescript}
                language="typescript"
                filename="Button.tsx"
                showLineNumbers
                collapsible
                maxLines={10}
              />
            </div>
          </div>
        </section>

        {/* Usage */}
        <section>
          <Heading level={2} className="mb-6">
            Usage
          </Heading>
          <CodePreview
            code={EXAMPLE_CODE.tsx}
            language="tsx"
            filename="usage.tsx"
            showLineNumbers
          />
        </section>
      </div>
    </div>
  );
}
