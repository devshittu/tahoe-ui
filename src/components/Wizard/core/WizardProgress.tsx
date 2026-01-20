// src/components/Wizard/core/WizardProgress.tsx
'use client';

import { cn } from '@/lib/utils';
import { useWizardProgress } from './WizardContext';
import { WizardGoToTrigger } from './WizardTrigger';
import type { ProgressVariant, StepStatus } from './types';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface WizardProgressProps {
  /** Visual variant */
  variant?: ProgressVariant;
  /** Show step labels */
  showLabels?: boolean;
  /** Allow clicking steps to navigate */
  clickable?: boolean;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Container class name */
  className?: string;
  /** Step class name */
  stepClassName?: string;
  /** Active step class name */
  activeClassName?: string;
  /** Completed step class name */
  completedClassName?: string;
}

// -----------------------------------------------------------------------------
// Status Helpers
// -----------------------------------------------------------------------------

const getStatusClasses = (status: StepStatus, isActive: boolean) => {
  if (isActive) return 'wizard-progress-step--active';
  if (status === 'completed') return 'wizard-progress-step--completed';
  if (status === 'error') return 'wizard-progress-step--error';
  return 'wizard-progress-step--pending';
};

// -----------------------------------------------------------------------------
// Dots Variant
// -----------------------------------------------------------------------------

