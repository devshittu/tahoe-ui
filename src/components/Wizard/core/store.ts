// src/components/Wizard/core/store.ts

import { createStore } from 'zustand';
import type {
  WizardStore,
  WizardState,
  WizardStepDefinition,
  WizardStepState,
  WizardConfig,
  WizardLifecycleHooks,
  WizardData,
  StepStatus,
} from './types';

// =============================================================================
// DEFAULT VALUES
// =============================================================================

const DEFAULT_STEP_STATE: WizardStepState = {
  status: 'pending',
  isValidating: false,
  visited: false,
  error: undefined,
};

const DEFAULT_CONFIG: WizardConfig = {
  validateOnNext: true,
  validateOnChange: false,
  validationDebounce: 300,
  keyboardNavigation: true,
  persistence: undefined,
  animation: {
    enabled: true,
    direction: 'horizontal',
    stiffness: 300,
    damping: 25,
    duration: 300,
  },
};

// =============================================================================
// PERSISTENCE HELPERS
// =============================================================================

interface PersistedState {
  currentStepId?: string;
  data?: WizardData;
  completedSteps?: string[];
}

function getStorage(type: 'localStorage' | 'sessionStorage' | 'url') {
  if (typeof window === 'undefined') return null;

  if (type === 'url') {
    return {
      getItem: (key: string) => {
        const params = new URLSearchParams(window.location.search);
        const value = params.get(key);
        return value ? decodeURIComponent(value) : null;
      },
      setItem: (key: string, value: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set(key, encodeURIComponent(value));
        window.history.replaceState({}, '', url.toString());
      },
      removeItem: (key: string) => {
        const url = new URL(window.location.href);
        url.searchParams.delete(key);
        window.history.replaceState({}, '', url.toString());
      },
    };
  }

  return type === 'localStorage' ? window.localStorage : window.sessionStorage;
}

// =============================================================================
// STORE FACTORY
// =============================================================================

export interface CreateWizardStoreOptions {
  steps: WizardStepDefinition[];
  initialData?: WizardData;
  initialStepId?: string;
  config?: WizardConfig;
  hooks?: WizardLifecycleHooks;
}

