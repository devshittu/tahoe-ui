// @tahoe-ui/wizard - Core Context
'use client';

import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { createWizardStore, type WizardStoreInstance } from './store';
import type {
  WizardContextValue,
  WizardConfig,
  WizardLifecycleHooks,
  WizardStepDefinition,
  WizardData,
  WizardStore,
  UseWizardReturn,
  UseWizardStepReturn,
  UseWizardNavigationReturn,
  UseWizardProgressReturn,
  ProgressStep,
} from './types';

// =============================================================================
// CUSTOM HOOK TO USE STORE (replaces useStore for type safety)
// =============================================================================

function useWizardStore(storeApi: WizardStoreInstance): WizardStore {
  return useSyncExternalStore(
    storeApi.subscribe,
    storeApi.getState,
    storeApi.getState,
  );
}

// =============================================================================
// CONTEXT
// =============================================================================

const WizardContext = createContext<WizardContextValue | null>(null);

// =============================================================================
// PROVIDER
// =============================================================================

interface WizardProviderProps {
  steps: WizardStepDefinition[];
  initialData?: WizardData;
  initialStepId?: string;
  config?: WizardConfig;
  hooks?: WizardLifecycleHooks;
  children: ReactNode;
}

export function WizardProvider({
  steps,
  initialData = {},
  initialStepId,
  config = {},
  hooks = {},
  children,
}: WizardProviderProps) {
  const storeRef = useRef<WizardStoreInstance | null>(null);

  // Create store once with steps defined upfront
  if (!storeRef.current) {
    storeRef.current = createWizardStore({
      steps,
      initialData,
      initialStepId,
      config,
      hooks,
    });
  }

  // Restore persisted state on mount if configured
  useEffect(() => {
    if (config.persistence?.restoreOnMount) {
      storeRef.current?.getState().restore();
    }
    hooks.onMount?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Memoize context value
  const contextValue = useMemo<WizardContextValue>(
    () => ({
      storeApi: storeRef.current!,
      config,
      hooks,
    }),
    [config, hooks],
  );

  return (
    <WizardContext.Provider value={contextValue}>
      {children}
    </WizardContext.Provider>
  );
}

// =============================================================================
// RAW CONTEXT HOOK
// =============================================================================

/**
 * Access raw wizard context (advanced use)
 */
export function useWizardContext(): WizardContextValue {
  const context = useContext(WizardContext);

  if (!context) {
    throw new Error('useWizardContext must be used within a WizardProvider');
  }

  return context;
}

// =============================================================================
// useWizard - Full wizard control
// =============================================================================

/**
 * Main hook for full wizard control
 * Provides access to all wizard state and actions
 */
export function useWizard(): UseWizardReturn {
  const { storeApi } = useWizardContext();
  const state = useWizardStore(storeApi);

  // Compute visible steps
  const visibleSteps = useMemo(
    () => state.getVisibleSteps(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.steps, state.data],
  );

  // Compute current step
  const currentStep = state.steps[state.currentStepIndex];
  const currentStepId = currentStep?.id;

  // Compute navigation state
  const isFirstStep = useMemo(() => {
    if (visibleSteps.length === 0) return true;
    const idx = visibleSteps.findIndex((s) => s.id === currentStepId);
    return idx <= 0;
  }, [visibleSteps, currentStepId]);

  const isLastStep = useMemo(() => {
    if (visibleSteps.length === 0) return true;
    const idx = visibleSteps.findIndex((s) => s.id === currentStepId);
    return idx >= visibleSteps.length - 1;
  }, [visibleSteps, currentStepId]);

  return {
    // State
    data: state.data,
    currentStep,
    currentStepId,
    currentStepIndex: state.currentStepIndex,
    visibleSteps,
    direction: state.direction,
    isLoading: state.isLoading,
    isComplete: state.isComplete,
    error: state.error,

    // Navigation
    nextStep: state.nextStep,
    prevStep: state.prevStep,
    goToStep: state.goToStep,
    isFirstStep,
    isLastStep,

    // Data
    setStepData: state.setStepData,
    updateStepData: state.updateStepData,
    getStepData: state.getStepData,

    // Step state
    getStepState: (stepId: string) => state.stepStates[stepId],
    setStepError: state.setStepError,
    validateStep: state.validateStep,

    // Lifecycle
    reset: state.reset,
    complete: state.complete,
  };
}

// =============================================================================
// useWizardStep - Single step control
// =============================================================================

/**
 * Hook for controlling a specific step
 * Useful for step content components
 */
export function useWizardStep<TData = unknown>(
  stepId: string,
): UseWizardStepReturn<TData> {
  const { storeApi } = useWizardContext();
  const state = useWizardStore(storeApi);

  const data = state.data[stepId] as TData | undefined;
  const stepState = state.stepStates[stepId] ?? {
    status: 'pending' as const,
    isValidating: false,
    visited: false,
    error: undefined,
  };

  const currentStep = state.steps[state.currentStepIndex];
  const isActive = currentStep?.id === stepId;

  return {
    data,
    setData: (newData: TData) => state.setStepData(stepId, newData),
    updateData: (updates: Partial<TData>) =>
      state.updateStepData(stepId, updates),
    status: stepState.status,
    isActive,
    isValidating: stepState.isValidating,
    visited: stepState.visited,
    error: stepState.error,
    validate: () => state.validateStep(stepId),
    setError: (error: string | null) => state.setStepError(stepId, error),
  };
}

// =============================================================================
// useWizardNavigation - Navigation control
// =============================================================================

/**
 * Hook for navigation controls
 * Useful for custom navigation components
 */
export function useWizardNavigation(): UseWizardNavigationReturn {
  const { storeApi, config } = useWizardContext();
  const state = useWizardStore(storeApi);

  // Compute visible steps
  const visibleSteps = useMemo(
    () => state.getVisibleSteps(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.steps, state.data],
  );

  const currentStep = state.steps[state.currentStepIndex];
  const currentStepId = currentStep?.id;

  // Find current index in visible steps
  const currentIndex = useMemo(() => {
    if (visibleSteps.length === 0) return 0;
    const idx = visibleSteps.findIndex((s) => s.id === currentStepId);
    return idx === -1 ? 0 : idx;
  }, [visibleSteps, currentStepId]);

  const isFirstStep = currentIndex <= 0;
  const isLastStep = currentIndex >= visibleSteps.length - 1;

  return {
    nextStep: state.nextStep,
    prevStep: state.prevStep,
    goToStep: state.goToStep,
    isFirstStep,
    isLastStep,
    currentIndex,
    totalSteps: visibleSteps.length,
    direction: state.direction,
    isComplete: state.isComplete,
    animation: config.animation,
  };
}

// =============================================================================
// useWizardProgress - Progress indicator data
// =============================================================================

/**
 * Hook for progress indicator components
 * Provides computed progress data
 */
export function useWizardProgress(): UseWizardProgressReturn {
  const { storeApi } = useWizardContext();
  const state = useWizardStore(storeApi);

  // Compute visible steps with their state
  const {
    steps: progressSteps,
    currentIndex,
    completedCount,
  } = useMemo(() => {
    const visibleSteps = state.getVisibleSteps();
    const currentStep = state.steps[state.currentStepIndex];
    const currentStepId = currentStep?.id;

    let foundIndex = 0;
    let completed = 0;

    const stepsWithState: ProgressStep[] = visibleSteps.map((step, index) => {
      const stepState = state.stepStates[step.id];
      const isActive = step.id === currentStepId;

      if (isActive) {
        foundIndex = index;
      }

      if (stepState?.status === 'completed') {
        completed++;
      }

      return {
        id: step.id,
        title: step.title,
        description: step.description,
        optional: step.optional,
        status: stepState?.status ?? 'pending',
        visited: stepState?.visited ?? false,
        isActive,
        index,
      };
    });

    return {
      steps: stepsWithState,
      currentIndex: foundIndex,
      completedCount: completed,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.steps, state.data, state.stepStates, state.currentStepIndex]);

  const totalSteps = progressSteps.length;
  const progress =
    totalSteps === 0 ? 0 : Math.round((completedCount / totalSteps) * 100);

  return {
    steps: progressSteps,
    currentIndex,
    totalSteps,
    completedCount,
    progress,
    goToStep: (stepId: string) =>
      state.goToStep(stepId, { skipValidation: true }),
  };
}
