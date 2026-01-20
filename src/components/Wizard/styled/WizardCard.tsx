// src/components/Wizard/styled/WizardCard.tsx
'use client';

import { type ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Stack, Container } from '@/components/Box';
import { Heading, Text } from '@/components/Typography';
import { useWizardNavigation, useWizardContext } from '../core/WizardContext';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface WizardCardProps {
  /** Step title */
  title?: string;
  /** Step description */
  description?: string;
  /** Card content */
  children: ReactNode;
  /** Show step indicator (e.g., "Step 2 of 4") */
  showStepIndicator?: boolean;
  /** Container width constraint */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /** Enable animations */
  animate?: boolean;
  /** Container class name */
  className?: string;
  /** Header class name */
  headerClassName?: string;
  /** Content class name */
  contentClassName?: string;
}

// -----------------------------------------------------------------------------
// Animation Variants
// -----------------------------------------------------------------------------

const cardVariants = {
  initial: (direction: 'forward' | 'backward' | null) => ({
    x: direction === 'backward' ? -20 : 20,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: 'forward' | 'backward' | null) => ({
    x: direction === 'backward' ? 20 : -20,
    opacity: 0,
  }),
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function WizardCard({
  title,
  description,
  children,
  showStepIndicator = true,
  maxWidth = 'lg',
  animate = true,
  className,
  headerClassName,
  contentClassName,
}: WizardCardProps) {
  const { config } = useWizardContext();
  const { currentIndex, totalSteps, direction } = useWizardNavigation();
  const prefersReducedMotion = useReducedMotion();

  const shouldAnimate =
    animate && config.animation?.enabled !== false && !prefersReducedMotion;

  const content = (
    <Container size={maxWidth} padding="none">
      <Stack gap="6" className={cn('wizard-card', className)}>
        {/* Header */}
        {(title || showStepIndicator) && (
          <div className={cn('wizard-card-header', headerClassName)}>
            {showStepIndicator && (
              <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Step {currentIndex + 1} of {totalSteps}
              </Text>
            )}
            {title && (
              <Heading
                level={2}
                size="xl"
                className="text-gray-900 dark:text-gray-100"
              >
                {title}
              </Heading>
            )}
            {description && (
              <Text className="mt-2 text-gray-600 dark:text-gray-400">
                {description}
              </Text>
            )}
          </div>
        )}

        {/* Content */}
        <div className={cn('wizard-card-content', contentClassName)}>
          {children}
        </div>
      </Stack>
    </Container>
  );

  if (!shouldAnimate) {
    return content;
  }

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={currentIndex}
        custom={direction}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          type: 'spring',
          stiffness: config.animation?.stiffness ?? 300,
          damping: config.animation?.damping ?? 25,
        }}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
}

// -----------------------------------------------------------------------------
// Card Container (Bordered Card Style)
// -----------------------------------------------------------------------------

interface WizardCardContainerProps {
  /** Card content */
  children: ReactNode;
  /** Container class name */
  className?: string;
  /** Padding size */
  padding?: 'sm' | 'md' | 'lg';
}

export function WizardCardContainer({
  children,
  className,
  padding = 'lg',
}: WizardCardContainerProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800',
        paddingClasses[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Step Header (Just the title section)
// -----------------------------------------------------------------------------

interface WizardStepHeaderProps {
  /** Step title */
  title: string;
  /** Step description */
  description?: string;
  /** Show step indicator */
  showStepIndicator?: boolean;
  /** Container class name */
  className?: string;
}

export function WizardStepHeader({
  title,
  description,
  showStepIndicator = true,
  className,
}: WizardStepHeaderProps) {
  const { currentIndex, totalSteps } = useWizardNavigation();

  return (
    <div className={cn('wizard-step-header', className)}>
      {showStepIndicator && (
        <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Step {currentIndex + 1} of {totalSteps}
        </Text>
      )}
      <Heading level={2} size="xl" className="text-gray-900 dark:text-gray-100">
        {title}
      </Heading>
      {description && (
        <Text className="mt-2 text-gray-600 dark:text-gray-400 max-w-prose">
          {description}
        </Text>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Form Step Container (Common pattern for form-based steps)
// -----------------------------------------------------------------------------

interface WizardFormStepProps {
  /** Step title */
  title: string;
  /** Step description */
  description?: string;
  /** Form content */
  children: ReactNode;
  /** Container class name */
  className?: string;
}

export function WizardFormStep({
  title,
  description,
  children,
  className,
}: WizardFormStepProps) {
  return (
    <Stack gap="6" className={className}>
      <WizardStepHeader
        title={title}
        description={description}
        showStepIndicator={true}
      />
      <div className="wizard-form-content">{children}</div>
    </Stack>
  );
}