export function createWizardStore(options: CreateWizardStoreOptions) {
  const {
    steps,
    initialData = {},
    initialStepId,
    config = {},
    hooks = {},
  } = options;

  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  // Initialize step states
  const initialStepStates: Record<string, WizardStepState> = {};
  steps.forEach((step, index) => {
    initialStepStates[step.id] = {
      ...DEFAULT_STEP_STATE,
      status: index === 0 ? 'active' : 'pending',
      visited: index === 0,
    };
  });

  // Find initial step index
  let initialStepIndex = 0;
  if (initialStepId) {
    const idx = steps.findIndex((s) => s.id === initialStepId);
    if (idx !== -1) {
      initialStepIndex = idx;
      // Mark all steps up to initial as visited
      for (let i = 0; i <= idx; i++) {
        initialStepStates[steps[i].id] = {
          ...initialStepStates[steps[i].id],
          visited: true,
          status: i === idx ? 'active' : 'pending',
        };
      }
    }
  }

  // Panel validations registry (for WizardPanel component validations)
  const panelValidations = new Map<
    string,
    (data: unknown) => boolean | string | Promise<boolean | string>
  >();

  // Validation debounce timers
  const validationTimers = new Map<string, NodeJS.Timeout>();

  return createStore<WizardStore>((set, get) => ({
    // =========================================================================
    // INITIAL STATE
    // =========================================================================
    steps,
    currentStepIndex: initialStepIndex,
    data: { ...initialData },
    stepStates: initialStepStates,
    direction: null,
    isLoading: false,
    error: null,
    isComplete: false,

    // =========================================================================
    // COMPUTED GETTERS
    // =========================================================================
    getVisibleSteps: () => {
      const state = get();
      return state.steps.filter(
        (step) => !step.condition || step.condition(state.data),
      );
    },

    getCurrentStep: () => {
      const state = get();
      return state.steps[state.currentStepIndex];
    },

    getCurrentStepId: () => {
      const state = get();
      return state.steps[state.currentStepIndex]?.id;
    },

    isFirstStep: () => {
      const state = get();
      const visibleSteps = state.getVisibleSteps();
      if (visibleSteps.length === 0) return true;

      const currentStep = state.getCurrentStep();
      const currentVisibleIndex = visibleSteps.findIndex(
        (s) => s.id === currentStep?.id,
      );
      return currentVisibleIndex <= 0;
    },

    isLastStep: () => {
      const state = get();
      const visibleSteps = state.getVisibleSteps();
      if (visibleSteps.length === 0) return true;

      const currentStep = state.getCurrentStep();
      const currentVisibleIndex = visibleSteps.findIndex(
        (s) => s.id === currentStep?.id,
      );
      return currentVisibleIndex >= visibleSteps.length - 1;
    },

    // =========================================================================
    // DATA MANAGEMENT
    // =========================================================================
    setStepData: <T>(stepId: string, data: T) => {
      set((state) => ({
        data: {
          ...state.data,
          [stepId]: data,
        },
      }));

      // Validate on change if configured
      if (mergedConfig.validateOnChange) {
        const existingTimer = validationTimers.get(stepId);
        if (existingTimer) clearTimeout(existingTimer);

        const timer = setTimeout(() => {
          get().validateStep(stepId);
          validationTimers.delete(stepId);
        }, mergedConfig.validationDebounce);

        validationTimers.set(stepId, timer);
      }

      // Persist if configured
      if (mergedConfig.persistence) {
        get().persist();
      }
    },

    updateStepData: <T>(stepId: string, updates: Partial<T>) => {
      set((state) => ({
        data: {
          ...state.data,
          [stepId]: {
            ...(state.data[stepId] as object),
            ...updates,
          },
        },
      }));

      // Same validation and persistence logic
      if (mergedConfig.validateOnChange) {
        const existingTimer = validationTimers.get(stepId);
        if (existingTimer) clearTimeout(existingTimer);

        const timer = setTimeout(() => {
          get().validateStep(stepId);
          validationTimers.delete(stepId);
        }, mergedConfig.validationDebounce);

        validationTimers.set(stepId, timer);
      }

      if (mergedConfig.persistence) {
        get().persist();
      }
    },

    getStepData: <T>(stepId: string) => {
      return get().data[stepId] as T | undefined;
    },

    getAllData: () => {
      return get().data;
    },

    // =========================================================================
    // STEP STATE MANAGEMENT
    // =========================================================================
    setStepError: (stepId: string, error: string | null) => {
      set((state) => ({
        stepStates: {
          ...state.stepStates,
          [stepId]: {
            ...state.stepStates[stepId],
            error: error ?? undefined,
            status: error
              ? 'error'
              : (state.stepStates[stepId]?.status ?? 'pending'),
          },
        },
      }));

      if (error) {
        hooks.onValidationError?.(stepId, error);
      }
    },

    setStepStatus: (stepId: string, status: StepStatus) => {
      set((state) => ({
        stepStates: {
          ...state.stepStates,
          [stepId]: {
            ...state.stepStates[stepId],
            status,
          },
        },
      }));
    },

    markStepVisited: (stepId: string) => {
      set((state) => ({
        stepStates: {
          ...state.stepStates,
          [stepId]: {
            ...state.stepStates[stepId],
            visited: true,
          },
        },
      }));
    },

    // =========================================================================
    // VALIDATION
    // =========================================================================
    validateStep: async (stepId: string) => {
      const state = get();
      const step = state.steps.find((s) => s.id === stepId);
      const stepData = state.data[stepId];
      const allData = state.data;

      // Get both step-level and panel-level validation
      const stepValidate = step?.validate;
      const panelValidate = panelValidations.get(stepId);

      // No validation = always valid
      if (!stepValidate && !panelValidate) {
        return true;
      }

      // Set validating state
      set((state) => ({
        stepStates: {
          ...state.stepStates,
          [stepId]: {
            ...state.stepStates[stepId],
            isValidating: true,
            error: undefined,
          },
        },
      }));

      try {
        // Run step-level validation
        if (stepValidate) {
          const result = await stepValidate(stepData, allData);
          if (result === false) {
            throw new Error('Validation failed');
          }
          if (typeof result === 'string') {
            throw new Error(result);
          }
        }

        // Run panel-level validation
        if (panelValidate) {
          const result = await panelValidate(stepData);
          if (result === false) {
            throw new Error('Validation failed');
          }
          if (typeof result === 'string') {
            throw new Error(result);
          }
        }

        // Validation passed
        set((state) => ({
          stepStates: {
            ...state.stepStates,
            [stepId]: {
              ...state.stepStates[stepId],
              isValidating: false,
              error: undefined,
            },
          },
        }));

        return true;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Validation failed';

        set((state) => ({
          stepStates: {
            ...state.stepStates,
            [stepId]: {
              ...state.stepStates[stepId],
              isValidating: false,
              error: errorMessage,
              status: 'error',
            },
          },
        }));

        hooks.onValidationError?.(stepId, errorMessage);
        return false;
      }
    },

    registerPanelValidation: (stepId, validate) => {
      panelValidations.set(stepId, validate);
    },

    unregisterPanelValidation: (stepId) => {
      panelValidations.delete(stepId);
    },

    // =========================================================================
    // NAVIGATION
    // =========================================================================
    nextStep: async () => {
      const state = get();
      const visibleSteps = state.getVisibleSteps();

      if (visibleSteps.length === 0) return false;

      const currentStep = state.getCurrentStep();
      const currentVisibleIndex = currentStep
        ? visibleSteps.findIndex((s) => s.id === currentStep.id)
        : 0;

      // If not found in visible steps, use 0
      const safeCurrentIndex =
        currentVisibleIndex === -1 ? 0 : currentVisibleIndex;

      // Last step - complete wizard
      if (safeCurrentIndex >= visibleSteps.length - 1) {
        // Validate current step first
        if (mergedConfig.validateOnNext && currentStep) {
          const isValid = await get().validateStep(currentStep.id);
          if (!isValid) return false;
        }
        get().complete();
        return true;
      }

      const currentVisibleStep = visibleSteps[safeCurrentIndex];
      const nextStep = visibleSteps[safeCurrentIndex + 1];

      if (!nextStep) return false;

      // Validate current step if required
      if (mergedConfig.validateOnNext && currentVisibleStep) {
        const isValid = await get().validateStep(currentVisibleStep.id);
        if (!isValid) return false;

        // Call onLeave hook
        await currentVisibleStep.onLeave?.(nextStep.id);
      }

      // Find global index of next step
      const nextStepGlobalIndex = state.steps.findIndex(
        (s) => s.id === nextStep.id,
      );

      set((state) => {
        const newStepStates = { ...state.stepStates };

        // Mark current step as completed
        if (currentVisibleStep) {
          newStepStates[currentVisibleStep.id] = {
            ...newStepStates[currentVisibleStep.id],
            status: 'completed',
          };
        }

        // Mark next step as active and visited
        newStepStates[nextStep.id] = {
          ...newStepStates[nextStep.id],
          status: 'active',
          visited: true,
        };

        return {
          currentStepIndex: nextStepGlobalIndex,
          direction: 'forward' as const,
          stepStates: newStepStates,
        };
      });

      // Call onEnter hook
      await nextStep.onEnter?.(currentVisibleStep?.id);

      // Lifecycle callback
      hooks.onStepChange?.(nextStep.id, currentVisibleStep?.id);

      // Persist if configured
      if (mergedConfig.persistence) {
        get().persist();
      }

      return true;
    },

    prevStep: () => {
      const state = get();
      const visibleSteps = state.getVisibleSteps();

      if (visibleSteps.length === 0) return;

      const currentStep = state.getCurrentStep();
      const currentVisibleIndex = currentStep
        ? visibleSteps.findIndex((s) => s.id === currentStep.id)
        : 0;

      // Can't go back from first step
      if (currentVisibleIndex <= 0) return;

      const currentVisibleStep = visibleSteps[currentVisibleIndex];
      const prevStep = visibleSteps[currentVisibleIndex - 1];

      if (!prevStep) return;

      // Find global index of prev step
      const prevStepGlobalIndex = state.steps.findIndex(
        (s) => s.id === prevStep.id,
      );

      // Call onLeave hook (no validation for going back)
      currentVisibleStep?.onLeave?.(prevStep.id);

      set((state) => {
        const newStepStates = { ...state.stepStates };

        // Mark current step as pending
        if (currentVisibleStep) {
          newStepStates[currentVisibleStep.id] = {
            ...newStepStates[currentVisibleStep.id],
            status: 'pending',
          };
        }

        // Mark prev step as active
        newStepStates[prevStep.id] = {
          ...newStepStates[prevStep.id],
          status: 'active',
        };

        return {
          currentStepIndex: prevStepGlobalIndex,
          direction: 'backward' as const,
          stepStates: newStepStates,
        };
      });

      // Call onEnter hook
      prevStep.onEnter?.(currentVisibleStep?.id);

      // Lifecycle callback
      hooks.onStepChange?.(prevStep.id, currentVisibleStep?.id);

      // Persist if configured
      if (mergedConfig.persistence) {
        get().persist();
      }
    },

    goToStep: async (stepId: string, options = {}) => {
      const { skipValidation = false } = options;
      const state = get();
      const visibleSteps = state.getVisibleSteps();

      if (visibleSteps.length === 0) return false;

      const targetIndex = visibleSteps.findIndex((s) => s.id === stepId);
      if (targetIndex === -1) return false;

      const currentStep = state.getCurrentStep();
      const currentVisibleIndex = currentStep
        ? visibleSteps.findIndex((s) => s.id === currentStep.id)
        : 0;

      const safeCurrentIndex =
        currentVisibleIndex === -1 ? 0 : currentVisibleIndex;
      const currentVisibleStep = visibleSteps[safeCurrentIndex];

      // Validate steps in between if going forward
      if (!skipValidation && targetIndex > safeCurrentIndex) {
        for (let i = safeCurrentIndex; i < targetIndex; i++) {
          const step = visibleSteps[i];
          if (step) {
            const isValid = await get().validateStep(step.id);
            if (!isValid) return false;
          }
        }
      }

      const targetStep = visibleSteps[targetIndex];
      if (!targetStep) return false;

      const targetGlobalIndex = state.steps.findIndex(
        (s) => s.id === targetStep.id,
      );

      // Call onLeave hook
      await currentVisibleStep?.onLeave?.(targetStep.id);

      set((state) => {
        const newStepStates = { ...state.stepStates };

        // Mark current step based on direction
        if (currentVisibleStep) {
          newStepStates[currentVisibleStep.id] = {
            ...newStepStates[currentVisibleStep.id],
            status: targetIndex > safeCurrentIndex ? 'completed' : 'pending',
          };
        }

        // Mark all steps between as visited (if going forward)
        if (targetIndex > safeCurrentIndex) {
          for (let i = safeCurrentIndex; i < targetIndex; i++) {
            const step = visibleSteps[i];
            if (step) {
              newStepStates[step.id] = {
                ...newStepStates[step.id],
                visited: true,
                status: 'completed',
              };
            }
          }
        }

        // Mark target step as active and visited
        newStepStates[targetStep.id] = {
          ...newStepStates[targetStep.id],
          status: 'active',
          visited: true,
        };

        return {
          currentStepIndex: targetGlobalIndex,
          direction: targetIndex > safeCurrentIndex ? 'forward' : 'backward',
          stepStates: newStepStates,
        };
      });

      // Call onEnter hook
      await targetStep.onEnter?.(currentVisibleStep?.id);

      // Lifecycle callback
      hooks.onStepChange?.(targetStep.id, currentVisibleStep?.id);

      // Persist if configured
      if (mergedConfig.persistence) {
        get().persist();
      }

      return true;
    },

    // =========================================================================
    // LIFECYCLE
    // =========================================================================
    reset: () => {
      const resetStepStates: Record<string, WizardStepState> = {};
      steps.forEach((step, index) => {
        resetStepStates[step.id] = {
          ...DEFAULT_STEP_STATE,
          status: index === 0 ? 'active' : 'pending',
          visited: index === 0,
        };
      });

      set({
        currentStepIndex: 0,
        data: { ...initialData },
        stepStates: resetStepStates,
        direction: null,
        isLoading: false,
        error: null,
        isComplete: false,
      });

      // Clear persisted state
      if (mergedConfig.persistence) {
        const storage = getStorage(mergedConfig.persistence.type);
        storage?.removeItem(mergedConfig.persistence.key);
      }

      hooks.onReset?.();
    },

    complete: () => {
      const state = get();
      const currentStep = state.getCurrentStep();

      set((state) => ({
        isComplete: true,
        stepStates: currentStep
          ? {
              ...state.stepStates,
              [currentStep.id]: {
                ...state.stepStates[currentStep.id],
                status: 'completed',
              },
            }
          : state.stepStates,
      }));

      hooks.onComplete?.(state.data);
    },

    // =========================================================================
    // PERSISTENCE
    // =========================================================================
    persist: () => {
      const persistConfig = mergedConfig.persistence;
      if (!persistConfig) return;

      const storage = getStorage(persistConfig.type);
      if (!storage) return;

      const state = get();
      const include = persistConfig.include || [
        'currentStep',
        'stepData',
        'completedSteps',
      ];

      const dataToPersist: PersistedState = {};

      if (include.includes('currentStep')) {
        dataToPersist.currentStepId = state.getCurrentStepId();
      }
      if (include.includes('stepData')) {
        dataToPersist.data = state.data;
      }
      if (include.includes('completedSteps')) {
        dataToPersist.completedSteps = Object.entries(state.stepStates)
          .filter(([, s]) => s.status === 'completed')
          .map(([id]) => id);
      }

      storage.setItem(persistConfig.key, JSON.stringify(dataToPersist));
    },

    restore: () => {
      const persistConfig = mergedConfig.persistence;
      if (!persistConfig) return false;

      const storage = getStorage(persistConfig.type);
      if (!storage) return false;

      try {
        const stored = storage.getItem(persistConfig.key);
        if (!stored) return false;

        const persisted = JSON.parse(stored) as PersistedState;

        set((state) => {
          const newState: Partial<WizardState> = {};

          // Restore current step
          if (persisted.currentStepId) {
            const idx = state.steps.findIndex(
              (s) => s.id === persisted.currentStepId,
            );
            if (idx !== -1) {
              newState.currentStepIndex = idx;
            }
          }

          // Restore data
          if (persisted.data) {
            newState.data = { ...state.data, ...persisted.data };
          }

          // Restore completed steps
          if (persisted.completedSteps) {
            const newStepStates = { ...state.stepStates };
            persisted.completedSteps.forEach((stepId) => {
              if (newStepStates[stepId]) {
                newStepStates[stepId] = {
                  ...newStepStates[stepId],
                  status: 'completed',
                  visited: true,
                };
              }
            });

            // Mark current step as active
            if (
              persisted.currentStepId &&
              newStepStates[persisted.currentStepId]
            ) {
              newStepStates[persisted.currentStepId] = {
                ...newStepStates[persisted.currentStepId],
                status: 'active',
                visited: true,
              };
            }

            newState.stepStates = newStepStates;
          }

          return newState;
        });

        return true;
      } catch {
        return false;
      }
    },
  }));
}

export type WizardStoreInstance = ReturnType<typeof createWizardStore>;
