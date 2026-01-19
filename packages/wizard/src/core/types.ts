// @tahoe-ui/wizard - Core Types

import type { ReactNode } from 'react';

// =============================================================================
// STEP DEFINITION TYPES
// =============================================================================

/**
 * Step status in the wizard flow
 */
export type StepStatus =
  | 'pending' // Not yet reached
  | 'active' // Currently active
  | 'completed' // Successfully completed
  | 'error' // Has validation errors
  | 'skipped'; // Skipped (optional step or condition became false)

/**
 * Step definition - passed to WizardRoot as static configuration
 * @template TData Type of data for this specific step
 */
export interface WizardStepDefinition<TData = unknown> {
  /** Unique step identifier */
  id: string;
  /** Display title for progress indicators */
  title: string;
  /** Optional description shown in progress indicators */
  description?: string;
  /** Whether this step can be skipped */
  optional?: boolean;
  /**
   * Condition for step visibility based on all step data.
   * When false, step is skipped silently but data is preserved.
   */
  condition?: (allData: WizardData) => boolean;
  /**
   * Validation function - can be sync or async.
   * Receives this step's data and all step data.
   * Return true if valid, false or throw error if invalid.
   */
  validate?: (
    stepData: TData,
    allData: WizardData,
  ) => boolean | string | Promise<boolean | string>;
  /** Called when entering this step */
  onEnter?: (prevStepId?: string) => void | Promise<void>;
  /** Called when leaving this step */
  onLeave?: (nextStepId?: string) => void | Promise<void>;
  /** Custom metadata for extensions */
  meta?: Record<string, unknown>;
}

/**
 * Runtime state for a single step
 */
export interface WizardStepState {
  /** Current status */
  status: StepStatus;
  /** Whether async validation is in progress */
  isValidating: boolean;
  /** Whether this step has been visited */
  visited: boolean;
  /** Validation error message if any */
  error?: string;
}

// =============================================================================
// WIZARD DATA TYPES
// =============================================================================

/**
 * All wizard data - nested by step ID
 * @example { account: { name: 'John' }, security: { password: '***' } }
 */
export type WizardData = Record<string, unknown>;

/**
 * Type helper for accessing step-specific data
 */
export type StepData<T> = T | undefined;

// =============================================================================
// CONFIGURATION TYPES
// =============================================================================

/**
 * Persistence configuration for saving wizard state
 */
export interface WizardPersistenceConfig {
  /** Storage mechanism */
  type: 'localStorage' | 'sessionStorage' | 'url';
  /** Storage key or URL parameter name */
  key: string;
  /** What to persist */
  include?: ('currentStep' | 'stepData' | 'completedSteps')[];
  /** Automatically restore state on mount */
  restoreOnMount?: boolean;
}

/**
 * Animation configuration
 */
export interface WizardAnimationConfig {
  /** Enable/disable animations (respects prefers-reduced-motion) */
  enabled?: boolean;
  /** Slide direction for step transitions */
  direction?: 'horizontal' | 'vertical';
  /** Spring stiffness (higher = snappier) */
  stiffness?: number;
  /** Spring damping (higher = less bouncy) */
  damping?: number;
  /** Fallback duration in ms for non-spring animations */
  duration?: number;
}

/**
 * Main wizard configuration
 */
export interface WizardConfig {
  /** Require validation to pass before advancing to next step */
  validateOnNext?: boolean;
  /** Validate on data change (with debounce) */
  validateOnChange?: boolean;
  /** Debounce time for validateOnChange in ms */
  validationDebounce?: number;
  /** Allow keyboard navigation (Arrow keys) */
  keyboardNavigation?: boolean;
  /** Persistence configuration */
  persistence?: WizardPersistenceConfig;
  /** Animation configuration */
  animation?: WizardAnimationConfig;
}

/**
 * Lifecycle hooks for wizard events
 */
export interface WizardLifecycleHooks {
  /** Called when wizard mounts */
  onMount?: () => void;
  /** Called when active step changes */
  onStepChange?: (newStepId: string, prevStepId?: string) => void;
  /** Called when validation fails */
  onValidationError?: (stepId: string, error: string) => void;
  /** Called when wizard completes (last step's next is clicked) */
  onComplete?: (allData: WizardData) => void;
  /** Called when wizard is reset */
  onReset?: () => void;
}

// =============================================================================
// STORE TYPES
// =============================================================================

/**
 * Wizard state (reactive)
 */
