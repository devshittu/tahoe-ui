// src/app/playground/code-studio/components/CodeOutput.tsx
'use client';

import React, { useMemo, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type {
  CodeOutputProps,
  PropControl,
  PropValues,
  PropsConfig,
  StudioSize,
} from './types';
import { getSizeConfig, STUDIO_ANIMATIONS } from './types';

/**
 * Determines if a value should be rendered as a prop
 */
function shouldRenderProp(
  name: string,
  value: unknown,
  control: PropControl,
): boolean {
  // Skip undefined/null values
  if (value === undefined || value === null) return false;

  // Skip functions (they can't be serialized)
  if (control.type === 'function') return false;

  // Skip if value equals default
  const defaultValue = getDefaultValue(control);
  if (JSON.stringify(value) === JSON.stringify(defaultValue)) return false;

  return true;
}

/**
 * Get default value from control
 */
function getDefaultValue(control: PropControl): unknown {
  switch (control.type) {
    case 'text':
      return control.defaultValue ?? '';
    case 'number':
      return control.defaultValue ?? 0;
    case 'boolean':
      return control.defaultValue ?? false;
    case 'select':
    case 'radio':
      return control.defaultValue ?? '';
    case 'color':
      return control.defaultValue ?? '#000000';
    case 'range':
      return control.defaultValue ?? control.min;
    case 'object':
      return control.defaultValue ?? {};
    case 'array':
      return control.defaultValue ?? [];
    default:
      return undefined;
  }
}

/**
 * Format a value for JSX output
 */
function formatValue(value: unknown, type: string): string {
  if (value === undefined || value === null) return 'undefined';

  switch (type) {
    case 'string':
    case 'text':
    case 'color':
    case 'select':
    case 'radio':
      return `"${String(value)}"`;
    case 'number':
    case 'range':
      return String(value);
    case 'boolean':
      return value ? 'true' : 'false';
    case 'object':
    case 'array':
      return JSON.stringify(value, null, 2);
    default:
      return String(value);
  }
}

/**
 * Generate JSX code from component name and props
 */
function generateCode(
  componentName: string,
  props: PropValues,
  controls: PropsConfig,
): string {
  const propEntries: Array<{
    name: string;
    value: string;
    isExpression: boolean;
  }> = [];

  for (const [name, value] of Object.entries(props)) {
    const control = controls[name];
    if (!control) continue;
    if (!shouldRenderProp(name, value, control)) continue;

    const formattedValue = formatValue(value, control.type);
    const isExpression =
      control.type !== 'text' &&
      control.type !== 'color' &&
      control.type !== 'select' &&
      control.type !== 'radio';

    propEntries.push({ name, value: formattedValue, isExpression });
  }

  // No props - self-closing tag
  if (propEntries.length === 0) {
    return `<${componentName} />`;
  }

  // Single short prop - inline
  if (
    propEntries.length === 1 &&
    !propEntries[0].value.includes('\n') &&
    propEntries[0].value.length < 30
  ) {
    const { name, value, isExpression } = propEntries[0];
    const propStr = isExpression ? `${name}={${value}}` : `${name}=${value}`;
    return `<${componentName} ${propStr} />`;
  }

  // Multiple props - multiline
  const propsLines = propEntries.map(({ name, value, isExpression }) => {
    if (isExpression) {
      // Handle multiline values (objects/arrays)
      if (value.includes('\n')) {
        const indentedValue = value
          .split('\n')
          .map((line, i) => (i === 0 ? line : `    ${line}`))
          .join('\n');
        return `  ${name}={${indentedValue}}`;
      }
      return `  ${name}={${value}}`;
    }
    return `  ${name}=${value}`;
  });

  return `<${componentName}\n${propsLines.join('\n')}\n/>`;
}

/**
 * Simple syntax highlighting for JSX
 */
interface HighlightedCode {
  html: string;
}

function highlightJSX(code: string): HighlightedCode {
  let html = code
    // Escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Component names (after < or </)
    .replace(
      /&lt;(\/?)([\w]+)/g,
      '&lt;$1<span class="text-blue-600 dark:text-blue-400">$2</span>',
    )
    // Prop names (word followed by =)
    .replace(
      /(\s)([\w]+)(=)/g,
      '$1<span class="text-purple-600 dark:text-purple-400">$2</span>$3',
    )
    // String values (in quotes)
    .replace(
      /"([^"]*)"/g,
      '<span class="text-green-600 dark:text-green-400">"$1"</span>',
    )
    // Numbers
    .replace(
      /\{(\d+(?:\.\d+)?)\}/g,
      '{<span class="text-orange-600 dark:text-orange-400">$1</span>}',
    )
    // Booleans
    .replace(
      /\{(true|false)\}/g,
      '{<span class="text-orange-600 dark:text-orange-400">$1</span>}',
    )
    // Braces
    .replace(
      /(\{|\})/g,
      '<span class="text-gray-500 dark:text-gray-400">$1</span>',
    );

  return { html };
}

/**
 * Copy button with feedback
 */
interface CopyButtonProps {
  code: string;
  onCopy?: (code: string) => void;
  size: StudioSize;
}

function CopyButton({ code, onCopy, size }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const sizeConfig = getSizeConfig(size);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      onCopy?.(code);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      onCopy?.(code);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code, onCopy]);

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg',
        'transition-colors duration-150',
        copied
          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
      )}
      style={{ fontSize: sizeConfig.fontSize - 1 }}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.svg
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        ) : (
          <motion.svg
            key="copy"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </motion.svg>
        )}
      </AnimatePresence>
      <span>{copied ? 'Copied!' : 'Copy'}</span>
    </motion.button>
  );
}

/**
 * Code output component - shows generated JSX
 */
export function CodeOutput({
  componentName,
  props,
  controls,
  size = 'default',
  onCopy,
  className,
}: CodeOutputProps) {
  const sizeConfig = getSizeConfig(size);

  const code = useMemo(() => {
    return generateCode(componentName, props, controls);
  }, [componentName, props, controls]);

  const highlighted = useMemo(() => {
    return highlightJSX(code);
  }, [code]);

  return (
    <div
      className={cn(
        'flex flex-col h-full',
        'bg-white/80 dark:bg-gray-900/80',
        'backdrop-blur-xl',
        'border border-gray-200/50 dark:border-gray-800/50',
        'overflow-hidden',
        className,
      )}
      style={{ borderRadius: sizeConfig.borderRadius }}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center justify-between',
          'border-b border-gray-200/50 dark:border-gray-800/50',
          'bg-gray-50/50 dark:bg-gray-800/30',
        )}
        style={{ padding: sizeConfig.padding }}
      >
        <h3
          className="font-semibold text-gray-900 dark:text-gray-100"
          style={{ fontSize: sizeConfig.fontSize + 2 }}
        >
          Code
        </h3>
        <CopyButton code={code} onCopy={onCopy} size={size} />
      </div>

      {/* Code Display */}
      <div
        className="flex-1 overflow-auto"
        style={{ padding: sizeConfig.padding }}
      >
        <motion.pre
          key={code}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={STUDIO_ANIMATIONS.fast}
          className={cn(
            'font-mono text-gray-800 dark:text-gray-200',
            'whitespace-pre-wrap break-words',
          )}
          style={{
            fontSize: sizeConfig.fontSize - 1,
            lineHeight: 1.6,
          }}
        >
          <code dangerouslySetInnerHTML={{ __html: highlighted.html }} />
        </motion.pre>
      </div>
    </div>
  );
}

export default CodeOutput;
