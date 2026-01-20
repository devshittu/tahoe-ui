// src/components/Wizard/styled/WizardStepper.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Text } from '@/components/Typography';
import { useWizardProgress } from '../core/WizardContext';
import { WizardGoToTrigger } from '../core/WizardTrigger';
import type { ProgressVariant, StepStatus } from '../core/types';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface WizardStepperProps {
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

// -----------------------------------------------------------------------------
// Status Styles (Apple-inspired, neutral palette)
// -----------------------------------------------------------------------------

const getStepStyles = (status: StepStatus, isActive: boolean) => {
  if (isActive) {
    return {
      indicator:
        'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 ring-2 ring-offset-2 ring-gray-900 dark:ring-gray-100',
      label: 'text-gray-900 dark:text-gray-100 font-medium',
      connector: 'bg-gray-300 dark:bg-gray-600',
    };
  }

  if (status === 'completed') {
    return {
      indicator: 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900',
      label: 'text-gray-700 dark:text-gray-300',
      connector: 'bg-gray-900 dark:bg-gray-100',
    };
  }

  if (status === 'error') {
    return {
      indicator:
        'bg-red-500 dark:bg-red-400 text-white ring-2 ring-offset-2 ring-red-500 dark:ring-red-400',
      label: 'text-red-600 dark:text-red-400',
      connector: 'bg-gray-200 dark:bg-gray-700',
    };
  }

  return {
    indicator: 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400',
    label: 'text-gray-500 dark:text-gray-400',
    connector: 'bg-gray-200 dark:bg-gray-700',
  };
};

// -----------------------------------------------------------------------------
// Size Configuration (8pt grid aligned)
// -----------------------------------------------------------------------------

const sizeConfig = {
  sm: {
    indicator: 'h-7 w-7 text-xs',
    indicatorPx: 28,
    connector: 'h-0.5 w-8',
    verticalConnector: 'w-0.5 h-6',
    gap: 'gap-1',
    labelSize: 'text-xs' as const,
  },
  md: {
    indicator: 'h-9 w-9 text-sm',
    indicatorPx: 36,
    connector: 'h-0.5 w-12',
    verticalConnector: 'w-0.5 h-8',
    gap: 'gap-2',
    labelSize: 'text-sm' as const,
  },
  lg: {
    indicator: 'h-11 w-11 text-base',
    indicatorPx: 44,
    connector: 'h-1 w-16',
    verticalConnector: 'w-1 h-10',
    gap: 'gap-3',
    labelSize: 'text-base' as const,
  },
};

// -----------------------------------------------------------------------------
// Check Icon
// -----------------------------------------------------------------------------

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <motion.path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </svg>
  );
}

// -----------------------------------------------------------------------------
// Dots Variant
// -----------------------------------------------------------------------------