export interface WizardState {
  /** Step definitions (from props) */
  steps: WizardStepDefinition[];
  /** Current step index in the steps array */
  currentStepIndex: number;
  /** All step data, nested by step ID */
  data: WizardData;
  /** Per-step runtime state */
  stepStates: Record<string, WizardStepState>;
  /** Navigation direction for animations */
  direction: 'forward' | 'backward' | null;
  /** Global loading state (e.g., during async validation) */
  isLoading: boolean;
  /** Global error message */
  error: string | null;
  /** Whether wizard has completed */
  isComplete: boolean;
}

/**
 * Wizard actions
 */
export interface WizardActions {
  // Navigation
  /** Move to next visible step (validates current step first if configured) */
  nextStep: () => Promise<boolean>;
  /** Move to previous visible step */
  prevStep: () => void;
  /** Jump to specific step by ID */
  goToStep: (
    stepId: string,
    options?: { skipValidation?: boolean },
  ) => Promise<boolean>;

  // Data management
  /** Set data for a specific step */
  setStepData: <T>(stepId: string, data: T) => void;
  /** Update data for a specific step (merges with existing) */
  updateStepData: <T>(stepId: string, updates: Partial<T>) => void;
  /** Get data for a specific step */
  getStepData: <T>(stepId: string) => T | undefined;
  /** Get all wizard data */
  getAllData: () => WizardData;

  // Step state management
  /** Set error for a step */
  setStepError: (stepId: string, error: string | null) => void;
  /** Set status for a step */
  setStepStatus: (stepId: string, status: StepStatus) => void;
  /** Mark step as visited */
  markStepVisited: (stepId: string) => void;

  // Validation
  /** Validate a specific step */
  validateStep: (stepId: string) => Promise<boolean>;
  /** Register additional validation for a step (from WizardPanel) */
  registerPanelValidation: (
    stepId: string,
    validate: (data: unknown) => boolean | string | Promise<boolean | string>,
  ) => void;
  /** Unregister panel validation */
  unregisterPanelValidation: (stepId: string) => void;

  // Computed getters
  /** Get visible steps (respecting conditions) */
  getVisibleSteps: () => WizardStepDefinition[];
  /** Get current step definition */
  getCurrentStep: () => WizardStepDefinition | undefined;
  /** Get current step ID */
  getCurrentStepId: () => string | undefined;
  /** Check if on first visible step */
  isFirstStep: () => boolean;
  /** Check if on last visible step */
  isLastStep: () => boolean;

  // Lifecycle
  /** Reset wizard to initial state */
  reset: () => void;
  /** Mark wizard as complete */
  complete: () => void;
  /** Persist state to storage */
  persist: () => void;
  /** Restore state from storage */
  restore: () => boolean;
}

/**
 * Complete wizard store (state + actions)
 */
export type WizardStore = WizardState & WizardActions;

// =============================================================================
// CONTEXT TYPES
// =============================================================================

/**
 * Context value provided by WizardProvider
 */
export interface WizardContextValue {
  /** Zustand store API */
  storeApi: WizardStoreApi;
  /** Configuration */
  config: WizardConfig;
  /** Lifecycle hooks */
  hooks: WizardLifecycleHooks;
}

/**
 * Zustand store API type
 */
export type WizardStoreApi = {
  getState: () => WizardStore;
  getInitialState: () => WizardStore;
  setState: (
    partial:
      | Partial<WizardState>
      | ((state: WizardStore) => Partial<WizardState>),
  ) => void;
  subscribe: (
    listener: (state: WizardStore, prevState: WizardStore) => void,
  ) => () => void;
};

// =============================================================================
// COMPONENT PROP TYPES
// =============================================================================

/**
 * WizardRoot props - the main container
 */
