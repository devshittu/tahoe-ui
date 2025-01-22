import mitt from 'mitt';

// Define event name constants
export const EVENT_STEP_VALIDATE = 'step:validate';
export const EVENT_STEP_VALIDATION_STATUS = 'step:validationStatus';
export const EVENT_STEP_DATA_UPDATE = 'step:dataUpdate';
export const EVENT_WIZARD_NAVIGATE = 'wizard:navigate';
export const EVENT_WIZARD_ERROR = 'wizard:error';
export const EVENT_WIZARD_COMPLETE = 'wizard:complete';

// Define the event map for our wizard
export type WizardEventMap = {
  [EVENT_STEP_VALIDATE]: {
    stepId: string;
    data: any;
    resolve: (isValid: boolean) => void;
  }; // Request validation with a resolve callback
  [EVENT_STEP_VALIDATION_STATUS]: { stepId: string; isValid: boolean }; // Validation status event
  [EVENT_STEP_DATA_UPDATE]: { stepId: string; data: any }; // Data update event
  [EVENT_WIZARD_NAVIGATE]: { fromStep: string; toStep: string }; // Navigation events
  [EVENT_WIZARD_ERROR]: { message: string }; // Errors
  [EVENT_WIZARD_COMPLETE]: { stepData: Record<string, any> }; // Wizard completion
};

// Create the event bus instance
const eventBus = mitt<WizardEventMap>();

// Utility for emitting validation requests
export const validateStep = async (
  stepId: string,
  data: any,
): Promise<boolean> => {
  return new Promise((resolve) => {
    eventBus.emit(EVENT_STEP_VALIDATE, { stepId, data, resolve });
  });
};

// Subscribe to validation status updates
export const onValidationStatus = (
  callback: (
    event: WizardEventMap[typeof EVENT_STEP_VALIDATION_STATUS],
  ) => void,
) => {
  eventBus.on(EVENT_STEP_VALIDATION_STATUS, callback);
};

// Unsubscribe from validation status updates
export const offValidationStatus = (
  callback: (
    event: WizardEventMap[typeof EVENT_STEP_VALIDATION_STATUS],
  ) => void,
) => {
  eventBus.off(EVENT_STEP_VALIDATION_STATUS, callback);
};

// Utility for emitting data updates
export const updateStepData = (stepId: string, data: any) => {
  eventBus.emit(EVENT_STEP_DATA_UPDATE, { stepId, data });
};

// Utility for navigating the wizard
export const navigateWizard = (fromStep: string, toStep: string) => {
  eventBus.emit(EVENT_WIZARD_NAVIGATE, { fromStep, toStep });
};

// Utility for broadcasting errors
export const reportError = (message: string) => {
  eventBus.emit(EVENT_WIZARD_ERROR, { message });
};

// Utility for marking the wizard as complete
export const completeWizard = (stepData: Record<string, any>) => {
  eventBus.emit(EVENT_WIZARD_COMPLETE, { stepData });
};

export default eventBus;
// src/utils/eventBus.ts
