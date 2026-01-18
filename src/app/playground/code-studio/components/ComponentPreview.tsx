// src/app/playground/code-studio/components/ComponentPreview.tsx
'use client';

import React, { useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type {
  ComponentPreviewProps,
  ViewportPreset,
  ViewportConfig,
  SimulatedState,
  StudioSize,
} from './types';
import { VIEWPORT_PRESETS, getSizeConfig, STUDIO_ANIMATIONS } from './types';

/**
 * Viewport selector button
 */
interface ViewportButtonProps {
  preset: ViewportPreset;
  config: ViewportConfig;
  isActive: boolean;
  onClick: () => void;
  size: StudioSize;
}

function ViewportButton({
  preset,
  config,
  isActive,
  onClick,
  size,
}: ViewportButtonProps) {
  const sizeConfig = getSizeConfig(size);

  const icons: Record<ViewportPreset, React.ReactNode> = {
    mobile: (
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
          d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
        />
      </svg>
    ),
    tablet: (
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
          d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 002.25-2.25v-15a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 4.5v15a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
    desktop: (
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
          d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
        />
      </svg>
    ),
    full: (
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
          d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
        />
      </svg>
    ),
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg',
        'transition-colors duration-150',
        isActive
          ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
      )}
      style={{ fontSize: sizeConfig.fontSize - 1 }}
      title={config.label}
    >
      {icons[preset]}
      <span className="hidden sm:inline">{config.label}</span>
    </motion.button>
  );
}

/**
 * State simulator selector
 */
interface StateSimulatorProps {
  state: SimulatedState;
  onChange: (state: SimulatedState) => void;
  size: StudioSize;
}

function StateSimulator({ state, onChange, size }: StateSimulatorProps) {
  const sizeConfig = getSizeConfig(size);
  const states: SimulatedState[] = [
    'default',
    'loading',
    'error',
    'empty',
    'disabled',
  ];

  return (
    <div className="flex items-center gap-1">
      {states.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={cn(
            'px-2 py-1 rounded-md capitalize',
            'transition-colors duration-150',
            state === s
              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
          )}
          style={{ fontSize: sizeConfig.fontSize - 2 }}
        >
          {s}
        </button>
      ))}
    </div>
  );
}

/**
 * Loading skeleton for preview
 */
function PreviewSkeleton() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-700 border-t-blue-500 animate-spin" />
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Loading preview...
        </span>
      </div>
    </div>
  );
}

/**
 * Error boundary fallback
 */
function ErrorFallback({
  error,
  resetError,
}: {
  error: Error;
  resetError: () => void;
}) {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px] p-6">
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
            Preview Error
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {error.message}
          </p>
          <button
            onClick={resetError}
            className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Simple error boundary component
 */
class PreviewErrorBoundary extends React.Component<
  { children: React.ReactNode; onError?: (error: Error) => void },
  { error: Error | null }
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error);
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorFallback
          error={this.state.error}
          resetError={() => this.setState({ error: null })}
        />
      );
    }
    return this.props.children;
  }
}

/**
 * Main component preview with viewport controls
 */
export interface ComponentPreviewWithControlsProps extends Omit<
  ComponentPreviewProps,
  'viewport' | 'simulatedState'
> {
  /** Show viewport selector */
  showViewportControls?: boolean;
  /** Show state simulator */
  showStateSimulator?: boolean;
  /** Default viewport */
  defaultViewport?: ViewportPreset;
  /** Size variant */
  size?: StudioSize;
}

export function ComponentPreview({
  component: Component,
  props,
  showViewportControls = true,
  showStateSimulator = false,
  defaultViewport = 'full',
  size = 'default',
  className,
}: ComponentPreviewWithControlsProps) {
  const sizeConfig = getSizeConfig(size);
  const [viewport, setViewport] =
    React.useState<ViewportPreset>(defaultViewport);
  const [simulatedState, setSimulatedState] =
    React.useState<SimulatedState>('default');

  const viewportConfig = VIEWPORT_PRESETS[viewport];

  const containerStyle = useMemo(() => {
    if (viewportConfig.width === 'auto' && viewportConfig.height === 'auto') {
      return {};
    }
    return {
      width: viewportConfig.width === 'auto' ? '100%' : viewportConfig.width,
      maxWidth: '100%',
    };
  }, [viewportConfig]);

  // Merge simulated state into props
  const mergedProps = useMemo(() => {
    const base = { ...props };

    switch (simulatedState) {
      case 'loading':
        return { ...base, isLoading: true, loading: true };
      case 'error':
        return { ...base, error: new Error('Simulated error'), hasError: true };
      case 'empty':
        return { ...base, data: null, items: [], isEmpty: true };
      case 'disabled':
        return { ...base, disabled: true, isDisabled: true };
      default:
        return base;
    }
  }, [props, simulatedState]);

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
      {/* Toolbar */}
      {(showViewportControls || showStateSimulator) && (
        <div
          className={cn(
            'flex items-center justify-between flex-wrap gap-2',
            'border-b border-gray-200/50 dark:border-gray-800/50',
            'bg-gray-50/50 dark:bg-gray-800/30',
          )}
          style={{ padding: sizeConfig.padding }}
        >
          {showViewportControls && (
            <div className="flex items-center gap-1">
              {(
                Object.entries(VIEWPORT_PRESETS) as [
                  ViewportPreset,
                  ViewportConfig,
                ][]
              ).map(([preset, config]) => (
                <ViewportButton
                  key={preset}
                  preset={preset}
                  config={config}
                  isActive={viewport === preset}
                  onClick={() => setViewport(preset)}
                  size={size}
                />
              ))}
            </div>
          )}

          {showStateSimulator && (
            <StateSimulator
              state={simulatedState}
              onChange={setSimulatedState}
              size={size}
            />
          )}
        </div>
      )}

      {/* Preview Area */}
      <div className="flex-1 overflow-auto p-4">
        <div
          className={cn(
            'mx-auto h-full',
            'flex items-center justify-center',
            viewport !== 'full' &&
              'border border-dashed border-gray-200 dark:border-gray-700 rounded-lg',
          )}
          style={containerStyle}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={viewport}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={STUDIO_ANIMATIONS.fast}
              className="w-full"
            >
              <PreviewErrorBoundary>
                <Suspense fallback={<PreviewSkeleton />}>
                  <Component {...mergedProps} />
                </Suspense>
              </PreviewErrorBoundary>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Viewport Info */}
      {viewport !== 'full' && (
        <div
          className={cn(
            'flex items-center justify-center gap-2',
            'border-t border-gray-200/50 dark:border-gray-800/50',
            'bg-gray-50/30 dark:bg-gray-800/20',
            'py-2',
          )}
        >
          <span className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
            {viewportConfig.width} × {viewportConfig.height}
          </span>
        </div>
      )}
    </div>
  );
}

export default ComponentPreview;
