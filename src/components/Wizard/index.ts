// src/components/Wizard/index.ts

// =============================================================================
// HEADLESS COMPOUND COMPONENT API (Recommended)
// =============================================================================

// Core Components
export {
  // Root container
  WizardRoot,
  // Content containers
  WizardContent,
  WizardPanel,
  // Trigger components
  WizardNextTrigger,
  WizardPrevTrigger,
  WizardGoToTrigger,
  WizardResetTrigger,
  WizardNav,
} from './core';

// Core Hooks
export {
  useWizard,
  useWizardStep,
  useWizardNavigation,
  useWizardProgress,
  useWizardContext,
  WizardProvider,
} from './core';

// Core Types
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
} from './core';

// Store Factory (for advanced use cases)
export { createWizardStore, type WizardStoreInstance } from './core';

// =============================================================================
// STYLED COMPONENTS (Pre-built Apple-inspired UI)
// =============================================================================

export {
  WizardStepper,
  WizardNavigation,
  WizardNavigationMinimal,
  WizardNavigationSplit,
  WizardCard,
  WizardCardContainer,
  WizardStepHeader,
  WizardFormStep,
} from './styled';

// =============================================================================
// LEGACY API (Deprecated - will be removed in next major version)
// =============================================================================

// Legacy components
export { default as Wizard } from './Wizard';
export { default as LegacyWizardProvider } from './WizardProvider';

// Legacy hooks
export {
  useWizard as useLegacyWizard,
  useWizardStep as useLegacyWizardStep,
} from './hooks/useWizardStep';

// Legacy types
export type {
  WizardStep as LegacyWizardStep,
  WizardState as LegacyWizardState,
  WizardHooks as LegacyWizardHooks,
  StepDataMap as LegacyStepDataMap,
} from './types';

// Legacy theme
export { defaultTheme } from './theme';
export type { WizardTheme } from './theme';
