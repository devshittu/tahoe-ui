/**
 * @tahoe-ui/wizard
 *
 * Headless compound component wizard with static step definitions.
 *
 * Features:
 * - Headless compound components (WizardRoot, WizardContent, WizardPanel)
 * - Static step definitions (no render callbacks needed)
 * - Zustand-powered state management
 * - Framer Motion spring animations
 * - Conditional step visibility based on form data
 * - Panel-level and step-level validation (sync/async)
 * - State persistence (localStorage, sessionStorage, URL)
 * - Full keyboard navigation (arrow keys)
 * - Accessible (ARIA compliant, focus management)
 * - Respects prefers-reduced-motion
 *
 * @example Basic Usage
 * ```tsx
 * import {
 *   WizardRoot,
 *   WizardContent,
 *   WizardPanel,
 *   WizardProgress,
 *   WizardNextTrigger,
 *   WizardPrevTrigger,
 * } from '@tahoe-ui/wizard';
 *
 * const steps = [
 *   { id: 'account', title: 'Account' },
 *   { id: 'security', title: 'Security' },
 *   { id: 'confirm', title: 'Confirm' },
 * ];
 *
 * function MyWizard() {
 *   return (
 *     <WizardRoot steps={steps}>
 *       <WizardProgress variant="numbers" />
 *       <WizardContent>
 *         <WizardPanel stepId="account">
 *           <AccountForm />
 *         </WizardPanel>
 *         <WizardPanel stepId="security">
 *           <SecurityForm />
 *         </WizardPanel>
 *         <WizardPanel stepId="confirm">
 *           <ConfirmationStep />
 *         </WizardPanel>
 *       </WizardContent>
 *       <div className="flex gap-2">
 *         <WizardPrevTrigger>
 *           <button>Back</button>
 *         </WizardPrevTrigger>
 *         <WizardNextTrigger>
 *           <button>Next</button>
 *         </WizardNextTrigger>
 *       </div>
 *     </WizardRoot>
 *   );
 * }
 * ```
 *
 * @example With Validation
 * ```tsx
 * const steps = [
 *   {
 *     id: 'account',
 *     title: 'Account',
 *     validate: async (data) => {
 *       if (!data?.email) return 'Email is required';
 *       return true;
 *     },
 *   },
 * ];
 * ```
 *
 * @example With Conditional Steps
 * ```tsx
 * const steps = [
 *   { id: 'type', title: 'Account Type' },
 *   {
 *     id: 'business',
 *     title: 'Business Info',
 *     isVisible: (data) => data.type?.accountType === 'business',
 *   },
 *   { id: 'confirm', title: 'Confirm' },
 * ];
 * ```
 */

// Core exports
export * from './core';

// Utilities
export { cn } from './utils';
