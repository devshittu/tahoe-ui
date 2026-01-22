/**
 * @tahoe-ui/overlay
 *
 * Overlay components for modals, toasts, and tooltips
 * with physics-based animations and full accessibility support.
 */

// ============================================================================
// Modal System
// ============================================================================

// Components
export { Dialog, type DialogProps } from './modal/Dialog';
export { PageMode, type PageModeProps } from './modal/PageMode';
export {
  HandlebarZone,
  type HandlebarZoneProps,
} from './modal/shared/HandlebarZone';
export {
  ModalBackdrop,
  CloseIndicator,
  type ModalBackdropProps,
  type CloseIndicatorProps,
} from './modal/shared/components';

// Store and Hooks
export {
  modalStore,
  useModals,
  usePageMode,
  useDialog,
  type ModalType,
  type ModalInstance,
  type ModalStoreState,
} from './modal/stores/useModalStore';

// Modal Hooks
export {
  useModalDrag,
  useModalA11y,
  useReducedMotion,
  type UseReducedMotionReturn,
  type UseModalDragOptions,
  type UseModalDragReturn,
  type UseModalA11yOptions,
  type UseModalA11yReturn,
} from './modal/shared/hooks';

// Shared Utilities
export { useDragResistance } from './modal/shared/useDragResistance';
export { useSquashStretch } from './modal/shared/useSquashStretch';
export {
  useFocusTrap,
  useScreenReaderAnnouncement,
  generateUniqueId,
} from './modal/shared/a11yUtils';

// Modal Types
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
} from './modal/shared/types';

export {
  SPACING_DEFAULTS,
  MOTION_DEFAULTS,
  SPRING_CONFIG,
  OVERLAY_TRANSITION,
  SLIDE_TRANSITION,
  DEFAULT_BACKDROP_EFFECTS,
  DEFAULT_SQUASH_STRETCH,
  DEFAULT_LOADING_STATE,
  DEFAULT_A11Y_OPTIONS,
} from './modal/shared/types';

// Animation Utilities
export {
  createSlideVariants,
  getDragAxis,
  getDragConstraints,
  getRoundedClasses,
  getContentPadding,
} from './modal/shared/animations';

// Sizing Utilities
export {
  getDialogSizingStyles,
  getDialogSizingClasses,
  type DialogSizingOptions,
} from './modal/shared/sizing';

// ============================================================================
// Toast System
// ============================================================================

// Components
export { Toast } from './toast/Toast';
export { ToastContainer } from './toast/ToastContainer';

// Store and Hooks
export { useToastStore, useToast, useToastState } from './toast/store';

// Toast Types
export type {
  ToastVariant,
  ToastPosition,
  DismissMode,
  ToastConfig,
  Toast as ToastType,
  ToastState,
  ToastActions,
  ToastStore,
} from './toast/types';

export { DEFAULT_TOAST_CONFIG, TOAST_VARIANT_STYLES } from './toast/types';

// ============================================================================
// Tooltip System
// ============================================================================

// Components
export { Tooltip } from './tooltip/Tooltip';

// Tooltip Types
export type {
  TooltipProps,
  TooltipConfig,
  TooltipTrigger,
  TooltipVariant,
  TooltipSize,
  TooltipPlacement,
} from './tooltip/types';

export {
  DEFAULT_TOOLTIP_CONFIG,
  TOOLTIP_VARIANT_STYLES,
  TOOLTIP_SIZE_STYLES,
  PLACEMENT_CLASSES,
  ARROW_CLASSES,
  ARROW_COLORS,
} from './tooltip/types';

// ============================================================================
// HoverCard System
// ============================================================================

// Components
export { HoverCard, HoverCardDefault } from './hovercard';

// Hooks
export { useHoverIntent, useHoverCardGroup } from './hovercard';

// Types
export type {
  HoverCardProps,
  HoverCardPlacement,
  HoverCardSize,
  UseHoverIntentOptions,
  UseHoverIntentReturn,
} from './hovercard';

export { HOVER_CARD_SIZES, HOVER_CARD_CONFIG } from './hovercard';

// ============================================================================
// ContextMenu System
// ============================================================================

// Components
export {
  ContextMenu,
  ContextMenuDefault,
  ContextMenuItem,
} from './contextmenu';

// Types
export type {
  ContextMenuProps,
  ContextMenuItemProps,
  ContextMenuItemData,
  ContextMenuItemType,
  ContextMenuBehavior,
  ContextMenuState,
  MenuPosition,
} from './contextmenu';

export { CONTEXT_MENU_CONFIG, CONTEXT_MENU_STYLES } from './contextmenu';

// ============================================================================
// CommandMenu System
// ============================================================================

// Components
export { CommandMenu, CommandMenuDefault } from './commandmenu';

// Types
export type {
  CommandMenuProps,
  CommandItem,
  CommandGroup,
  CommandMenuSize,
  CommandMenuConfig,
  HandlebarPosition,
} from './commandmenu';

export {
  DEFAULT_COMMAND_CONFIG,
  COMMAND_SIZE_CLASSES,
  COMMAND_MENU_STYLES,
} from './commandmenu';

// ============================================================================
// Shared Utilities
// ============================================================================

export { Portal } from './utils/Portal';
export { SafeMotionDiv } from './utils/SafeMotionDiv';

// Icons
export {
  CheckIcon,
  AlertCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
  XIcon,
} from './icons';
