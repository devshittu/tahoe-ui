/**
 * @tahoe-ui/wizard
 *
 * Multi-step wizard component with event bus validation.
 *
 * Features:
 * - Multi-step form navigation
 * - Event bus for step validation
 * - Zustand-powered state management
 * - Framer Motion animations
 * - Conditional step visibility
 * - Lazy rendering support
 * - Full keyboard navigation
 * - Accessible (ARIA compliant)
 * - Customizable theming
 *
 * @example
 * ```tsx
 * import { Wizard, WizardProvider, useWizardStep } from '@tahoe-ui/wizard';
 *
 * const steps = [
 *   { id: 'step1', title: 'Personal Info', render: () => <PersonalInfoForm /> },
 *   { id: 'step2', title: 'Address', render: () => <AddressForm /> },
 *   { id: 'step3', title: 'Review', render: () => <ReviewStep /> },
 * ];
 *
 * function App() {
 *   return (
 *     <WizardProvider
 *       steps={steps}
 *       hooks={{ onWizardComplete: (data) => console.log(data) }}
 *     >
 *       <Wizard showProgress />
 *     </WizardProvider>
 *   );
 * }
 * ```
 */

// Components
export { Wizard } from './Wizard';
export { WizardProvider } from './WizardProvider';

// Hooks
export {
  useWizard,
  useWizardStep,
  useWizardNavigation,
  WizardContext,
} from './hooks';

// Store
export { createWizardStore } from './store';
export type { WizardStore } from './store';

// Event Bus
export {
  default as eventBus,
  validateStep,
  updateStepData,
  navigateWizard,
  reportError,
  completeWizard,
  onValidationStatus,
  offValidationStatus,
  EVENT_STEP_VALIDATE,
  EVENT_STEP_VALIDATION_STATUS,
  EVENT_STEP_DATA_UPDATE,
  EVENT_WIZARD_NAVIGATE,
  EVENT_WIZARD_ERROR,
  EVENT_WIZARD_COMPLETE,
} from './eventBus';
export type { WizardEventMap } from './eventBus';

// Types
export type {
  WizardStep,
  WizardState,
  WizardConfig,
  WizardHooks,
  WizardTheme,
  WizardError,
  StepMeta,
  StepDataMap,
} from './types';

// Default theme
export { defaultTheme } from './types';
