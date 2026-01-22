// @tahoe-ui/wizard - Core Panel Component
'use client';

import { useEffect, type ReactNode } from 'react';
import { cn } from '../utils';
import { useWizardStep, useWizardContext } from './WizardContext';
import type { WizardPanelProps, WizardPanelRenderProps } from './types';

// =============================================================================
// WIZARD PANEL COMPONENT
// =============================================================================

/**
 * WizardPanel - Content panel for a specific step
 *
 * Used within WizardContent to define content for each step.
 * Supports both static children and render prop pattern.
 *
 * Can optionally provide validation that runs in addition to
 * validation defined in the step config.
 *
 * @example Static Children
 * ```tsx
 * <WizardPanel stepId="account">
 *   <AccountForm />
 * </WizardPanel>
 * ```
 *
 * @example Render Prop
 * ```tsx
 * <WizardPanel stepId="account">
 *   {({ data, setData, error }) => (
 *     <input
 *       value={data?.name ?? ''}
 *       onChange={(e) => setData({ ...data, name: e.target.value })}
 *     />
 *   )}
 * </WizardPanel>
 * ```
 *
 * @example With Validation
 * ```tsx
 * <WizardPanel
 *   stepId="account"
 *   validate={(data) => data?.email?.includes('@') || 'Invalid email'}
 * >
 *   <AccountForm />
 * </WizardPanel>
 * ```
 */
export function WizardPanel<TData = unknown>({
  stepId,
  validate,
  children,
  className,
}: WizardPanelProps<TData>) {
  const { storeApi } = useWizardContext();
  const {
    data,
    setData,
    updateData,
    isActive,
    isValidating,
    error,
    status,
    validate: triggerValidate,
  } = useWizardStep<TData>(stepId);

  // Register panel validation on mount
  useEffect(() => {
    if (validate) {
      storeApi
        .getState()
        .registerPanelValidation(
          stepId,
          validate as (
            data: unknown,
          ) => boolean | string | Promise<boolean | string>,
        );
    }

    return () => {
      storeApi.getState().unregisterPanelValidation(stepId);
    };
  }, [storeApi, stepId, validate]);

  // Build render props
  const renderProps: WizardPanelRenderProps<TData> = {
    data,
    setData,
    updateData,
    isActive,
    isValidating,
    error,
    status,
    validate: triggerValidate,
  };

  // Determine content
  const content =
    typeof children === 'function' ? children(renderProps) : children;

  return (
    <div
      role="tabpanel"
      id={`wizard-panel-${stepId}`}
      aria-labelledby={`wizard-step-${stepId}`}
      data-step-id={stepId}
      data-status={status}
      className={cn(
        'wizard-panel',
        isValidating && 'wizard-panel--validating',
        error && 'wizard-panel--error',
        className,
      )}
    >
      {content}
    </div>
  );
}