export interface WizardRootProps {
  /** Step definitions - required, defines the wizard structure */
  steps: WizardStepDefinition[];
  /** Initial data to pre-populate steps */
  initialData?: WizardData;
  /** Initial step ID to start from */
  initialStepId?: string;
  /** Wizard configuration */
  config?: WizardConfig;
  /** Lifecycle hooks */
  hooks?: WizardLifecycleHooks;
  /** Children (WizardContent, WizardStepper, etc.) */
  children: ReactNode;
  /** Container class name */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

/**
 * Render prop data for WizardContent
 */
export interface WizardContentRenderProps {
  /** Current step definition */
  currentStep: WizardStepDefinition;
  /** Current step ID */
  currentStepId: string;
  /** Current step's data */
  data: unknown;
  /** Update current step's data */
  setData: (data: unknown) => void;
  /** All wizard data */
  allData: WizardData;
  /** Current step's state */
  stepState: WizardStepState;
  /** Navigation direction for animations */
  direction: 'forward' | 'backward' | null;
  /** Whether wizard is complete */
  isComplete: boolean;
}

/**
 * WizardContent props - wraps step content
 */
export interface WizardContentProps {
  /**
   * Either render prop or children (WizardPanel components)
   * Render prop: (props: WizardContentRenderProps) => ReactNode
   * Children: WizardPanel components
   */
  children: ReactNode | ((props: WizardContentRenderProps) => ReactNode);
  /** Container class name */
  className?: string;
  /** Override animation config */
  animation?: WizardAnimationConfig;
}

/**
 * WizardPanel props - for panel-based content pattern
 */
export interface WizardPanelProps<TData = unknown> {
  /** Step ID this panel belongs to */
  stepId: string;
  /**
   * Optional validation for this panel (in addition to step config validation)
   * Return true if valid, false or error string if invalid
   */
  validate?: (data: TData) => boolean | string | Promise<boolean | string>;
  /** Panel content */
  children: ReactNode | ((props: WizardPanelRenderProps<TData>) => ReactNode);
  /** Panel class name */
  className?: string;
}

/**
 * Render prop data for WizardPanel
 */
export interface WizardPanelRenderProps<TData = unknown> {
  /** This step's data */
  data: TData | undefined;
  /** Update this step's data */
  setData: (data: TData) => void;
  /** Update this step's data (merge) */
  updateData: (updates: Partial<TData>) => void;
  /** Whether this panel is currently active */
  isActive: boolean;
  /** Whether validation is in progress */
  isValidating: boolean;
  /** Validation error if any */
  error?: string;
  /** Step status */
  status: StepStatus;
  /** Manually trigger validation */
  validate: () => Promise<boolean>;
}

// =============================================================================
// PROGRESS INDICATOR TYPES
// =============================================================================

/**
 * Progress indicator visual variants
 */
export type ProgressVariant = 'dots' | 'numbers' | 'labels' | 'bar';

/**
 * Step info for progress indicators
 */
export interface ProgressStep {
  id: string;
  title: string;
  description?: string;
  optional?: boolean;
  status: StepStatus;
  visited: boolean;
  isActive: boolean;
  index: number;
}

/**
 * Render prop data for headless progress indicator
 */
export interface WizardProgressRenderProps {
  /** All visible steps with their state */
  steps: ProgressStep[];
  /** Current step index (in visible steps) */
  currentIndex: number;
  /** Total visible steps */
  totalSteps: number;
  /** Number of completed steps */
  completedCount: number;
  /** Progress percentage (0-100) */
  progress: number;
  /** Navigate to a step */
  goToStep: (stepId: string) => void;
}

/**
 * Headless WizardProgress props
 */
export interface WizardProgressProps {
  /** Render prop for custom progress UI */
  children: (props: WizardProgressRenderProps) => ReactNode;
}

/**
 * Styled WizardStepper props
 */
export interface WizardStepperProps {
  /** Visual variant */
  variant?: ProgressVariant;
  /** Show step labels */
  showLabels?: boolean;
  /** Show step descriptions */
  showDescriptions?: boolean;
  /** Allow clicking to navigate */
  clickable?: boolean;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Container class name */
  className?: string;
}

// =============================================================================
// NAVIGATION TYPES
// =============================================================================

/**
 * Render prop data for headless navigation
 */
export interface WizardNavigationRenderProps {
  /** Go to next step */
  nextStep: () => Promise<boolean>;
  /** Go to previous step */
  prevStep: () => void;
  /** Whether on first visible step */
  isFirstStep: boolean;
  /** Whether on last visible step */
  isLastStep: boolean;
  /** Whether next/validation is in progress */
  isLoading: boolean;
  /** Whether wizard is complete */
  isComplete: boolean;
  /** Current step */
  currentStep: WizardStepDefinition | undefined;
}

/**
 * Headless WizardNav props
 */
export interface WizardNavProps {
  /** Render prop for custom navigation UI */
  children: (props: WizardNavigationRenderProps) => ReactNode;
}

/**
 * Styled WizardNavigation props
 */
export interface WizardNavigationProps {
  /** Show back button on first step (disabled) */
  showBackOnFirst?: boolean;
  /** Back button label */
  backLabel?: string;
  /** Next button label */
  nextLabel?: string;
  /** Complete button label (on last step) */
  completeLabel?: string;
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Container class name */
  className?: string;
}

// =============================================================================
// TRIGGER COMPONENT TYPES
// =============================================================================

/**
 * Base trigger props
 */
export interface WizardTriggerBaseProps {
  /** Disable the trigger */
  disabled?: boolean;
  /** Custom click handler (called before navigation) */
  onClick?: () => void | Promise<void>;
  /** Children */
  children: ReactNode;
  /** Class name */
  className?: string;
  /** Pass-through props for the underlying element */
  asChild?: boolean;
}

/**
 * Next trigger props
 */
export interface WizardNextTriggerProps extends WizardTriggerBaseProps {
  /** Skip validation when clicking next */
  skipValidation?: boolean;
}

/**
 * Previous trigger props
 */
export interface WizardPrevTriggerProps extends WizardTriggerBaseProps {}

/**
 * Go-to trigger props
 */
export interface WizardGoToTriggerProps extends WizardTriggerBaseProps {
  /** Target step ID */
  stepId: string;
  /** Skip validation when jumping */
  skipValidation?: boolean;
}

/**
 * Reset trigger props
 */
export interface WizardResetTriggerProps extends WizardTriggerBaseProps {}

// =============================================================================
// HOOK RETURN TYPES
// =============================================================================

/**
 * useWizard hook return type - full wizard control
 */
export interface UseWizardReturn {
  // State
  /** All wizard data */
  data: WizardData;
  /** Current step definition */
  currentStep: WizardStepDefinition | undefined;
  /** Current step ID */
  currentStepId: string | undefined;
  /** Current step index */
  currentStepIndex: number;
  /** All visible steps */
  visibleSteps: WizardStepDefinition[];
  /** Navigation direction */
  direction: 'forward' | 'backward' | null;
  /** Whether wizard is loading (validation) */
  isLoading: boolean;
  /** Whether wizard is complete */
  isComplete: boolean;
  /** Global error */
  error: string | null;

