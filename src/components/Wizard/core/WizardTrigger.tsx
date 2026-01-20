// src/components/Wizard/core/WizardTrigger.tsx
'use client';

import { useCallback, type ReactNode, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { useWizard } from './WizardContext';

// =============================================================================
// NEXT TRIGGER
// =============================================================================

interface WizardNextTriggerProps {
  /** Skip validation when clicking next */
  skipValidation?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Custom click handler (called before navigation) */
  onClick?: () => void | Promise<void>;
  /** Children */
  children: ReactNode;
  /** Class name */
  className?: string;
}

/**
 * WizardNextTrigger - Headless trigger for navigating to next step
 *
 * Renders a wrapper that handles click events for navigation.
 * Wrap your button component with this to add next functionality.
 *
 * @example
 * ```tsx
 * <WizardNextTrigger>
 *   <button className="btn">Next Step</button>
 * </WizardNextTrigger>
 * ```
 */
export function WizardNextTrigger({
  skipValidation = false,
  disabled,
  onClick,
  children,
  className,
}: WizardNextTriggerProps) {
  const { nextStep, isLastStep, isLoading, isComplete } = useWizard();

  const handleClick = useCallback(
    async (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled || isLoading) return;

      if (onClick) {
        await onClick();
      }

      // TODO: Add skipValidation support to nextStep when needed
      await nextStep();
    },
    [disabled, isLoading, onClick, nextStep],
  );

  const isDisabled = disabled || isLoading || isComplete;

  return (
    <span
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e as unknown as MouseEvent);
        }
      }}
      className={cn(
        'wizard-next-trigger inline-flex',
        !isDisabled && 'cursor-pointer',
        isDisabled && 'pointer-events-none',
        className,
      )}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
      data-loading={isLoading}
      data-last-step={isLastStep}
    >
      {children}
    </span>
  );
}

// =============================================================================
// PREV TRIGGER
// =============================================================================

interface WizardPrevTriggerProps {
  /** Disabled state */
  disabled?: boolean;
  /** Custom click handler (called before navigation) */
  onClick?: () => void | Promise<void>;
  /** Children */
  children: ReactNode;
  /** Class name */
  className?: string;
}

/**
 * WizardPrevTrigger - Headless trigger for navigating to previous step
 *
 * @example
 * ```tsx
 * <WizardPrevTrigger>
 *   <button className="btn">Back</button>
 * </WizardPrevTrigger>
 * ```
 */
export function WizardPrevTrigger({
  disabled,
  onClick,
  children,
  className,
}: WizardPrevTriggerProps) {
  const { prevStep, isFirstStep, isLoading } = useWizard();

  const handleClick = useCallback(
    async (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled || isFirstStep || isLoading) return;

      if (onClick) {
        await onClick();
      }

      prevStep();
    },
    [disabled, isFirstStep, isLoading, onClick, prevStep],
  );

  const isDisabled = disabled || isFirstStep || isLoading;

  return (
    <span
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e as unknown as MouseEvent);
        }
      }}
      className={cn(
        'wizard-prev-trigger inline-flex',
        !isDisabled && 'cursor-pointer',
        isDisabled && 'pointer-events-none',
        className,
      )}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
      data-first-step={isFirstStep}
    >
      {children}
    </span>
  );
}

// =============================================================================
// GOTO TRIGGER
// =============================================================================

interface WizardGoToTriggerProps {
  /** Target step ID */
  stepId: string;
  /** Skip validation when jumping */
  skipValidation?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Custom click handler (called before navigation) */
  onClick?: () => void | Promise<void>;
  /** Children */
  children: ReactNode;
  /** Class name */
  className?: string;
}

/**
 * WizardGoToTrigger - Headless trigger for jumping to a specific step
 *
 * @example
 * ```tsx
 * <WizardGoToTrigger stepId="security">
 *   <button>Go to Security</button>
 * </WizardGoToTrigger>
 * ```
 */
export function WizardGoToTrigger({
  stepId,
  skipValidation = true,
  disabled,
  onClick,
  children,
  className,
}: WizardGoToTriggerProps) {
  const { goToStep, isLoading, currentStepId, getStepState } = useWizard();

  const stepState = getStepState(stepId);
  const isActive = currentStepId === stepId;
  const isVisited = stepState?.visited ?? false;

  const handleClick = useCallback(
    async (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled || isLoading || isActive) return;

      if (onClick) {
        await onClick();
      }

      await goToStep(stepId, { skipValidation });
    },
    [disabled, isLoading, isActive, onClick, goToStep, stepId, skipValidation],
  );

  const isDisabled = disabled || isLoading || isActive;

  return (
    <span
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e as unknown as MouseEvent);
        }
      }}
      className={cn(
        'wizard-goto-trigger inline-flex',
        !isDisabled && 'cursor-pointer',
        isActive && 'wizard-goto-trigger--active',
        className,
      )}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
      aria-current={isActive ? 'step' : undefined}
      data-step-id={stepId}
      data-visited={isVisited}
      data-active={isActive}
    >
      {children}
    </span>
  );
}

// =============================================================================
// RESET TRIGGER
// =============================================================================

interface WizardResetTriggerProps {
  /** Disabled state */
  disabled?: boolean;
  /** Custom click handler (called before reset) */
  onClick?: () => void | Promise<void>;
  /** Children */
  children: ReactNode;
  /** Class name */
  className?: string;
}

/**
 * WizardResetTrigger - Headless trigger for resetting the wizard
 *
 * @example
 * ```tsx
 * <WizardResetTrigger>
 *   <button>Start Over</button>
 * </WizardResetTrigger>
 * ```
 */
export function WizardResetTrigger({
  disabled,
  onClick,
  children,
  className,
}: WizardResetTriggerProps) {
  const { reset, isLoading } = useWizard();

  const handleClick = useCallback(
    async (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled || isLoading) return;

      if (onClick) {
        await onClick();
      }

      reset();
    },
    [disabled, isLoading, onClick, reset],
  );

  const isDisabled = disabled || isLoading;

  return (
    <span
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e as unknown as MouseEvent);
        }
      }}
      className={cn(
        'wizard-reset-trigger inline-flex',
        !isDisabled && 'cursor-pointer',
        isDisabled && 'pointer-events-none',
        className,
      )}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
    >
      {children}
    </span>
  );
}

// =============================================================================
// HEADLESS NAV (Render Prop)
// =============================================================================

interface WizardNavProps {
  children: (props: {
    nextStep: () => Promise<boolean>;
    prevStep: () => void;
    isFirstStep: boolean;
    isLastStep: boolean;
    isLoading: boolean;
    isComplete: boolean;
  }) => ReactNode;
}

/**
 * WizardNav - Headless navigation component with render prop
 *
 * Use this for maximum flexibility in building custom navigation UI.
 *
 * @example
 * ```tsx
 * <WizardNav>
 *   {({ nextStep, prevStep, isFirstStep, isLastStep }) => (
 *     <>
 *       <button onClick={prevStep} disabled={isFirstStep}>Back</button>
 *       <button onClick={nextStep}>{isLastStep ? 'Complete' : 'Next'}</button>
 *     </>
 *   )}
 * </WizardNav>
 * ```
 */
export function WizardNav({ children }: WizardNavProps) {
  const { nextStep, prevStep, isFirstStep, isLastStep, isLoading, isComplete } =
    useWizard();

  return (
    <>
      {children({
        nextStep,
        prevStep,
        isFirstStep,
        isLastStep,
        isLoading,
        isComplete,
      })}
    </>
  );
}
