import type { ReactNode } from 'react';

/**
 * Metadata type for wizard steps
 */
export interface StepMeta {
  description?: string;
  analytics?: {
    event?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Configuration options for the wizard
 */
export interface WizardConfig {
  /** Whether to render steps lazily (only current step) */
  lazyRendering?: boolean;
  /** Whether to render adjacent steps (prev/next) when lazy rendering */
  renderAdjacent?: boolean;
  /** Whether to require step validation before proceeding */
  requireStepValidation?: boolean;
}

/**
 * Represents a single step in the wizard with generic data type support
 */
export interface WizardStep<DataType = unknown> {
  /** Unique identifier for the step */
  id: string;
  /** Display title for the step */
  title: string;
  /** Whether the step is optional */
  optional?: boolean;
  /** Step-level validation function */
  validate?: (data: DataType) => boolean | Promise<boolean>;
  /** Optional visibility condition based on collected data */
  condition?: (stepData: Record<string, unknown>) => boolean;
  /** Custom render function for the step content */
  render?: () => ReactNode;
  /** Allow lazy rendering configuration per step */
  lazy?: boolean;
  /** Optional metadata for the step */
  meta?: StepMeta;
}

/**
 * Lifecycle hooks for custom behaviors during wizard transitions
 */
export interface WizardHooks {
  /** Called when entering a new step */
  onStepEnter?: (currentStepId: string, prevStepId?: string) => void;
  /** Called when leaving a step */
  onStepLeave?: (currentStepId: string, nextStepId?: string) => void;
  /** Called when the wizard is completed */
  onWizardComplete?: (stepData: Record<string, unknown>) => void;
}

/**
 * Maps each step's id to its data type
 */
export type StepDataMap<TSteps extends WizardStep[]> = {
  [K in TSteps[number]['id']]?: unknown;
};

/**
 * Error type for wizard errors
 */
export interface WizardError {
  userMessage: string;
  devMessage?: string;
}

/**
 * Overall wizard state interface
 */
export interface WizardState<TSteps extends WizardStep[]> extends WizardHooks {
  /** Array of wizard steps */
  steps: TSteps;
  /** Current step index */
  currentStepIndex: number;
  /** Data collected from all steps */
  stepData: StepDataMap<TSteps>;
  /** Current error state */
  error: WizardError | null;
  /** Navigate to the next step */
  nextStep: () => Promise<void>;
  /** Navigate to the previous step */
  prevStep: () => void;
  /** Update data for a specific step */
  setStepData: <TStepId extends TSteps[number]['id']>(
    stepId: TStepId,
    data: StepDataMap<TSteps>[TStepId]
  ) => void;
  /** Set an error */
  setError: (error: WizardError | null) => void;
  /** Validation status for each step */
  validationStatus: Record<string, boolean>;
  /** Computed: visible steps based on conditions */
  readonly visibleSteps: WizardStep[];
  /** Computed: steps to render based on lazy rendering config */
  readonly renderedSteps: WizardStep[];
  /** Wizard configuration */
  config: WizardConfig;
}

/**
 * Theme configuration for wizard styling
 */
export interface WizardTheme {
  /** CSS classes for the wizard container */
  container?: string;
  /** Classes for an individual step */
  step?: string;
  /** Additional classes for the active step */
  activeStep?: string;
  /** Container for navigation buttons */
  controls?: string;
  /** Base classes for navigation buttons */
  button?: string;
  /** Classes for disabled buttons */
  buttonDisabled?: string;
  /** Classes for the error message */
  error?: string;
  /** Classes for the step description */
  description?: string;
  /** Classes for the step title */
  title?: string;
  /** Classes for the progress indicator */
  progress?: string;
  /** Classes for progress indicator item */
  progressItem?: string;
  /** Classes for active progress item */
  progressItemActive?: string;
  /** Classes for completed progress item */
  progressItemCompleted?: string;
}

/**
 * Default theme with Tailwind classes
 */
export const defaultTheme: WizardTheme = {
  container: 'p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg',
  step: 'p-4 bg-white dark:bg-gray-700 rounded-md',
  activeStep: 'border-2 border-blue-500 dark:border-blue-300',
  controls: 'flex justify-between mt-4',
  button:
    'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  buttonDisabled: 'opacity-50 cursor-not-allowed',
  error: 'text-red-600 dark:text-red-400 mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg',
  description: 'text-sm text-gray-600 dark:text-gray-300 mt-2',
  title: 'text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2',
  progress: 'flex items-center justify-center gap-2 mb-6',
  progressItem:
    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300',
  progressItemActive: 'bg-blue-600 text-white',
  progressItemCompleted: 'bg-green-600 text-white',
};
