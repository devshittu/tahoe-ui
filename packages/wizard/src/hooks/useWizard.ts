'use client';

import { createContext, useContext } from 'react';
import type { WizardState, WizardStep, StepDataMap, WizardTheme } from '../types';

/**
 * Context type that includes wizard state and optional theme
 */
export type WizardContextType<TSteps extends WizardStep[]> = WizardState<TSteps> & {
  theme?: WizardTheme;
};

/**
 * Wizard context - must be used within WizardProvider
 */
export const WizardContext = createContext<WizardContextType<WizardStep[]> | null>(
  null
);

/**
 * Hook to access the entire wizard state and theme
 *
 * @example
 * ```tsx
 * const { currentStepIndex, nextStep, prevStep, theme } = useWizard();
 * ```
 */
export const useWizard = <TSteps extends WizardStep[] = WizardStep[]>() => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context as WizardContextType<TSteps>;
};

/**
 * Hook for interacting with a specific wizard step
 *
 * @example
 * ```tsx
 * const { data, setData, isStepValid } = useWizardStep('personal-info');
 * ```
 */
export const useWizardStep = <
  TSteps extends WizardStep[],
  TStepId extends TSteps[number]['id']
>(
  stepId: TStepId
) => {
  const wizard = useWizard<TSteps>();
  const isStepValid = wizard.validationStatus[stepId] ?? false;

  return {
    /** Data for this specific step */
    data: wizard.stepData[stepId] as StepDataMap<TSteps>[TStepId],
    /** Whether the step is valid */
    isStepValid,
    /** Update data for this step */
    setData: (data: StepDataMap<TSteps>[TStepId]) =>
      wizard.setStepData(stepId, data),
  };
};

/**
 * Hook for wizard navigation utilities
 *
 * @example
 * ```tsx
 * const { canGoNext, canGoPrev, goToStep } = useWizardNavigation();
 * ```
 */
export const useWizardNavigation = () => {
  const wizard = useWizard();
  const { currentStepIndex, visibleSteps, validationStatus } = wizard;

  const currentStep = visibleSteps[currentStepIndex];
  const canGoNext =
    currentStepIndex < visibleSteps.length - 1 &&
    (validationStatus[currentStep?.id] ?? false);
  const canGoPrev = currentStepIndex > 0;
  const isLastStep = currentStepIndex === visibleSteps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  return {
    canGoNext,
    canGoPrev,
    isLastStep,
    isFirstStep,
    currentStep,
    totalSteps: visibleSteps.length,
    currentStepNumber: currentStepIndex + 1,
  };
};
