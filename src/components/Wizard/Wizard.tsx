import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizard } from './hooks/useWizardStep';
import './Wizard.css'; // Import custom CSS if desired
import eventBus, { EVENT_STEP_VALIDATION_STATUS } from '@/utils/eventBus';

const Wizard: React.FC = () => {
  const {
    renderedSteps,
    currentStepIndex,
    nextStep,
    prevStep,
    error,
    validationStatus,
    theme,
  } = useWizard();

  const stepRef = useRef<HTMLDivElement>(null);
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  // Focus management: focus the current step when it changes.
  useEffect(() => {
    if (stepRef.current) {
      stepRef.current.focus();
    }
  }, [currentStepIndex]);

  // Keyboard navigation: use ArrowRight/ArrowLeft to navigate.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && isNextEnabled) {
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        prevStep();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStep, prevStep, isNextEnabled]);

  // Listen for validation status updates for the current step
  useEffect(() => {
    const currentStepId = renderedSteps[currentStepIndex]?.id;

    const handleValidationStatus = ({
      stepId,
      isValid,
    }: {
      stepId: string;
      isValid: boolean;
    }) => {
      if (stepId === currentStepId) {
        setIsNextEnabled(isValid); // Update the button's enabled state
        console.log(`Validation status for step ${stepId}:`, isValid);
      }
    };

    eventBus.on(EVENT_STEP_VALIDATION_STATUS, handleValidationStatus);

    // Initialize validation status for the current step
    setIsNextEnabled(validationStatus[currentStepId] || false);

    return () => {
      eventBus.off(EVENT_STEP_VALIDATION_STATUS, handleValidationStatus);
    };
  }, [currentStepIndex, renderedSteps, validationStatus]);

  return (
    <div
      className={theme?.container}
      role="region"
      aria-labelledby="wizard-title"
      aria-describedby={`wizard-step-${currentStepIndex}`}
    >
      <h1 id="wizard-title" className="sr-only">
        Wizard Navigation
      </h1>

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
              transition={{ duration: 0.3 }}
              className={`${theme?.step || 'default-step-class'} ${
                theme?.activeStep || ''
              }`}
            >
              {step.render ? step.render() : <h2>{step.title}</h2>}
            </motion.div>
          ) : null,
        )}
      </AnimatePresence>

      {error && (
        <div
          className={theme?.error || 'default-error-class'}
          role="alert"
          aria-live="assertive"
        >
          {error.userMessage}
          {error.devMessage && (
            <small className="text-gray-500">{error.devMessage}</small>
          )}
        </div>
      )}

      <div className={theme?.controls || 'default-controls-class'}>
        <button
          onClick={prevStep}
          disabled={currentStepIndex === 0}
          className={`${theme?.button || 'default-button-class'} ${
            currentStepIndex === 0 ? theme?.buttonDisabled || '' : ''
          }`}
          aria-label="Go to the previous step"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          disabled={!isNextEnabled} // Enable/disable based on validation status
          className={`${theme?.button || 'default-button-class'} ${
            !isNextEnabled ? theme?.buttonDisabled || '' : ''
          }`}
          aria-label="Go to the next step"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Wizard;
// src/components/Wizard/Wizard.tsx
