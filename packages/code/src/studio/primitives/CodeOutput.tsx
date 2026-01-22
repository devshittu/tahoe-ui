'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import type { CodeOutputProps, PropControl } from '../types';
import { getSizeConfig, STUDIO_STYLES, STUDIO_ANIMATIONS } from '../types';

// Simple icons
const CopyIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/**
 * Format a prop value for JSX output
 */
function formatPropValue(value: unknown, control: PropControl): string {
  if (value === undefined || value === null) {
    return 'undefined';
  }

  switch (control.type) {
    case 'text':
      return `"${String(value)}"`;
    case 'number':
    case 'range':
      return `{${value}}`;
    case 'boolean':
      return value ? '' : '{false}'; // true props don't need explicit value
    case 'select':
      return `"${String(value)}"`;
    case 'color':
      return `"${String(value)}"`;
    default:
      return `{${JSON.stringify(value)}}`;
  }
}

/**
 * Generate JSX code from props
 */
function generateCode(
  componentName: string,
  props: Record<string, unknown>,
  controls: Record<string, PropControl>,
): string {
  const propLines: string[] = [];

  for (const [name, value] of Object.entries(props)) {
    const control = controls[name];
    if (!control) continue;

    // Skip default values
    if ('defaultValue' in control && control.defaultValue === value) {
      continue;
    }

    // Skip false booleans if that's the default
    if (control.type === 'boolean' && value === false) {
      continue;
    }

    // Handle boolean true as just the prop name
    if (control.type === 'boolean' && value === true) {
      propLines.push(`  ${name}`);
    } else {
      const formattedValue = formatPropValue(value, control);
      propLines.push(`  ${name}=${formattedValue}`);
    }
  }

  if (propLines.length === 0) {
    return `<${componentName} />`;
  }

  return `<${componentName}\n${propLines.join('\n')}\n/>`;
}

/**
 * CodeOutput - Generated code display
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
  const [copied, setCopied] = useState(false);

  const code = useMemo(
    () => generateCode(componentName, props, controls),
    [componentName, props, controls],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      onCopy?.(code);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div
      className={twMerge('flex flex-col', STUDIO_STYLES.code.base, className)}
    >
      {/* Header */}
      <div
        className={twMerge(
          'flex items-center justify-between',
          STUDIO_STYLES.code.header,
        )}
        style={{
          padding: `${sizeConfig.padding * 0.75}px ${sizeConfig.padding}px`,
        }}
      >
        <span
          className="font-medium text-text-secondary dark:text-text-muted"
          style={{ fontSize: sizeConfig.fontSize - 1 }}
        >
          JSX
        </span>
        <motion.button
          type="button"
          onClick={handleCopy}
          className={twMerge(
            'flex items-center gap-1.5 px-2 py-1 rounded',
            'text-xs font-medium',
            'transition-colors duration-150',
            copied
              ? 'bg-success/10 text-success'
              : 'text-text-muted hover:text-text-secondary hover:bg-bg-secondary dark:hover:bg-bg-tertiary',
          )}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={STUDIO_ANIMATIONS.fast}
              >
                <CheckIcon />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={STUDIO_ANIMATIONS.fast}
              >
                <CopyIcon />
              </motion.span>
            )}
          </AnimatePresence>
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </motion.button>
      </div>

      {/* Code */}
      <div
        className="flex-1 overflow-auto"
        style={{ padding: sizeConfig.padding }}
      >
        <pre
          className={twMerge(
            'font-mono whitespace-pre-wrap',
            'text-text-primary dark:text-text-primary',
          )}
          style={{ fontSize: sizeConfig.fontSize - 1 }}
        >
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export default CodeOutput;
