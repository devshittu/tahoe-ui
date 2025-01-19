// src/components/Wizard/Wizard.tsx

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizard } from './hooks/useWizardStep';
import './Wizard.css'; // Import custom CSS if desired

const Wizard: React.FC = () => {
  const { renderedSteps, currentStepIndex, nextStep, prevStep, error, theme } =
    useWizard();
  const stepRef = useRef<HTMLDivElement>(null);

  // Focus management: focus the current step when it changes.
  useEffect(() => {
    if (stepRef.current) {
      stepRef.current.focus();
    }
  }, [currentStepIndex]);

  // Keyboard navigation: use ArrowRight/ArrowLeft to navigate.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        prevStep();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStep, prevStep]);

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
          disabled={!!error}
          className={`${theme?.button || 'default-button-class'} ${
            !!error ? theme?.buttonDisabled || '' : ''
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
