// src/app/playground/code-studio/components/CodeStudio.tsx
'use client';

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { CodeStudioProps, StudioLayout, ViewportPreset } from './types';
import { getSizeConfig, STUDIO_ANIMATIONS } from './types';
import { useStudioState } from './hooks/useStudioState';
import { PropsPanel } from './PropsPanel';
import { ComponentPreview } from './ComponentPreview';
import { CodeOutput } from './CodeOutput';

/**
 * Layout configuration
 */
interface LayoutConfig {
  containerClass: string;
  previewClass: string;
  sidebarClass: string;
  codeClass: string;
}

const LAYOUT_CONFIGS: Record<StudioLayout, LayoutConfig> = {
  horizontal: {
    containerClass: 'flex flex-row',
    previewClass: 'flex-1 min-w-0',
    sidebarClass: 'w-80 shrink-0',
    codeClass: 'w-96 shrink-0',
  },
  vertical: {
    containerClass: 'flex flex-col',
    previewClass: 'flex-1 min-h-0',
    sidebarClass: 'h-auto',
    codeClass: 'h-64',
  },
  stacked: {
    containerClass: 'grid grid-cols-1 lg:grid-cols-2',
    previewClass: 'col-span-1 min-h-[400px]',
    sidebarClass: 'col-span-1',
    codeClass: 'col-span-1 lg:col-span-2',
  },
};

/**
 * Share button component
 */
interface ShareButtonProps {
  getShareUrl: () => string;
  size: 'compact' | 'default' | 'large';
}

function ShareButton({ getShareUrl, size }: ShareButtonProps) {
  const [shared, setShared] = React.useState(false);
  const sizeConfig = getSizeConfig(size);

  const handleShare = useCallback(async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  }, [getShareUrl]);

  return (
    <motion.button
      type="button"
      onClick={handleShare}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg',
        'transition-colors duration-150',
        shared
          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
      )}
      style={{ fontSize: sizeConfig.fontSize - 1 }}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
        />
      </svg>
      <span>{shared ? 'Link Copied!' : 'Share'}</span>
    </motion.button>
  );
}

/**
 * Code Studio - Interactive component playground
 *
 * Features:
 * - Auto-generated props panel from controls config
 * - Live component preview with viewport options
 * - Real-time JSX code generation
 * - URL state encoding for shareable links
 * - Multiple layout options
 * - State simulation (loading, error, empty, disabled)
 */
export function CodeStudio({
  component,
  componentName,
  controls,
  defaultProps,
  layout = 'horizontal',
  size = 'default',
  showCode = true,
  showViewportControls = true,
  defaultViewport = 'full',
  showStateSimulator = false,
  enableUrlState = false,
  className,
  onPropsChange,
  onCodeCopy,
}: CodeStudioProps) {
  const sizeConfig = getSizeConfig(size);
  const layoutConfig = LAYOUT_CONFIGS[layout];

  // Use studio state hook for props management
  const { values, setValue, reset, isDirty, getShareUrl } = useStudioState({
    controls,
    defaultProps,
    enableUrlState,
    onPropsChange,
  });

  // Handle code copy
  const handleCodeCopy = useCallback(
    (code: string) => {
      onCodeCopy?.(code);
    },
    [onCodeCopy],
  );

  return (
    <div
      className={cn(
        'bg-gray-50/50 dark:bg-gray-950/50',
        'border border-gray-200/50 dark:border-gray-800/50',
        'overflow-hidden',
        className,
      )}
      style={{ borderRadius: sizeConfig.borderRadius + 4 }}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center justify-between',
          'border-b border-gray-200/50 dark:border-gray-800/50',
          'bg-white/60 dark:bg-gray-900/60',
          'backdrop-blur-sm',
        )}
        style={{ padding: sizeConfig.padding }}
      >
        <div className="flex items-center gap-3">
          <h2
            className="font-semibold text-gray-900 dark:text-gray-100"
            style={{ fontSize: sizeConfig.fontSize + 4 }}
          >
            {componentName}
          </h2>
          {isDirty && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-2 py-0.5 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
            >
              Modified
            </motion.span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {enableUrlState && (
            <ShareButton getShareUrl={getShareUrl} size={size} />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div
        className={cn(layoutConfig.containerClass, 'min-h-[500px]')}
        style={{ gap: sizeConfig.gap }}
      >
        {/* Preview Panel */}
        <motion.div
          className={layoutConfig.previewClass}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={STUDIO_ANIMATIONS.fast}
          style={{ padding: sizeConfig.padding }}
        >
          <ComponentPreview
            component={component}
            props={values}
            showViewportControls={showViewportControls}
            showStateSimulator={showStateSimulator}
            defaultViewport={defaultViewport as ViewportPreset}
            size={size}
            className="h-full"
          />
        </motion.div>

        {/* Props Panel */}
        <motion.div
          className={layoutConfig.sidebarClass}
          initial={{ opacity: 0, x: layout === 'horizontal' ? 20 : 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...STUDIO_ANIMATIONS.fast, delay: 0.1 }}
          style={{
            padding: sizeConfig.padding,
            paddingLeft: layout === 'horizontal' ? 0 : sizeConfig.padding,
          }}
        >
          <PropsPanel
            controls={controls}
            values={values}
            onChange={setValue}
            onReset={reset}
            size={size}
            className="h-full"
          />
        </motion.div>

        {/* Code Output */}
        {showCode && (
          <motion.div
            className={layoutConfig.codeClass}
            initial={{ opacity: 0, y: layout !== 'horizontal' ? 20 : 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...STUDIO_ANIMATIONS.fast, delay: 0.2 }}
            style={{
              padding: sizeConfig.padding,
              paddingTop: layout === 'vertical' ? 0 : sizeConfig.padding,
            }}
          >
            <CodeOutput
              componentName={componentName}
              props={values}
              controls={controls}
              size={size}
              onCopy={handleCodeCopy}
              className="h-full"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default CodeStudio;