function DotsStepper({
  clickable,
  size = 'md',
  orientation,
  className,
}: Omit<WizardStepperProps, 'variant' | 'showLabels' | 'showDescriptions'>) {
  const { steps, currentIndex } = useWizardProgress();
  const sizes = sizeConfig[size];

  // Larger, more visible dots (following touch target guidelines)
  const dotSize = {
    sm: 'h-2.5 w-2.5',
    md: 'h-3 w-3',
    lg: 'h-4 w-4',
  };

  // Active dot is larger
  const activeDotSize = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <div
      role="tablist"
      aria-label="Wizard progress"
      className={cn(
        'flex items-center',
        sizes.gap,
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        className,
      )}
    >
      {steps.map((step, index) => {
        const isActive = index === currentIndex;
        const isCompleted = step.status === 'completed';

        const dot = (
          <motion.span
            role="tab"
            aria-selected={isActive}
            aria-label={`Step ${index + 1}: ${step.title}`}
            className={cn(
              'rounded-full transition-colors',
              isActive ? activeDotSize[size] : dotSize[size],
              isActive
                ? 'bg-gray-900 dark:bg-white ring-2 ring-offset-2 ring-gray-900 dark:ring-white'
                : isCompleted
                  ? 'bg-gray-700 dark:bg-gray-300'
                  : 'bg-gray-400 dark:bg-gray-500',
            )}
            initial={false}
            animate={{
              scale: isActive ? 1 : 0.9,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
          />
        );

        if (clickable && step.visited) {
          return (
            <WizardGoToTrigger
              key={step.id}
              stepId={step.id}
              className="p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500"
            >
              {dot}
            </WizardGoToTrigger>
          );
        }

        return (
          <span key={step.id} className="p-1">
            {dot}
          </span>
        );
      })}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Numbers Variant
// -----------------------------------------------------------------------------

function NumbersStepper({
  clickable,
  showLabels,
  showDescriptions,
  size = 'md',
  orientation,
  className,
}: Omit<WizardStepperProps, 'variant'>) {
  const { steps, currentIndex } = useWizardProgress();
  const sizes = sizeConfig[size];
  const isVertical = orientation === 'vertical';

  return (
    <div
      role="tablist"
      aria-label="Wizard progress"
      className={cn(
        'flex',
        isVertical ? 'flex-col' : 'flex-row items-start',
        className,
      )}
    >
      {steps.map((step, index) => {
        const isActive = index === currentIndex;
        const isLast = index === steps.length - 1;
        const styles = getStepStyles(step.status, isActive);

        const indicator = (
          <motion.span
            className={cn(
              'flex items-center justify-center rounded-full font-medium transition-colors flex-shrink-0',
              sizes.indicator,
              styles.indicator,
            )}
            initial={false}
            animate={{
              scale: isActive ? 1.05 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
          >
            {step.status === 'completed' ? (
              <CheckIcon className="h-4 w-4" />
            ) : (
              index + 1
            )}
          </motion.span>
        );

        const wrappedIndicator =
          clickable && step.visited ? (
            <WizardGoToTrigger
              stepId={step.id}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500 rounded-full flex-shrink-0"
            >
              {indicator}
            </WizardGoToTrigger>
          ) : (
            indicator
          );

        // Horizontal layout: indicator row with connectors, then labels below
        if (!isVertical) {
          return (
            <div key={step.id} className="flex flex-col items-center">
              {/* Indicator row with connector */}
              <div className="flex items-center">
                {wrappedIndicator}
                {!isLast && (
                  <div
                    className={cn(
                      'transition-colors flex-shrink-0',
                      sizes.connector,
                      step.status === 'completed'
                        ? 'bg-gray-900 dark:bg-gray-100'
                        : 'bg-gray-300 dark:bg-gray-600',
                    )}
                  />
                )}
              </div>
              {/* Labels below */}
              {(showLabels || showDescriptions) && (
                <div className="mt-2 text-center">
                  {showLabels && (
                    <Text
                      fontWeight={isActive ? 'medium' : 'regular'}
                      className={cn(
                        'transition-colors',
                        sizes.labelSize,
                        styles.label,
                      )}
                    >
                      {step.title}
                    </Text>
                  )}
                  {showDescriptions && step.description && (
                    <Text
                      className={cn(
                        'mt-0.5 text-gray-500 dark:text-gray-400',
                        size === 'sm' ? 'text-xs' : 'text-sm',
                      )}
                    >
                      {step.description}
                    </Text>
                  )}
                </div>
              )}
            </div>
          );
        }

        // Vertical layout
        const connectorOffset = sizes.indicatorPx / 2 - 1; // Center the connector under indicator

        return (
          <div key={step.id} className="flex flex-col">
            <div className="flex flex-row items-center gap-4">
              {wrappedIndicator}
              {(showLabels || showDescriptions) && (
                <div className="flex-1 min-w-0">
                  {showLabels && (
                    <Text
                      fontWeight={isActive ? 'medium' : 'regular'}
                      className={cn(
                        'transition-colors',
                        sizes.labelSize,
                        styles.label,
                      )}
                    >
                      {step.title}
                    </Text>
                  )}
                  {showDescriptions && step.description && (
                    <Text
                      className={cn(
                        'mt-0.5 text-gray-500 dark:text-gray-400',
                        size === 'sm' ? 'text-xs' : 'text-sm',
                      )}
                    >
                      {step.description}
                    </Text>
                  )}
                </div>
              )}
            </div>
            {!isLast && (
              <div
                className={cn(
                  'transition-colors flex-shrink-0 my-1',
                  sizes.verticalConnector,
                  step.status === 'completed'
                    ? 'bg-gray-900 dark:bg-gray-100'
                    : 'bg-gray-300 dark:bg-gray-600',
                )}
                style={{ marginLeft: `${connectorOffset}px` }}
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

function LabelsStepper({
  clickable,
  size = 'md',
  orientation,
  className,
}: Omit<WizardStepperProps, 'variant' | 'showLabels' | 'showDescriptions'>) {
  const { steps, currentIndex } = useWizardProgress();
  const sizes = sizeConfig[size];

  const labelPadding = {
    sm: 'px-2.5 py-1',
    md: 'px-3.5 py-1.5',
    lg: 'px-4 py-2',
  };

  return (
    <div
      role="tablist"
      aria-label="Wizard progress"
      className={cn(
        'flex flex-wrap',
        sizes.gap,
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        className,
      )}
    >
      {steps.map((step, index) => {
        const isActive = index === currentIndex;

        const label = (
          <motion.span
            role="tab"
            aria-selected={isActive}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full font-medium transition-colors',
              labelPadding[size],
              sizes.labelSize,
              isActive
                ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                : step.status === 'completed'
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400',
            )}
            initial={false}
            animate={{
              scale: isActive ? 1.02 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
          >
            {step.status === 'completed' && <CheckIcon className="h-3 w-3" />}
            {step.title}
            {step.optional && (
              <span className="opacity-60 text-xs">(optional)</span>
            )}
          </motion.span>
        );

        if (clickable && step.visited) {
          return (
            <WizardGoToTrigger
              key={step.id}
              stepId={step.id}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500 rounded-full"
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

function BarStepper({
  showLabels,
  size = 'md',
  className,
}: Pick<WizardStepperProps, 'showLabels' | 'size' | 'className'>) {
  const { progress, currentIndex, totalSteps, steps } = useWizardProgress();
  const currentStep = steps[currentIndex];

  const heightClasses = {
    sm: 'h-1',
    md: 'h-1.5',
    lg: 'h-2',
  };

  return (
    <div
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Wizard progress: ${progress}%`}
      className={cn('wizard-stepper-bar w-full', className)}
    >
      {showLabels && (
        <div className="flex justify-between items-center mb-2">
          <Text fontWeight="medium" color="primary">
            {currentStep?.title ?? `Step ${currentIndex + 1}`}
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 text-sm">
            {currentIndex + 1} of {totalSteps}
          </Text>
        </div>
      )}
      <div
        className={cn(
          'w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden',
          heightClasses[size],
        )}
      >
        <motion.div
          className="h-full rounded-full bg-gray-900 dark:bg-gray-100"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Export
// -----------------------------------------------------------------------------

export function WizardStepper({
  variant = 'numbers',
  showLabels = true,
  showDescriptions = false,
  clickable = true,
  orientation = 'horizontal',
  size = 'md',
  className,
}: WizardStepperProps) {
  switch (variant) {
    case 'dots':
      return (
        <DotsStepper
          clickable={clickable}
          size={size}
          orientation={orientation}
          className={className}
        />
      );
    case 'numbers':
      return (
        <NumbersStepper
          clickable={clickable}
          showLabels={showLabels}
          showDescriptions={showDescriptions}
          size={size}
          orientation={orientation}
          className={className}
        />
      );
    case 'labels':
      return (
        <LabelsStepper
          clickable={clickable}
          size={size}
          orientation={orientation}
          className={className}
        />
      );
    case 'bar':
      return (
        <BarStepper showLabels={showLabels} size={size} className={className} />
      );
    default:
      return (
        <NumbersStepper
          clickable={clickable}
          showLabels={showLabels}
          size={size}
          orientation={orientation}
          className={className}
        />
      );
  }
}
