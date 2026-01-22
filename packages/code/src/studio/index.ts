// packages/code/src/studio/index.ts

export { CodeStudio, default as CodeStudioDefault } from './CodeStudio';

// Primitives
export { PropsPanel } from './primitives/PropsPanel';
export { ComponentPreview } from './primitives/ComponentPreview';
export { CodeOutput } from './primitives/CodeOutput';

// Hooks
export { useStudioState } from './hooks/useStudioState';

// Types
export type {
  CodeStudioProps,
  PropsPanelProps,
  ComponentPreviewProps,
  CodeOutputProps,
  PropsConfig,
  PropValues,
  PropControl,
  ControlType,
  BaseControl,
  TextControl,
  NumberControl,
  BooleanControl,
  SelectControl,
  ColorControl,
  RangeControl,
  ViewportPreset,
  ViewportConfig,
  StudioSize,
  StudioLayout,
  SizeConfig,
} from './types';

// Constants
export {
  STUDIO_SIZES,
  STUDIO_ANIMATIONS,
  STUDIO_STYLES,
  VIEWPORT_PRESETS,
  getSizeConfig,
} from './types';
