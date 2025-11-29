// src/components/ui/index.ts

// Floating Control Panel exports
export { default as FloatingControlPanel } from './FloatingControlPanel';
export { ConfirmationPopover } from './ConfirmationPopover';
export type { ConfirmationPopoverProps } from './ConfirmationPopover';

// Re-export types for convenience
export type {
  ControlAction,
  ActionVariant,
  PanelSize,
  PanelPosition,
  FloatingControlPanelProps,
} from '@/types/fcp';
