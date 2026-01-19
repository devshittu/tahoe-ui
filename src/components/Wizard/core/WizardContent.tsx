// src/components/Wizard/core/WizardContent.tsx
'use client';

import { type ReactNode, Children, isValidElement } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useWizard, useWizardContext } from './WizardContext';
import type {
  WizardContentProps,
  WizardContentRenderProps,
  WizardAnimationConfig,
} from './types';

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

function createVariants(
  direction: 'horizontal' | 'vertical',
  navDirection: 'forward' | 'backward' | null,
) {
  const axis = direction === 'horizontal' ? 'x' : 'y';
  const offset = navDirection === 'backward' ? -50 : 50;

  return {
    initial: {
      [axis]: offset,
      opacity: 0,
    },
    animate: {
      [axis]: 0,
      opacity: 1,
    },
    exit: {
      [axis]: -offset,
      opacity: 0,
    },
  };
}

// =============================================================================
// WIZARD CONTENT COMPONENT
// =============================================================================

/**
 * WizardContent - Container for step content
 *
 * Supports two patterns:
 * 1. Render prop: `<WizardContent>{(props) => ...}</WizardContent>`
 * 2. Panel children: `<WizardContent><WizardPanel stepId="...">...</WizardPanel></WizardContent>`
 *
 * Handles animations between steps with direction-aware transitions.
 *
 * @example Render Prop Pattern
 * ```tsx
 * <WizardContent>
 *   {({ currentStep, data, setData }) => (
 *     currentStep.id === 'account' ? <AccountForm /> : <OtherForm />
 *   )}
 * </WizardContent>
 * ```
 *
 * @example Panel Pattern
 * ```tsx
 * <WizardContent>
 *   <WizardPanel stepId="account"><AccountForm /></WizardPanel>
 *   <WizardPanel stepId="security"><SecurityForm /></WizardPanel>
 * </WizardContent>
 * ```
 */
export function WizardContent({
  children,
  className,
  animation: animationOverride,
}: WizardContentProps) {
  const { config } = useWizardContext();
  const {
    currentStep,
    currentStepId,
    currentStepIndex,
    data,
    setStepData,
    getStepState,
    direction,
    isComplete,
  } = useWizard();

  const prefersReducedMotion = useReducedMotion();

  // Merge animation config
  const animConfig: WizardAnimationConfig = {
    enabled: true,
    direction: 'horizontal',
    stiffness: 300,
    damping: 25,
    duration: 300,
    ...config.animation,
    ...animationOverride,
  };

  // Disable animations if user prefers reduced motion or config disables
  const shouldAnimate = animConfig.enabled && !prefersReducedMotion;

  // Determine content to render
  let content: ReactNode = null;

  if (typeof children === 'function') {
    // Render prop pattern
    if (currentStep && currentStepId) {
      const stepState = getStepState(currentStepId) ?? {
        status: 'active' as const,
        isValidating: false,
        visited: true,
        error: undefined,
      };

      const renderProps: WizardContentRenderProps = {
        currentStep,
        currentStepId,
        data: data[currentStepId],
        setData: (newData) => setStepData(currentStepId, newData),
        allData: data,
        stepState,
        direction,
        isComplete,
      };

      content = children(renderProps);
    }
  } else {
    // Panel children pattern - filter to show only active panel
    content = Children.map(children, (child) => {
      if (!isValidElement(child)) return null;

      // Check if this is a WizardPanel for the current step
      const childProps = child.props as { stepId?: string };
      if (childProps.stepId === currentStepId) {
        return child;
      }

      return null;
    });
  }

  // Non-animated version
  if (!shouldAnimate) {
    return (
      <div
        className={cn('wizard-content', className)}
        role="region"
        aria-live="polite"
      >
        {content}
      </div>
    );
  }

  // Animated version
  const variants = createVariants(
    animConfig.direction ?? 'horizontal',
    direction,
  );

  return (
    <div
      className={cn('wizard-content relative', className)}
      role="region"
      aria-live="polite"
    >
      {/* Overflow wrapper with padding to prevent focus ring clipping */}
      <div className="overflow-hidden -mx-1 px-1 -my-1 py-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStepIndex}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{
              type: 'spring',
              stiffness: animConfig.stiffness,
              damping: animConfig.damping,
            }}
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