function DotsProgress({
  clickable,
  size = 'md',
  orientation,
  className,
  stepClassName,
  activeClassName,
  completedClassName,
}: Omit<WizardProgressProps, 'variant' | 'showLabels'>) {
  const { steps, currentIndex, goToStep } = useWizardProgress();

  const sizeClasses = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4',
  };

  return (
    <div
      role="tablist"
      aria-label="Wizard progress"
      className={cn(
        'wizard-progress wizard-progress--dots',
        'flex gap-2',
        orientation === 'vertical' ? 'flex-col' : 'flex-row items-center',
        className,
      )}
    >
      {steps.map((step, index) => {
        const isActive = index === currentIndex;
        const statusClass = getStatusClasses(step.status, isActive);

        const dot = (
          <span
            role="tab"
            aria-selected={isActive}
            aria-label={`Step ${index + 1}: ${step.title}`}
            data-status={step.status}
            className={cn(
              'wizard-progress-dot rounded-full transition-all',
              sizeClasses[size],
              statusClass,
              stepClassName,
              isActive && activeClassName,
              step.status === 'completed' && completedClassName,
            )}
          />
        );

        if (clickable && step.visited) {
          return (
            <WizardGoToTrigger
              key={step.id}
              stepId={step.id}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-full"
            >
              {dot}
            </WizardGoToTrigger>
          );
        }

        return <span key={step.id}>{dot}</span>;
      })}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Numbers Variant
// -----------------------------------------------------------------------------

function NumbersProgress({
  clickable,
  showLabels,
  size = 'md',
  orientation,
  className,
  stepClassName,
  activeClassName,
  completedClassName,
}: Omit<WizardProgressProps, 'variant'>) {
  const { steps, currentIndex } = useWizardProgress();

  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base',
  };

  return (
    <div
      role="tablist"
      aria-label="Wizard progress"
      className={cn(
        'wizard-progress wizard-progress--numbers',
        'flex',
        orientation === 'vertical'
          ? 'flex-col gap-4'
          : 'flex-row items-start gap-2',
        className,
      )}
    >
      {steps.map((step, index) => {
        const isActive = index === currentIndex;
        const statusClass = getStatusClasses(step.status, isActive);
        const showConnector = index < steps.length - 1;

        const numberElement = (
          <div className="flex flex-col items-center">
            <span
              role="tab"
              aria-selected={isActive}
              aria-label={`Step ${index + 1}: ${step.title}`}
              data-status={step.status}
              className={cn(
                'wizard-progress-number flex items-center justify-center rounded-full font-medium transition-all',
                sizeClasses[size],
                statusClass,
                stepClassName,
                isActive && activeClassName,
                step.status === 'completed' && completedClassName,
              )}
            >
              {step.status === 'completed' ? (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </span>
            {showLabels && (
              <span
                className={cn(
                  'mt-2 text-xs text-center max-w-[80px] truncate',
                  isActive
                    ? 'text-gray-900 dark:text-gray-100 font-medium'
                    : 'text-gray-500 dark:text-gray-400',
                )}
              >
                {step.title}
              </span>
            )}
          </div>
        );

        return (
          <div
            key={step.id}
            className={cn(
              'flex',
              orientation === 'vertical' ? 'flex-col' : 'flex-row items-center',
            )}
          >
            {clickable && step.visited ? (
              <WizardGoToTrigger
                stepId={step.id}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-full"
              >
                {numberElement}
              </WizardGoToTrigger>
            ) : (
              numberElement
            )}
            {showConnector && orientation !== 'vertical' && (
              <div
                className={cn(
                  'wizard-progress-connector mx-2 h-0.5 w-8 transition-colors',
                  step.status === 'completed'
                    ? 'bg-gray-900 dark:bg-gray-100'
                    : 'bg-gray-200 dark:bg-gray-700',
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Labels Variant
// -----------------------------------------------------------------------------

function LabelsProgress({
  clickable,
  size = 'md',
  orientation,
  className,
  stepClassName,
  activeClassName,
  completedClassName,
}: Omit<WizardProgressProps, 'variant' | 'showLabels'>) {
  const { steps, currentIndex } = useWizardProgress();

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  return (
    <div
      role="tablist"
      aria-label="Wizard progress"
      className={cn(
        'wizard-progress wizard-progress--labels',
        'flex flex-wrap gap-2',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        className,
      )}
    >
      {steps.map((step, index) => {
        const isActive = index === currentIndex;
        const statusClass = getStatusClasses(step.status, isActive);

        const label = (
          <span
            role="tab"
            aria-selected={isActive}
            aria-label={`Step ${index + 1}: ${step.title}`}
            data-status={step.status}
            className={cn(
              'wizard-progress-label rounded-full font-medium transition-all inline-flex items-center gap-1.5',
              sizeClasses[size],
              statusClass,
              stepClassName,
              isActive && activeClassName,
              step.status === 'completed' && completedClassName,
            )}
          >
            {step.status === 'completed' && (
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
            {step.title}
            {step.optional && (
              <span className="text-xs opacity-60">(optional)</span>
            )}
          </span>
        );

        if (clickable && step.visited) {
          return (
            <WizardGoToTrigger
              key={step.id}
              stepId={step.id}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-full"
            >
              {label}
            </WizardGoToTrigger>
          );
        }

        return <span key={step.id}>{label}</span>;
      })}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Bar Variant
// -----------------------------------------------------------------------------

function BarProgress({
  size = 'md',
  showLabels,
  className,
}: Pick<WizardProgressProps, 'size' | 'showLabels' | 'className'>) {
  const { progress, currentIndex, totalSteps, steps } = useWizardProgress();

  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const currentStep = steps[currentIndex];

  return (
    <div
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Wizard progress: ${progress}%`}
      className={cn('wizard-progress wizard-progress--bar w-full', className)}
    >
      {showLabels && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {currentStep?.title ?? `Step ${currentIndex + 1}`}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentIndex + 1} of {totalSteps}
          </span>
        </div>
      )}
      <div
        className={cn(
          'wizard-progress-bar-track w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden',
          heightClasses[size],
        )}
      >
        <div
          className={cn(
            'wizard-progress-bar-fill h-full rounded-full transition-all duration-300 ease-out',
            'bg-gray-900 dark:bg-gray-100',
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function WizardProgress({
  variant = 'dots',
  showLabels = false,
  clickable = true,
  orientation = 'horizontal',
  size = 'md',
  className,
  stepClassName,
  activeClassName,
  completedClassName,
}: WizardProgressProps) {
  const commonProps = {
    clickable,
    showLabels,
    size,
    orientation,
    className,
    stepClassName,
    activeClassName,
    completedClassName,
  };

  switch (variant) {
    case 'dots':
      return <DotsProgress {...commonProps} />;
    case 'numbers':
      return <NumbersProgress {...commonProps} />;
    case 'labels':
      return <LabelsProgress {...commonProps} />;
    case 'bar':
      return (
        <BarProgress
          size={size}
          showLabels={showLabels}
          className={className}
        />
      );
    default:
      return <DotsProgress {...commonProps} />;
  }
}
