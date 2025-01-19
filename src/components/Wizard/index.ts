// Export core components
export { default as Wizard } from './Wizard';
export { default as WizardProvider } from './WizardProvider';

// Export hooks
export { useWizard, useWizardStep } from './hooks/useWizardStep';

// Export types
export type {
  WizardStep,
  WizardState,
  WizardHooks,
  StepDataMap,
//   WizardError,
} from './types';

// Export theme
export { defaultTheme } from './theme';
export type { WizardTheme } from './theme';