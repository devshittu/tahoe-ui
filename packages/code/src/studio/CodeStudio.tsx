'use client';

import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import type { CodeStudioProps, ViewportPreset } from './types';
import { getSizeConfig, STUDIO_STYLES, VIEWPORT_PRESETS } from './types';
import { useStudioState } from './hooks';
import { PropsPanel, ComponentPreview, CodeOutput } from './primitives';

// Viewport icons
const MobileIcon = ({ size = 16 }: { size?: number }) => (
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
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const TabletIcon = ({ size = 16 }: { size?: number }) => (
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
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const DesktopIcon = ({ size = 16 }: { size?: number }) => (
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
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const FullIcon = ({ size = 16 }: { size?: number }) => (
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
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  </svg>
);

const VIEWPORT_ICONS: Record<
  ViewportPreset,
  React.ComponentType<{ size?: number }>
> = {
  mobile: MobileIcon,
  tablet: TabletIcon,
  desktop: DesktopIcon,
  full: FullIcon,
};

/**
 * CodeStudio - Interactive component playground with props editor
 *
 * Features:
 * - Live component preview
 * - Props panel with various control types
 * - Generated JSX code output
 * - Viewport presets for responsive testing
 *
 * @example
 * ```tsx
 * <CodeStudio
 *   component={Button}
 *   componentName="Button"
 *   controls={{
 *     children: { type: 'text', defaultValue: 'Click me' },
 *     variant: { type: 'select', options: ['primary', 'secondary'] },
 *     disabled: { type: 'boolean', defaultValue: false },
 *   }}
 * />
 * ```
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
  className,
  onPropsChange,
  onCodeCopy,
}: CodeStudioProps) {
  const sizeConfig = getSizeConfig(size);
  const [viewport, setViewport] = useState<ViewportPreset>(defaultViewport);

  const { props, setProp, resetProps } = useStudioState({
    controls,
    defaultProps,
    onPropsChange,
  });

  const viewportConfig = VIEWPORT_PRESETS[viewport];

  const isHorizontal = layout === 'horizontal';
  const isVertical = layout === 'vertical';
  const isStacked = layout === 'stacked';

  return (
    <div
      className={twMerge(
        'flex overflow-hidden',
        STUDIO_STYLES.container.base,
        STUDIO_STYLES.container.border,
        STUDIO_STYLES.container.shadow,
        isHorizontal && 'flex-row',
        isVertical && 'flex-col',
        isStacked && 'flex-col',
        className,
      )}
      style={{ borderRadius: sizeConfig.borderRadius + 4 }}
    >
      {/* Props Panel */}
      <div
        className={twMerge(
          STUDIO_STYLES.panel.base,
          isHorizontal && STUDIO_STYLES.panel.border,
          isVertical && 'border-b border-border-subtle/60',
          isStacked && 'order-2',
        )}
        style={{
          width: isHorizontal ? 300 : 'auto',
          maxHeight: isVertical ? 300 : 'auto',
        }}
      >
        <PropsPanel
          controls={controls}
          values={props}
          onChange={setProp}
          onReset={resetProps}
          size={size}
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Viewport controls */}
        {showViewportControls && (
          <div
            className={twMerge(
              'flex items-center justify-between',
              STUDIO_STYLES.panel.header,
            )}
            style={{
              padding: `${sizeConfig.padding * 0.75}px ${sizeConfig.padding}px`,
            }}
          >
            <span
              className="text-text-muted"
              style={{ fontSize: sizeConfig.fontSize - 1 }}
            >
              Preview
            </span>
            <div className="flex items-center gap-1">
              {(Object.keys(VIEWPORT_PRESETS) as ViewportPreset[]).map(
                (preset) => {
                  const Icon = VIEWPORT_ICONS[preset];
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setViewport(preset)}
                      className={twMerge(
                        'p-1.5 rounded transition-colors duration-150',
                        viewport === preset
                          ? STUDIO_STYLES.viewport.active
                          : twMerge(
                              STUDIO_STYLES.viewport.button,
                              'text-text-muted hover:text-text-secondary',
                            ),
                      )}
                      title={VIEWPORT_PRESETS[preset].label}
                      aria-label={VIEWPORT_PRESETS[preset].label}
                    >
                      <Icon size={sizeConfig.fontSize} />
                    </button>
                  );
                },
              )}
            </div>
          </div>
        )}

        {/* Preview */}
        <div className="flex-1 relative overflow-hidden">
          <ComponentPreview
            component={component}
            props={props}
            viewport={viewportConfig}
          />
        </div>

        {/* Code output */}
        {showCode && (
          <div
            className="border-t border-border-subtle/60"
            style={{ height: isStacked ? 'auto' : 160 }}
          >
            <CodeOutput
              componentName={componentName}
              props={props}
              controls={controls}
              size={size}
              onCopy={onCodeCopy}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeStudio;
