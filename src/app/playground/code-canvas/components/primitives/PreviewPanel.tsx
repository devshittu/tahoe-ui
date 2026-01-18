// src/app/playground/code-canvas/components/primitives/PreviewPanel.tsx
'use client';

import React, { useMemo, useState } from 'react';
import { SandpackProvider, SandpackPreview } from '@codesandbox/sandpack-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { PreviewPanelProps } from '../types';
import { getSizeConfig, CANVAS_ANIMATIONS } from '../types';

/**
 * Viewport preset
 */
interface ViewportPreset {
  id: string;
  label: string;
  icon: string;
  width: number | '100%';
}

const VIEWPORT_PRESETS: ViewportPreset[] = [
  { id: 'mobile', label: 'Mobile', icon: '📱', width: 375 },
  { id: 'tablet', label: 'Tablet', icon: '📱', width: 768 },
  { id: 'desktop', label: 'Desktop', icon: '🖥️', width: '100%' },
];

/**
 * Wrap generated component code for Sandpack
 */
function wrapForSandpack(code: string): string {
  // Check if code already has an export default
  if (code.includes('export default')) {
    return code;
  }

  // Check if code defines a named component
  const componentMatch = code.match(/(?:function|const|class)\s+(\w+)/);

  if (componentMatch) {
    const componentName = componentMatch[1];
    return `${code}\n\nexport default ${componentName};`;
  }

  // Wrap raw JSX
  return `import React from 'react';

export default function Component() {
  return (
    ${code}
  );
}`;
}

/**
 * Preview panel using Sandpack for live rendering
 */
export function PreviewPanel({
  code,
  isGenerating,
  size = 'default',
  className,
}: PreviewPanelProps) {
  const sizeConfig = getSizeConfig(size);
  const [viewport, setViewport] = useState<string>('desktop');
  const [key, setKey] = useState(0);

  // Prepare code for Sandpack
  const sandpackFiles = useMemo(() => {
    if (!code.trim()) {
      return {
        '/App.tsx': `export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center text-gray-400 dark:text-gray-500">
        <p>Preview will appear here</p>
      </div>
    </div>
  );
}`,
        '/Component.tsx': `export default function Component() { return null; }`,
      };
    }

    const wrappedCode = wrapForSandpack(code);

    return {
      '/App.tsx': `import Component from './Component';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
      <Component />
    </div>
  );
}`,
      '/Component.tsx': wrappedCode,
    };
  }, [code]);

  // Refresh preview
  const handleRefresh = () => {
    setKey((k) => k + 1);
  };

  // Get viewport width
  const viewportWidth =
    VIEWPORT_PRESETS.find((v) => v.id === viewport)?.width || '100%';

  return (
    <div
      className={cn(
        'flex flex-col h-full',
        'bg-white dark:bg-gray-900',
        'border border-gray-200 dark:border-gray-800',
        className,
      )}
      style={{ borderRadius: sizeConfig.borderRadius }}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center justify-between px-4',
          'border-b border-gray-200 dark:border-gray-800',
          'bg-gray-50 dark:bg-gray-800/50',
        )}
        style={{ height: sizeConfig.headerHeight }}
      >
        <div className="flex items-center gap-2">
          <span
            className="font-medium text-gray-700 dark:text-gray-300"
            style={{ fontSize: sizeConfig.fontSize }}
          >
            Preview
          </span>
          {isGenerating && (
            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span style={{ fontSize: sizeConfig.fontSize - 2 }}>
                Updating...
              </span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Viewport switcher */}
          <div className="flex items-center rounded-lg bg-gray-100 dark:bg-gray-800 p-0.5">
            {VIEWPORT_PRESETS.map((vp) => (
              <button
                key={vp.id}
                type="button"
                onClick={() => setViewport(vp.id)}
                className={cn(
                  'px-2 py-1 rounded-md text-xs transition-colors duration-150',
                  viewport === vp.id
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
                )}
                title={vp.label}
              >
                {vp.icon}
              </button>
            ))}
          </div>

          {/* Refresh button */}
          <motion.button
            type="button"
            onClick={handleRefresh}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'p-1.5 rounded-lg',
              'text-gray-500 dark:text-gray-400',
              'hover:bg-gray-100 dark:hover:bg-gray-800',
              'transition-colors duration-150',
            )}
            title="Refresh preview"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Preview content */}
      <div className="flex-1 overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4">
        <div
          className={cn(
            'h-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300',
          )}
          style={{
            width: viewportWidth,
            maxWidth: '100%',
          }}
        >
          <SandpackProvider
            key={key}
            template="react-ts"
            files={sandpackFiles}
            customSetup={{
              dependencies: {
                tailwindcss: '^3.4.0',
              },
            }}
            options={{
              externalResources: ['https://cdn.tailwindcss.com'],
            }}
            theme="auto"
          >
            <SandpackPreview
              showNavigator={false}
              showOpenInCodeSandbox={false}
              showRefreshButton={false}
              style={{ height: '100%', minHeight: 400 }}
            />
          </SandpackProvider>
        </div>
      </div>
    </div>
  );
}

export default PreviewPanel;
