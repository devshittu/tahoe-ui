'use client';

import React, { Suspense, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import type { ComponentPreviewProps } from '../types';
import { STUDIO_STYLES } from '../types';

/**
 * Error boundary for preview
 */
class PreviewErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Loading fallback
 */
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px]">
      <div className="w-8 h-8 border-2 border-brand-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

/**
 * Error fallback
 */
function ErrorFallback({ error }: { error?: Error }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px] p-4 text-center">
      <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center mb-3">
        <svg
          className="w-6 h-6 text-error"
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
      <p className="text-sm font-medium text-text-primary dark:text-text-primary mb-1">
        Preview Error
      </p>
      <p className="text-xs text-text-muted max-w-xs">
        {error?.message || 'An error occurred while rendering the component'}
      </p>
    </div>
  );
}

/**
 * ComponentPreview - Preview area for the component
 */
export function ComponentPreview({
  component: Component,
  props,
  viewport,
  className,
}: ComponentPreviewProps) {
  const containerStyle = useMemo(() => {
    const style: React.CSSProperties = {};

    if (viewport.width !== 'auto') {
      style.width = viewport.width;
      style.maxWidth = '100%';
    }

    if (viewport.height !== 'auto') {
      style.height = viewport.height;
      style.maxHeight = '100%';
    }

    return style;
  }, [viewport]);

  return (
    <div
      className={twMerge(
        'flex-1 flex items-center justify-center overflow-auto',
        STUDIO_STYLES.preview.base,
        className,
      )}
    >
      {/* Checkered background pattern */}
      <div
        className={twMerge(
          'absolute inset-0 opacity-30',
          STUDIO_STYLES.preview.pattern,
        )}
      />

      {/* Preview container */}
      <div
        className="relative bg-bg-primary dark:bg-bg-primary rounded-lg shadow-md overflow-auto"
        style={containerStyle}
      >
        <PreviewErrorBoundary fallback={<ErrorFallback />}>
          <Suspense fallback={<LoadingFallback />}>
            <div className="p-4">
              <Component {...props} />
            </div>
          </Suspense>
        </PreviewErrorBoundary>
      </div>
    </div>
  );
}

export default ComponentPreview;
