// src/app/playground/code-preview/components/primitives/CodeBlock.tsx
'use client';

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { CodeBlockProps } from '../types';
import { getSizeConfig } from '../types';

/**
 * CodeBlock - Renders syntax-highlighted code
 *
 * Receives pre-rendered HTML from Shiki and applies:
 * - Line numbers (optional)
 * - Line highlighting
 * - Size-based styling
 *
 * Apple-like design:
 * - Clean monospace typography
 * - Subtle line number styling
 * - Smooth scrolling
 */
export function CodeBlock({
  html,
  showLineNumbers = false,
  highlightLines = [],
  size = 'default',
  className,
}: CodeBlockProps) {
  const sizeConfig = getSizeConfig(size);

  // Process HTML to add line numbers and highlighting
  const processedHtml = useMemo(() => {
    if (!showLineNumbers && highlightLines.length === 0) {
      return html;
    }

    // Parse the HTML and wrap each line
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const pre = doc.querySelector('pre');
    const code = doc.querySelector('code');

    if (!pre || !code) return html;

    // Get all lines
    const codeContent = code.innerHTML;
    const lines = codeContent.split('\n');

    // Build new HTML with line numbers
    const wrappedLines = lines.map((line, index) => {
      const lineNumber = index + 1;
      const isHighlighted = highlightLines.includes(lineNumber);
      const showNumbers =
        showLineNumbers === true || showLineNumbers === 'visible';

      const lineNumberHtml = showNumbers
        ? `<span class="code-line-number" data-line="${lineNumber}">${lineNumber}</span>`
        : '';

      const highlightClass = isHighlighted ? 'code-line-highlighted' : '';

      return `<span class="code-line ${highlightClass}" data-line="${lineNumber}">${lineNumberHtml}<span class="code-line-content">${line || ' '}</span></span>`;
    });

    code.innerHTML = wrappedLines.join('\n');
    return pre.outerHTML;
  }, [html, showLineNumbers, highlightLines]);

  return (
    <div
      className={cn(
        'code-block',
        'overflow-x-auto',
        'scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600',
        'scrollbar-track-transparent',
        className,
      )}
      style={{
        fontSize: sizeConfig.fontSize,
        lineHeight: `${sizeConfig.lineHeight}px`,
      }}
    >
      <style jsx global>{`
        .code-block pre {
          margin: 0;
          padding: ${sizeConfig.padding}px;
          background: transparent !important;
          overflow: visible;
        }

        .code-block code {
          font-family:
            'Geist Mono', 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Monaco,
            Consolas, 'Liberation Mono', 'Courier New', monospace;
          display: block;
        }

        .code-block .code-line {
          display: flex;
          min-height: ${sizeConfig.lineHeight}px;
        }

        .code-block .code-line-number {
          display: inline-block;
          width: 3ch;
          margin-right: 1.5ch;
          text-align: right;
          color: var(--code-line-number-color, #9ca3af);
          user-select: none;
          flex-shrink: 0;
        }

        .dark .code-block .code-line-number {
          color: var(--code-line-number-color-dark, #6b7280);
        }

        .code-block .code-line-content {
          flex: 1;
          white-space: pre;
        }

        .code-block .code-line-highlighted {
          background: rgba(59, 130, 246, 0.1);
          margin: 0 -${sizeConfig.padding}px;
          padding: 0 ${sizeConfig.padding}px;
          border-left: 3px solid rgb(59, 130, 246);
        }

        .dark .code-block .code-line-highlighted {
          background: rgba(59, 130, 246, 0.15);
        }

        /* Shiki theme overrides for clean look */
        .code-block .shiki {
          background: transparent !important;
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
    </div>
  );
}

export default CodeBlock;
