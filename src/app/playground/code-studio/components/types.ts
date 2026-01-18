// src/app/playground/code-studio/components/types.ts

import type { ReactNode } from 'react';

/**
 * Control types for the props panel
 */
export type ControlType =
  | 'text'
  | 'number'
  | 'boolean'
  | 'select'
  | 'radio'
  | 'color'
  | 'range'
  | 'object'
  | 'array'
  | 'function';

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
  /** Default value */
  defaultValue?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Min length */
  minLength?: number;
  /** Max length */
  maxLength?: number;
  /** Use textarea for multiline */
  multiline?: boolean;
}

/**
 * Number input control
 */
export interface NumberControl extends BaseControl {
  type: 'number';
  /** Default value */
  defaultValue?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
}

/**
 * Boolean toggle control
 */
export interface BooleanControl extends BaseControl {
  type: 'boolean';
  /** Default value */
  defaultValue?: boolean;
}

/**
 * Select dropdown control
 */
export interface SelectControl extends BaseControl {
  type: 'select';
  /** Available options */
  options: Array<{ value: string; label: string } | string>;
  /** Default value */
  defaultValue?: string;
  /** Allow multiple selection */
  multiple?: boolean;
}

/**
 * Radio button group control
 */
export interface RadioControl extends BaseControl {
  type: 'radio';
  /** Available options */
  options: Array<{ value: string; label: string } | string>;
  /** Default value */
  defaultValue?: string;
}

/**
 * Color picker control
 */
export interface ColorControl extends BaseControl {
  type: 'color';
  /** Default color value */
  defaultValue?: string;
  /** Preset colors */
  presets?: string[];
}

/**
 * Range slider control
 */
export interface RangeControl extends BaseControl {
  type: 'range';
  /** Default value */
  defaultValue?: number;
  /** Minimum value */
  min: number;
  /** Maximum value */
  max: number;
  /** Step increment */
  step?: number;
  /** Show value label */
  showValue?: boolean;
}

/**
 * Object control (nested props)
 */
export interface ObjectControl extends BaseControl {
  type: 'object';
  /** Nested controls */
  controls: Record<string, PropControl>;
  /** Default value */
  defaultValue?: Record<string, unknown>;
}

/**
 * Array control
 */
export interface ArrayControl extends BaseControl {
  type: 'array';
  /** Control for array items */
  itemControl: PropControl;
  /** Default value */
  defaultValue?: unknown[];
  /** Min items */
  minItems?: number;
  /** Max items */
  maxItems?: number;
}

/**
 * Function control (action button)
 */
export interface FunctionControl extends BaseControl {
  type: 'function';
  /** Button label */
  actionLabel?: string;
}

/**
 * Union of all control types
 */
export type PropControl =
  | TextControl
  | NumberControl
  | BooleanControl
  | SelectControl
  | RadioControl
  | ColorControl
  | RangeControl
  | ObjectControl
  | ArrayControl
  | FunctionControl;

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
 * State simulation options
 */
export type SimulatedState =
  | 'default'
  | 'loading'
  | 'error'
  | 'empty'
  | 'disabled';

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

  /** Show state simulator */
  showStateSimulator?: boolean;

  /** Enable URL state encoding */
  enableUrlState?: boolean;

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

  /** Simulated state */
  simulatedState: SimulatedState;

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
 * Props for individual control components
 */
export interface ControlProps<T extends PropControl = PropControl> {
  /** Control configuration */
  control: T;

  /** Prop name */
  name: string;

  /** Current value */
  value: unknown;

  /** Change handler */
  onChange: (value: unknown) => void;

  /** Size variant */
  size?: StudioSize;
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
