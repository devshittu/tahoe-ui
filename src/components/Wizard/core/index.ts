// src/components/Wizard/core/index.ts

// =============================================================================
// TYPES
// =============================================================================

export type {
  // Step types
  StepStatus,
  WizardStepDefinition,
  WizardStepState,
  // Data types
  WizardData,
  StepData,
  // Config types
  WizardConfig,
  WizardPersistenceConfig,
  WizardAnimationConfig,
  WizardLifecycleHooks,
  // Store types
  WizardState,
  WizardActions,
  WizardStore,
  WizardStoreApi,
  WizardContextValue,
  // Component prop types
  WizardRootProps,
  WizardContentProps,
  WizardContentRenderProps,
  WizardPanelProps,
  WizardPanelRenderProps,
  // Progress types
  ProgressVariant,
  ProgressStep,
  WizardProgressRenderProps,
  WizardProgressProps,
  WizardStepperProps,
  // Navigation types
  WizardNavigationRenderProps,
  WizardNavProps,
  WizardNavigationProps,
  // Trigger types
  WizardTriggerBaseProps,
  WizardNextTriggerProps,
  WizardPrevTriggerProps,
  WizardGoToTriggerProps,
  WizardResetTriggerProps,
  // Hook return types
  UseWizardReturn,
  UseWizardStepReturn,
  UseWizardNavigationReturn,
  UseWizardProgressReturn,
} from './types';

// =============================================================================
// STORE
// =============================================================================

export { createWizardStore, type WizardStoreInstance } from './store';

// =============================================================================
// CONTEXT & HOOKS
// =============================================================================

export {
  WizardProvider,
  useWizardContext,
  useWizard,
  useWizardStep,
  useWizardNavigation,
  useWizardProgress,
} from './WizardContext';

// =============================================================================
// HEADLESS COMPONENTS
// =============================================================================

// Root container
export { WizardRoot } from './WizardRoot';

// Content containers
export { WizardContent } from './WizardContent';
export { WizardPanel } from './WizardPanel';

// Trigger components
export {
  WizardNextTrigger,
  WizardPrevTrigger,
  WizardGoToTrigger,
  WizardResetTrigger,
  WizardNav,
} from './WizardTrigger';

// Progress component
export { WizardProgress } from './WizardProgress';
