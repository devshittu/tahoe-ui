// src/types/fcp.ts

/**
 * Central type definitions for the Floating Control Panel
 * Ensures type consistency across the application
 */

import { ReactNode } from 'react';

/**
 * Size variants for the control panel
 */
export type PanelSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Position variants for the control panel
 * Supports 8 cardinal positions around the viewport
 */
export type PanelPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'right-center'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left'
  | 'left-center';

/**
 * Visual variant for action buttons
 */
export type ActionVariant = 'default' | 'primary' | 'success' | 'danger';

/**
 * Configuration for a single control action
 */
export interface ControlAction {
  /** Unique identifier for the action */
  id: string;

  /** Icon element to display */
  icon: ReactNode;

  /** Label for tooltip and accessibility */
  label: string;

  /** Click handler function */
  onClick: () => void;

  /** Visual style variant */
  variant?: ActionVariant;

  /** Whether the action is disabled */
  disabled?: boolean;

  /** Badge content (e.g., notification count) */
  badge?: string | number;
}

/**
 * Size configuration mapping
 */
export interface SizeConfig {
  container: string;
  button: string;
  gap: string;
  padding: string;
}

/**
 * Animation state
 */
export type AnimationState = 'entering' | 'entered' | 'exiting' | 'exited';

/**
 * Panel state
 */
export interface PanelState {
  isCollapsed: boolean;
  isVisible: boolean;
  animationState: AnimationState;
}

/**
 * Props for the FloatingControlPanel component
 */
export interface FloatingControlPanelProps {
  /** Size of the control panel */
  size?: PanelSize;

  /** Position of the control panel in the viewport */
  position?: PanelPosition;

  /** Custom actions to display in the panel */
  actions?: ControlAction[];

  /** Whether the panel can be collapsed */
  collapsible?: boolean;

  /** Whether the panel can be closed */
  closable?: boolean;

  /** Callback when panel is closed */
  onClose?: () => void;

  /** Custom className for additional styling */
  className?: string;

  /** Whether to show tooltips on hover */
  showTooltips?: boolean;

  /** Initial collapsed state */
  defaultCollapsed?: boolean;

  /** Z-index for the panel */
  zIndex?: number;
}

/**
 * Tooltip position relative to the button
 */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Props for individual action buttons
 */
export interface ActionButtonProps {
  action: ControlAction;
  size: PanelSize;
  showTooltip: boolean;
  index: number;
}

/**
 * Configuration object for position styles
 */
export type PositionConfig = {
  [K in PanelPosition]: string;
};

/**
 * Configuration object for size styles
 */
export type SizeConfigMap = {
  [K in PanelSize]: SizeConfig;
};

/**
 * Configuration object for variant styles
 */
export type VariantConfig = {
  [K in ActionVariant]: string;
};
// src/types/fcp.ts
