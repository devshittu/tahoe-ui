// src/components/Wizard/types.ts

import React from 'react';

// Define MetaType or import it if it's defined elsewhere
type MetaType = {
  // Define the structure of MetaType here
  description?: string;
  [key: string]: any;
};

export interface WizardConfig {
  lazyRendering?: boolean; // Whether to render steps lazily
  renderAdjacent?: boolean; // Whether to render adjacent steps
  requireStepValidation?: boolean;
}

/** Represents a single step in the wizard with generic data type support. */
export interface WizardStep<DataType = any> {
  id: string; // Unique identifier
  title: string; // Display title for the step
  optional?: boolean; // Whether the step is optional
  validate?: (data: DataType) => boolean | Promise<boolean>; // Step-level validation function
  condition?: (stepData: Record<string, any>) => boolean; // Optional visibility condition
  render?: () => React.ReactNode; // Custom render function for the step
  lazy?: boolean; // Allow lazy rendering configuration per step
  meta?: MetaType; // Optional metadata for the step
}

/** Lifecycle hooks to allow custom behaviors during wizard transitions. */
export interface WizardHooks {
  onStepEnter?: (currentStepId: string, prevStepId?: string) => void;
  onStepLeave?: (currentStepId: string, nextStepId?: string) => void;
  onWizardComplete?: (stepData: Record<string, any>) => void;
}

/** Maps each step’s id to its data type. */
export type StepDataMap<TSteps extends WizardStep[]> = {
  [K in TSteps[number]['id']]?: K extends WizardStep<infer DataType>
    ? DataType
    : any;
};

/** Overall wizard state (includes lifecycle hooks) */
export interface WizardState<TSteps extends WizardStep[]> extends WizardHooks {
  steps: TSteps;
  currentStepIndex: number;
  stepData: StepDataMap<TSteps>;
  error: { userMessage: string; devMessage?: string } | null;
  nextStep: () => Promise<void>;
  prevStep: () => void;
  setStepData: <TStepId extends TSteps[number]['id']>(
    stepId: TStepId,
    data: StepDataMap<TSteps>[TStepId],
  ) => void;
  setError: (
    error: { userMessage: string; devMessage?: string } | null,
  ) => void;

  validationStatus: { [key: string]: boolean }; // Add this line
  // For lazy rendering – returns a subset of the visible steps.
  readonly visibleSteps: WizardStep[];
  readonly renderedSteps: WizardStep[];

  config: WizardConfig; // Add config to the state type
}

// src/components/Wizard/types.ts
