// @tahoe-ui/wizard - Core Exports
// Headless compound component architecture for building wizards

// Types
export type {
  StepStatus,
  ProgressVariant,
  WizardStepDefinition,
  WizardStepState,
  WizardData,
  WizardAnimationConfig,
  WizardPersistenceConfig,
  WizardConfig,
  WizardLifecycleHooks,
  WizardStore,
  WizardContextValue,
  UseWizardReturn,
  UseWizardStepReturn,
  UseWizardNavigationReturn,
  UseWizardProgressReturn,
  WizardContentRenderProps,
  WizardPanelRenderProps,
  WizardPanelProps,
  WizardContentProps,
} from './types';

// Store
export { createWizardStore } from './store';

// Context & Hooks
export {
  WizardProvider,
  useWizardContext,
  useWizard,
  useWizardStep,
  useWizardNavigation,
  useWizardProgress,
} from './WizardContext';

// Components
export { WizardRoot } from './WizardRoot';
export { WizardContent } from './WizardContent';
export { WizardPanel } from './WizardPanel';
export { WizardProgress } from './WizardProgress';
export {
  WizardNextTrigger,
  WizardPrevTrigger,
  WizardGoToTrigger,
  WizardResetTrigger,
  WizardNav,
} from './WizardTrigger';
