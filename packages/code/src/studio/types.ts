// packages/code/src/studio/types.ts

import type { ReactNode } from 'react';

/**
 * Control types for the props panel
 */
export type ControlType =
  | 'text'
  | 'number'
  | 'boolean'
  | 'select'
  | 'color'
  | 'range';

/**
 * Base control configuration
 */
export interface BaseControl {
  /** Control type */
  type: ControlType;
  /** Display label (defaults to prop name) */
  label?: string;
  /** Description shown as tooltip */
  description?: string;
  /** Whether this control is required */
  required?: boolean;
  /** Whether this control is disabled */
  disabled?: boolean;
  /** Group name for organizing controls */
  group?: string;
}

/**
 * Text input control
 */
export interface TextControl extends BaseControl {
  type: 'text';
  defaultValue?: string;
  placeholder?: string;
  maxLength?: number;
}

/**
 * Number input control
 */
export interface NumberControl extends BaseControl {
  type: 'number';
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

/**
 * Boolean toggle control
 */
export interface BooleanControl extends BaseControl {
  type: 'boolean';
  defaultValue?: boolean;
}

/**
 * Select dropdown control
 */
export interface SelectControl extends BaseControl {
  type: 'select';
  options: Array<{ value: string; label: string } | string>;
  defaultValue?: string;
}

/**
 * Color picker control
 */
export interface ColorControl extends BaseControl {
  type: 'color';
  defaultValue?: string;
  presets?: string[];
}

/**
 * Range slider control
 */
export interface RangeControl extends BaseControl {
  type: 'range';
  defaultValue?: number;
  min: number;
  max: number;
  step?: number;
  showValue?: boolean;
}

/**
 * Union of all control types
 */
export type PropControl =
  | TextControl
  | NumberControl
  | BooleanControl
  | SelectControl
  | ColorControl
  | RangeControl;

/**
 * Props configuration for a component
 */
export type PropsConfig = Record<string, PropControl>;

/**
 * Current prop values
 */
export type PropValues = Record<string, unknown>;

/**
 * Viewport size presets
 */
export type ViewportPreset = 'mobile' | 'tablet' | 'desktop' | 'full';

/**
 * Viewport configuration
 */
export interface ViewportConfig {
  width: number | 'auto';
  height: number | 'auto';
  label: string;
}

/**
 * Predefined viewport presets
 */
export const VIEWPORT_PRESETS: Record<ViewportPreset, ViewportConfig> = {
  mobile: { width: 375, height: 667, label: 'Mobile' },
  tablet: { width: 768, height: 1024, label: 'Tablet' },
  desktop: { width: 1280, height: 800, label: 'Desktop' },
  full: { width: 'auto', height: 'auto', label: 'Full Width' },
};

/**
 * Code Studio size variants
 */
export type StudioSize = 'compact' | 'default' | 'large';

/**
 * Code Studio layout variants
 */
export type StudioLayout = 'horizontal' | 'vertical' | 'stacked';

/**
 * Props for the CodeStudio component
 */
export interface CodeStudioProps {
  /** Component to render in preview */
  component: React.ComponentType<Record<string, unknown>>;
  /** Component name for code generation */
  componentName: string;
  /** Props configuration with controls */
  controls: PropsConfig;
  /** Initial prop values */
  defaultProps?: PropValues;
  /** Layout variant */
  layout?: StudioLayout;
  /** Size variant */
  size?: StudioSize;
  /** Show code output panel */
  showCode?: boolean;
  /** Show viewport controls */
  showViewportControls?: boolean;
  /** Default viewport */
  defaultViewport?: ViewportPreset;
  /** Custom class name */
  className?: string;
  /** Callback when props change */
  onPropsChange?: (props: PropValues) => void;
  /** Callback when code is copied */
  onCodeCopy?: (code: string) => void;
}

/**
 * Props for the PropsPanel component
 */
export interface PropsPanelProps {
  /** Controls configuration */
  controls: PropsConfig;
  /** Current prop values */
  values: PropValues;
  /** Change handler */
  onChange: (name: string, value: unknown) => void;
  /** Reset handler */
  onReset: () => void;
  /** Size variant */
  size?: StudioSize;
  /** Custom class name */
  className?: string;
}

/**
 * Props for the ComponentPreview component
 */
export interface ComponentPreviewProps {
  /** Component to render */
  component: React.ComponentType<Record<string, unknown>>;
  /** Current props */
  props: PropValues;
  /** Viewport configuration */
  viewport: ViewportConfig;
  /** Custom class name */
  className?: string;
}

/**
 * Props for the CodeOutput component
 */
export interface CodeOutputProps {
  /** Component name */
  componentName: string;
  /** Current props */
  props: PropValues;
  /** Controls config for type inference */
  controls: PropsConfig;
  /** Size variant */
  size?: StudioSize;
  /** Copy callback */
  onCopy?: (code: string) => void;
  /** Custom class name */
  className?: string;
}

/**
 * Size configuration
 */
export interface SizeConfig {
  fontSize: number;
  padding: number;
  gap: number;
  borderRadius: number;
  controlHeight: number;
}

export const STUDIO_SIZES: Record<StudioSize, SizeConfig> = {
  compact: {
    fontSize: 12,
    padding: 12,
    gap: 8,
    borderRadius: 8,
    controlHeight: 32,
  },
  default: {
    fontSize: 14,
    padding: 16,
    gap: 12,
    borderRadius: 12,
    controlHeight: 36,
  },
  large: {
    fontSize: 16,
    padding: 20,
    gap: 16,
    borderRadius: 16,
    controlHeight: 40,
  },
};

export function getSizeConfig(size: StudioSize): SizeConfig {
  return STUDIO_SIZES[size];
}

/**
 * Animation constants
 */
export const STUDIO_ANIMATIONS = {
  spring: { type: 'spring', stiffness: 300, damping: 30 } as const,
  springGentle: { type: 'spring', stiffness: 200, damping: 25 } as const,
  fast: { duration: 0.15, ease: [0.32, 0.72, 0, 1] } as const,
};

/**
 * CSS variable-backed styles
 */
export const STUDIO_STYLES = {
  container: {
    base: 'bg-bg-elevated dark:bg-bg-elevated',
    border: 'border border-border-subtle/60 dark:border-border-subtle/50',
    shadow: 'shadow-lg shadow-black/5 dark:shadow-black/20',
  },
  panel: {
    base: 'bg-bg-primary dark:bg-bg-secondary',
    border: 'border-r border-border-subtle/60 dark:border-border-subtle/50',
    header:
      'bg-bg-secondary/50 dark:bg-bg-tertiary/50 border-b border-border-subtle/50',
  },
  preview: {
    base: 'bg-bg-primary dark:bg-bg-primary',
    pattern:
      'bg-[linear-gradient(45deg,var(--tahoe-color-border-subtle)_25%,transparent_25%,transparent_75%,var(--tahoe-color-border-subtle)_75%)] bg-[length:16px_16px]',
  },
  control: {
    label: 'text-text-secondary dark:text-text-muted',
    input:
      'bg-bg-primary dark:bg-bg-secondary border border-border-default dark:border-border-subtle',
    focus:
      'focus:border-brand-primary-500 focus:ring-2 focus:ring-brand-primary-500/20',
  },
  code: {
    base: 'bg-bg-tertiary dark:bg-bg-tertiary',
    header:
      'bg-bg-secondary/50 dark:bg-bg-tertiary border-b border-border-subtle/50',
  },
  viewport: {
    button: 'bg-bg-secondary dark:bg-bg-tertiary',
    active: 'bg-brand-primary-500 text-white',
  },
} as const;
