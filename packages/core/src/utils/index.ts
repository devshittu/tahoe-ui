/**
 * Utility Functions Barrel Export
 *
 * Core utilities for the Tahoe UI design system.
 */

export { cn } from './cn';
export {
  default as eventBus,
  EVENT_STEP_VALIDATE,
  EVENT_STEP_VALIDATION_STATUS,
  EVENT_STEP_DATA_UPDATE,
  EVENT_WIZARD_NAVIGATE,
  EVENT_WIZARD_ERROR,
  EVENT_WIZARD_COMPLETE,
  validateStep,
  onValidationStatus,
  offValidationStatus,
  updateStepData,
  navigateWizard,
  reportError,
  completeWizard,
} from './eventBus';
export type { WizardEventMap } from './eventBus';
