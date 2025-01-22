import React, { createContext, useContext } from 'react';
import { WizardState, WizardStep, StepDataMap } from '../types';
import { WizardTheme } from '../theme';

// Define the context type, including the optional theme.
export type WizardContextType<TSteps extends WizardStep[]> =
  WizardState<TSteps> & {
    theme?: WizardTheme; // Optional theme for styling
  };

// Create the context with the correct type.
export const WizardContext = createContext<WizardContextType<
  WizardStep<any>[]
> | null>(null);

// Hook to access the Wizard context, ensuring it includes the optional theme.
export const useWizard = <
  TSteps extends WizardStep<any>[] = WizardStep<any>[],
>() => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context as WizardContextType<TSteps>;
};

// Hook for interacting with a specific wizard step.
export const useWizardStep = <
  TSteps extends WizardStep<any>[],
  TStepId extends TSteps[number]['id'],
>(
  stepId: TStepId,
) => {
  const wizard = useWizard<TSteps>();
  // New: Access validation status for the specific step
  const isStepValid = wizard.validationStatus[stepId] ?? false;

  return {
    data: wizard.stepData[stepId], // Access step-specific data
    isStepValid, // Expose validation status for the current step
    setData: (data: StepDataMap<TSteps>[TStepId]) =>
      wizard.setStepData(stepId, data), // Update step-specific data
  };
};
// src/components/Wizard/hooks/useWizardStep.ts