  // Navigation
  /** Go to next step */
  nextStep: () => Promise<boolean>;
  /** Go to previous step */
  prevStep: () => void;
  /** Go to specific step */
  goToStep: (
    stepId: string,
    options?: { skipValidation?: boolean },
  ) => Promise<boolean>;
  /** Whether on first step */
  isFirstStep: boolean;
  /** Whether on last step */
  isLastStep: boolean;

  // Data
  /** Set data for a step */
  setStepData: <T>(stepId: string, data: T) => void;
  /** Update data for a step */
  updateStepData: <T>(stepId: string, updates: Partial<T>) => void;
  /** Get data for a step */
  getStepData: <T>(stepId: string) => T | undefined;

  // Step state
  /** Get state for a step */
  getStepState: (stepId: string) => WizardStepState | undefined;
  /** Set error for a step */
  setStepError: (stepId: string, error: string | null) => void;
  /** Validate a step */
  validateStep: (stepId: string) => Promise<boolean>;

  // Lifecycle
  /** Reset wizard */
  reset: () => void;
  /** Complete wizard */
  complete: () => void;
}

/**
 * useWizardStep hook return type - single step control
 */
export interface UseWizardStepReturn<TData = unknown> {
  /** Step data */
  data: TData | undefined;
  /** Update step data (replace) */
  setData: (data: TData) => void;
  /** Update step data (merge) */
  updateData: (updates: Partial<TData>) => void;
  /** Step status */
  status: StepStatus;
  /** Whether this step is active */
  isActive: boolean;
  /** Whether validation is in progress */
  isValidating: boolean;
  /** Whether step has been visited */
  visited: boolean;
  /** Validation error */
  error?: string;
  /** Manually trigger validation */
  validate: () => Promise<boolean>;
  /** Set error manually */
  setError: (error: string | null) => void;
}

/**
 * useWizardNavigation hook return type
 */
export interface UseWizardNavigationReturn {
  /** Go to next step */
  nextStep: () => Promise<boolean>;
  /** Go to previous step */
  prevStep: () => void;
  /** Go to specific step */
  goToStep: (
    stepId: string,
    options?: { skipValidation?: boolean },
  ) => Promise<boolean>;
  /** Whether on first visible step */
  isFirstStep: boolean;
  /** Whether on last visible step */
  isLastStep: boolean;
  /** Current index in visible steps */
  currentIndex: number;
  /** Total visible steps */
  totalSteps: number;
  /** Navigation direction */
  direction: 'forward' | 'backward' | null;
  /** Whether wizard is complete */
  isComplete: boolean;
  /** Animation config */
  animation: WizardAnimationConfig | undefined;
}

/**
 * useWizardProgress hook return type
 */
export interface UseWizardProgressReturn {
  /** All visible steps with state */
  steps: ProgressStep[];
  /** Current step index */
  currentIndex: number;
  /** Total visible steps */
  totalSteps: number;
  /** Completed count */
  completedCount: number;
  /** Progress percentage (0-100) */
  progress: number;
  /** Navigate to step */
  goToStep: (stepId: string) => void;
}
