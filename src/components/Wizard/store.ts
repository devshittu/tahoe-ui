// src/components/Wizard/store.ts
import { create } from 'zustand';
import { WizardState, WizardStep, StepDataMap, WizardHooks } from './types';
import eventBus, {
  EVENT_STEP_VALIDATE,
  EVENT_STEP_DATA_UPDATE,
  EVENT_STEP_VALIDATION_STATUS,
  EVENT_WIZARD_NAVIGATE,
  EVENT_WIZARD_ERROR,
  EVENT_WIZARD_COMPLETE,
} from '@/utils/eventBus';

/** Create a wizard store with all the desired functionality. */
export const createWizardStore = <TSteps extends WizardStep[]>(
  steps: TSteps,
  hooks?: WizardHooks,
  lazyRendering: boolean = true, // Optional parameter to toggle lazy rendering
  renderAdjacent: boolean = false, // Optional parameter to toggle adjacent steps rendering
) => {
  return create<WizardState<TSteps>>((set, get) => ({
    steps,
    currentStepIndex: 0,
    stepData: {} as StepDataMap<TSteps>,
    error: null,
    validationStatus: {}, // New field to track validation state for each step

    // Compute visible steps based on the condition, if provided.

    get visibleSteps() {
      const { stepData } = get();
      const visible = steps.filter(
        (step) => !step.condition || step.condition(stepData),
      );
      console.log('Visible Steps:', visible); // Debug log
      return visible;
    },

    // For lazy rendering: only render the current step (or optionally adjacent steps).
    get renderedSteps() {
      const { currentStepIndex, visibleSteps } = get();
      if (!lazyRendering) {
        // Render all visible steps
        return visibleSteps;
      }
      if (renderAdjacent) {
        // Render current step and adjacent steps
        return visibleSteps.filter((_, index) =>
          [
            currentStepIndex - 1,
            currentStepIndex,
            currentStepIndex + 1,
          ].includes(index),
        );
      }
      // Default: Render only the current step
      return [visibleSteps[currentStepIndex]];
    },

    nextStep: async () => {
      const { currentStepIndex, visibleSteps, stepData, setError } = get();
      const currentStep = visibleSteps[currentStepIndex];

      // Emit validation request and wait for validation result
      const isValid = await new Promise<boolean>((resolve) => {
        eventBus.emit(EVENT_STEP_VALIDATE, {
          stepId: currentStep.id,
          data: stepData[currentStep.id as keyof StepDataMap<TSteps>],
          resolve, // Include resolve callback
        });
      });

      if (!isValid) {
        setError({
          userMessage: `Please complete "${currentStep.title}" correctly.`,
          devMessage: `Validation failed for step "${currentStep.id}".`,
        });
        return;
      }

      // Move to next step
      const nextStep = visibleSteps[currentStepIndex + 1];
      if (currentStepIndex < visibleSteps.length - 1) {
        setError(null);
        hooks?.onStepLeave?.(currentStep.id, nextStep.id);
        set({ currentStepIndex: currentStepIndex + 1 });
        hooks?.onStepEnter?.(nextStep.id, currentStep.id);
        eventBus.emit(EVENT_WIZARD_NAVIGATE, {
          fromStep: currentStep.id,
          toStep: nextStep.id,
        });
      } else {
        // Complete wizard
        hooks?.onWizardComplete?.(stepData);
        eventBus.emit(EVENT_WIZARD_COMPLETE, { stepData });
      }
    },

    prevStep: () => {
      const { currentStepIndex, visibleSteps } = get();
      if (currentStepIndex > 0) {
        const currentStep = visibleSteps[currentStepIndex];
        const prevStep = visibleSteps[currentStepIndex - 1];
        hooks?.onStepLeave?.(currentStep.id, prevStep.id);
        set({ currentStepIndex: currentStepIndex - 1 });
        hooks?.onStepEnter?.(prevStep.id, currentStep.id);
        eventBus.emit(EVENT_WIZARD_NAVIGATE, {
          fromStep: currentStep.id,
          toStep: prevStep.id,
        });
      }
    },

    setStepData: (stepId, data) => {
      set((state) => {
        const updatedData = { ...state.stepData, [stepId]: data };

        // Emit data update event
        eventBus.emit(EVENT_STEP_DATA_UPDATE, { stepId, data });

        // Trigger validation whenever data is updated
        const step = state.steps.find((s) => s.id === stepId);
        if (step?.validate) {
          // Normalize validate to always return a Promise
          Promise.resolve(step.validate(data)).then((isValid: boolean) => {
            set((currentState) => ({
              ...currentState,
              validationStatus: {
                ...currentState.validationStatus,
                [stepId]: isValid,
              },
            }));
            eventBus.emit(EVENT_STEP_VALIDATION_STATUS, { stepId, isValid });
          });
        }

        return { ...state, stepData: updatedData };
      });
    },
    setError: (error) => {
      set({ error });
      if (error) {
        eventBus.emit(EVENT_WIZARD_ERROR, { message: error.userMessage });
      }
    },
  }));
};

// src/components/Wizard/store.ts
