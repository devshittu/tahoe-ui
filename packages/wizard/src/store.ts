import { create } from 'zustand';
import type {
  WizardState,
  WizardStep,
  StepDataMap,
  WizardHooks,
  WizardConfig,
} from './types';
import eventBus, {
  EVENT_STEP_VALIDATE,
  EVENT_STEP_DATA_UPDATE,
  EVENT_STEP_VALIDATION_STATUS,
  EVENT_WIZARD_NAVIGATE,
  EVENT_WIZARD_ERROR,
  EVENT_WIZARD_COMPLETE,
} from './eventBus';

/**
 * Default wizard configuration
 */
const defaultConfig: WizardConfig = {
  lazyRendering: true,
  renderAdjacent: false,
  requireStepValidation: true,
};

/**
 * Create a wizard store with all the desired functionality.
 *
 * @example
 * ```tsx
 * const useWizardStore = createWizardStore(steps, {
 *   onWizardComplete: (data) => console.log('Complete!', data),
 * });
 * ```
 */
export const createWizardStore = <TSteps extends WizardStep[]>(
  steps: TSteps,
  hooks?: WizardHooks,
  config: WizardConfig = defaultConfig
) => {
  const mergedConfig = { ...defaultConfig, ...config };

  return create<WizardState<TSteps>>((set, get) => ({
    config: mergedConfig,
    steps,
    currentStepIndex: 0,
    stepData: {} as StepDataMap<TSteps>,
    error: null,
    validationStatus: {},

    // Compute visible steps based on conditions
    get visibleSteps() {
      const { stepData } = get();
      return steps.filter(
        (step) => !step.condition || step.condition(stepData)
      );
    },

    // Compute rendered steps based on lazy rendering config
    get renderedSteps() {
      const { currentStepIndex, visibleSteps } = get();
      const { lazyRendering, renderAdjacent } = mergedConfig;

      if (!lazyRendering) return visibleSteps;

      if (renderAdjacent) {
        return visibleSteps.filter((step, index) => {
          const isAdjacent =
            index === currentStepIndex ||
            index === currentStepIndex - 1 ||
            index === currentStepIndex + 1;
          return isAdjacent || step.lazy;
        });
      }

      return visibleSteps.filter(
        (step, index) => index === currentStepIndex || step.lazy
      );
    },

    // Navigate to the next step
    nextStep: async () => {
      const { currentStepIndex, visibleSteps, stepData, setError } = get();
      const currentStep = visibleSteps[currentStepIndex];

      if (!currentStep) return;

      // Emit validation request and wait for result
      const isValid = await new Promise<boolean>((resolve) => {
        eventBus.emit(EVENT_STEP_VALIDATE, {
          stepId: currentStep.id,
          data: stepData[currentStep.id as keyof StepDataMap<TSteps>],
          resolve,
        });
      });

      if (!isValid && mergedConfig.requireStepValidation) {
        setError({
          userMessage: `Please complete "${currentStep.title}" correctly.`,
          devMessage: `Validation failed for step "${currentStep.id}".`,
        });
        return;
      }

      const nextStep = visibleSteps[currentStepIndex + 1];
      if (nextStep) {
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

    // Navigate to the previous step
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

    // Update data for a step
    setStepData: (stepId, data) => {
      set((state) => {
        const updatedData = { ...state.stepData, [stepId]: data };
        eventBus.emit(EVENT_STEP_DATA_UPDATE, { stepId, data });

        const step = state.steps.find((s) => s.id === stepId);
        if (step?.validate) {
          Promise.resolve(step.validate(data)).then((isValid) => {
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

    // Set error state
    setError: (error) => {
      set({ error });
      if (error) {
        eventBus.emit(EVENT_WIZARD_ERROR, { message: error.userMessage });
      }
    },
  }));
};

export type WizardStore<TSteps extends WizardStep[]> = ReturnType<
  typeof createWizardStore<TSteps>
>;
