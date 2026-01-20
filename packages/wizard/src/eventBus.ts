import mitt from 'mitt';

/**
 * Event name constants for the wizard event bus
 */
export const EVENT_STEP_VALIDATE = 'step:validate';
export const EVENT_STEP_VALIDATION_STATUS = 'step:validationStatus';
export const EVENT_STEP_DATA_UPDATE = 'step:dataUpdate';
export const EVENT_WIZARD_NAVIGATE = 'wizard:navigate';
export const EVENT_WIZARD_ERROR = 'wizard:error';
export const EVENT_WIZARD_COMPLETE = 'wizard:complete';

/**
 * Event map type definitions for type-safe event handling
 */
export type WizardEventMap = {
  [EVENT_STEP_VALIDATE]: {
    stepId: string;
    data: unknown;
    resolve: (isValid: boolean) => void;
  };
  [EVENT_STEP_VALIDATION_STATUS]: { stepId: string; isValid: boolean };
  [EVENT_STEP_DATA_UPDATE]: { stepId: string; data: unknown };
  [EVENT_WIZARD_NAVIGATE]: { fromStep: string; toStep: string };
  [EVENT_WIZARD_ERROR]: { message: string };
  [EVENT_WIZARD_COMPLETE]: { stepData: Record<string, unknown> };
};

/**
 * Create the event bus instance using mitt
 */
const eventBus = mitt<WizardEventMap>();

/**
 * Utility for emitting validation requests and waiting for response
 */
export const validateStep = async (
  stepId: string,
  data: unknown,
): Promise<boolean> => {
  return new Promise((resolve) => {
    eventBus.emit(EVENT_STEP_VALIDATE, { stepId, data, resolve });
  });
};

/**
 * Subscribe to validation status updates
 */
export const onValidationStatus = (
  callback: (
    event: WizardEventMap[typeof EVENT_STEP_VALIDATION_STATUS],
  ) => void,
) => {
  eventBus.on(EVENT_STEP_VALIDATION_STATUS, callback);
};

/**
 * Unsubscribe from validation status updates
 */
export const offValidationStatus = (
  callback: (
    event: WizardEventMap[typeof EVENT_STEP_VALIDATION_STATUS],
  ) => void,
) => {
  eventBus.off(EVENT_STEP_VALIDATION_STATUS, callback);
};

/**
 * Utility for emitting data updates
 */
export const updateStepData = (stepId: string, data: unknown) => {
  eventBus.emit(EVENT_STEP_DATA_UPDATE, { stepId, data });
};

/**
 * Utility for navigating the wizard
 */
export const navigateWizard = (fromStep: string, toStep: string) => {
  eventBus.emit(EVENT_WIZARD_NAVIGATE, { fromStep, toStep });
};

/**
 * Utility for broadcasting errors
 */
export const reportError = (message: string) => {
  eventBus.emit(EVENT_WIZARD_ERROR, { message });
};

/**
 * Utility for marking the wizard as complete
 */
export const completeWizard = (stepData: Record<string, unknown>) => {
  eventBus.emit(EVENT_WIZARD_COMPLETE, { stepData });
};

export default eventBus;
