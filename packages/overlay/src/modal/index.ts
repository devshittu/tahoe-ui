// Modal System Components
export { Dialog, type DialogProps } from './Dialog';
export { PageMode, type PageModeProps } from './PageMode';

// Modal Store and Hooks
export {
  modalStore,
  useModals,
  usePageMode,
  useDialog,
  type ModalType,
  type ModalInstance,
  type ModalStoreState,
} from './stores/useModalStore';

// Shared Types
export type {
  Position,
  A11yOptions,
  DragResistanceConfig,
  BackdropEffectsConfig,
  SquashStretchConfig,
  LoadingStateConfig,
  SpringConfig,
  DialogMaxWidthPreset,
  DialogSizingConfig,
} from './shared/types';

// Shared Utilities
export {
  createSlideVariants,
  getDragAxis,
  getDragConstraints,
  getRoundedClasses,
  getContentPadding,
} from './shared/animations';

export {
  getDialogSizingStyles,
  getDialogSizingClasses,
  type DialogSizingOptions,
} from './shared/sizing';

// Shared Hooks
export {
  useReducedMotion,
  useModalDrag,
  useModalA11y,
  type UseReducedMotionReturn,
  type UseModalDragOptions,
  type UseModalDragReturn,
  type UseModalA11yOptions,
  type UseModalA11yReturn,
} from './shared/hooks';

// Shared Components
export {
  ModalBackdrop,
  CloseIndicator,
  type ModalBackdropProps,
  type CloseIndicatorProps,
} from './shared/components';

export { HandlebarZone, type HandlebarZoneProps } from './shared/HandlebarZone';
