'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useWizard } from './hooks/useWizard';
import eventBus, { EVENT_STEP_VALIDATION_STATUS } from './eventBus';

/**
 * Props for the Wizard component
 */
interface WizardProps {
  /** Show progress indicator */
  showProgress?: boolean;
  /** Enable keyboard navigation (arrow keys) */
  keyboardNavigation?: boolean;
  /** Custom class name for the container */
  className?: string;
  /** Labels for navigation buttons */
  labels?: {
    previous?: string;
    next?: string;
    finish?: string;
  };
}

/**
 * Main Wizard component that renders steps with animations
 *
 * @example
 * ```tsx
 * <WizardProvider steps={steps}>
 *   <Wizard showProgress keyboardNavigation />
 * </WizardProvider>
 * ```
 */
export function Wizard({
  showProgress = true,
  keyboardNavigation = true,
  className,
  labels = {
    previous: 'Previous',
    next: 'Next',
    finish: 'Finish',
  },
}: WizardProps) {
  const {
    renderedSteps,
    visibleSteps,
    currentStepIndex,
    nextStep,
    prevStep,
    error,
    validationStatus,
    theme,
  } = useWizard();

  const stepRef = useRef<HTMLDivElement>(null);
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const currentStep = visibleSteps[currentStepIndex];
  const isLastStep = currentStepIndex === visibleSteps.length - 1;

  // Focus management: focus the current step when it changes
  useEffect(() => {
    if (stepRef.current) {
      stepRef.current.focus();
    }
  }, [currentStepIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!keyboardNavigation) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && isNextEnabled) {
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        prevStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStep, prevStep, isNextEnabled, keyboardNavigation]);

  // Listen for validation status updates
  useEffect(() => {
    const currentStepId = currentStep?.id;
    if (!currentStepId) return;

    const handleValidationStatus = ({
      stepId,
      isValid,
    }: {
      stepId: string;
      isValid: boolean;
    }) => {
      if (stepId === currentStepId) {
        setIsNextEnabled(isValid);
      }
    };

    eventBus.on(EVENT_STEP_VALIDATION_STATUS, handleValidationStatus);

    // Initialize validation status
    setIsNextEnabled(validationStatus[currentStepId] || false);

    return () => {
      eventBus.off(EVENT_STEP_VALIDATION_STATUS, handleValidationStatus);
    };
  }, [currentStepIndex, currentStep?.id, validationStatus]);

  return (
    <div
      className={twMerge(theme?.container, className)}
      role="region"
      aria-labelledby="wizard-title"
      aria-describedby={`wizard-step-${currentStepIndex}`}
    >
      <h1 id="wizard-title" className="sr-only">
        Wizard Navigation
      </h1>

      {/* Progress indicator */}
      {showProgress && (
        <div
          className={theme?.progress}
          role="navigation"
          aria-label="Wizard progress"
        >
          {visibleSteps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isActive = index === currentStepIndex;

            return (
              <div
                key={step.id}
                className={twMerge(
                  theme?.progressItem,
                  isActive && theme?.progressItemActive,
                  isCompleted && theme?.progressItemCompleted,
                )}
                aria-current={isActive ? 'step' : undefined}
              >
                {isCompleted ? <CheckIcon /> : index + 1}
              </div>
            );
          })}
        </div>
      )}

      {/* Step content */}
      <AnimatePresence mode="wait">
        {renderedSteps.map((step, index) =>
          index === currentStepIndex ? (
            <motion.div
              key={step.id}
              id={`wizard-step-${index}`}
              role="tabpanel"
              aria-hidden={index !== currentStepIndex}
              tabIndex={0}
              ref={stepRef}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={twMerge(theme?.step, theme?.activeStep)}
            >
              {/* Step title */}
              <h2 className={theme?.title}>{step.title}</h2>

              {/* Step description */}
              {step.meta?.description && (
                <p className={theme?.description}>{step.meta.description}</p>
              )}

              {/* Step content */}
              {step.render ? step.render() : <p>Step content goes here.</p>}
            </motion.div>
          ) : null,
        )}
      </AnimatePresence>

      {/* Error display */}
      {error && (
        <div className={theme?.error} role="alert" aria-live="assertive">
          {error.userMessage}
        </div>
      )}

      {/* Navigation controls */}
      <div className={theme?.controls}>
        <button
          onClick={prevStep}
          disabled={currentStepIndex === 0}
          className={twMerge(
            theme?.button,
            currentStepIndex === 0 && theme?.buttonDisabled,
          )}
          aria-label="Go to the previous step"
        >
          {labels.previous}
        </button>
        <button
          onClick={nextStep}
          disabled={!isNextEnabled}
          className={twMerge(
            theme?.button,
            !isNextEnabled && theme?.buttonDisabled,
          )}
          aria-label={
            isLastStep ? 'Complete the wizard' : 'Go to the next step'
          }
        >
          {isLastStep ? labels.finish : labels.next}
        </button>
      </div>
    </div>
  );
}

/**
 * Simple check icon for completed steps
 */
function CheckIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default Wizard;
