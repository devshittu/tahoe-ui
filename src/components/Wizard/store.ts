// src/components/Wizard/store.ts

import { create } from 'zustand';
import { WizardState, WizardStep, StepDataMap, WizardHooks } from './types';

/** Create a wizard store with all the desired functionality. */
export const createWizardStore = <TSteps extends WizardStep[]>(
  steps: TSteps,
  hooks?: WizardHooks,
) => {
  return create<WizardState<TSteps>>((set, get) => ({
    steps,
    currentStepIndex: 0,
    stepData: {} as StepDataMap<TSteps>,
    error: null,

    // Compute visible steps based on the condition, if provided.
    get visibleSteps() {
      const { stepData } = get();
      return steps.filter(
        (step) => !step.condition || step.condition(stepData),
      );
    },

    // For lazy rendering: only render the current step (or optionally adjacent steps).
    get renderedSteps() {
      const { currentStepIndex, visibleSteps } = get();
      // For simplicity, only render the current step.
      return [visibleSteps[currentStepIndex]];
    },

    nextStep: async () => {
      const { currentStepIndex, visibleSteps, stepData, setError } = get();
      const currentStep = visibleSteps[currentStepIndex];
      // Validate current step if a validation function is provided.
      if (currentStep.validate) {
        const isValid = await currentStep.validate(
          stepData[currentStep.id as keyof StepDataMap<TSteps>],
        );
        if (!isValid) {
          setError({
            userMessage: `Please complete "${currentStep.title}" correctly.`,
            devMessage: `Validation failed for step "${currentStep.id}".`,
          });
          return;
        }
      }
      const nextStep = visibleSteps[currentStepIndex + 1];

      if (currentStepIndex < visibleSteps.length - 1) {
        setError(null);
        hooks?.onStepLeave?.(currentStep.id, nextStep.id);
        set({ currentStepIndex: currentStepIndex + 1 });
        hooks?.onStepEnter?.(nextStep.id, currentStep.id);
      } else {
        // When at the final step, consider wizard complete.
        hooks?.onWizardComplete?.(stepData);
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
      }
    },

    setStepData: (stepId, data) => {
      set((state) => ({
        stepData: { ...state.stepData, [stepId]: data },
      }));
    },

    setError: (error) => {
      set({ error });
    },
  }));
};
