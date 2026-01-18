// src/app/playground/accordion/components/Accordion.tsx

'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useId,
  forwardRef,
  useMemo,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import {
  AccordionRootProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionContextValue,
  AccordionItemContextValue,
  ACCORDION_SIZE_CONFIG,
  ACCORDION_VARIANT_CONFIG,
} from './types';

/**
 * Accordion Context
 */
const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within AccordionRoot');
  }
  return context;
}

/**
 * AccordionItem Context
 */
const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null,
);

function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'AccordionTrigger/Content must be used within AccordionItem',
    );
  }
  return context;
}

/**
 * AccordionRoot - Container for accordion items
 *
 * Design Principles Applied:
 * - #6 Purposeful Motion: Smooth expand/collapse animations
 * - #7 Intuitive Interaction: Standard accordion behavior
 * - #12 Accessibility: Full keyboard navigation and ARIA
 * - #15 Progressive Disclosure: Show content on demand
 */
export const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(
  function AccordionRoot(
    {
      type = 'single',
      variant = 'default',
      size = 'md',
      value: controlledValue,
      defaultValue,
      onValueChange,
      collapsible = true,
      disabled = false,
      children,
      className,
    },
    ref,
  ) {
    // Normalize default value to array
    const normalizedDefault = useMemo(() => {
      if (!defaultValue) return [];
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }, [defaultValue]);

    // Internal state for uncontrolled mode
    const [internalValue, setInternalValue] =
      useState<string[]>(normalizedDefault);

    // Determine if controlled
    const isControlled = controlledValue !== undefined;

    // Current value (controlled or internal)
    const currentValue = useMemo(() => {
      if (isControlled) {
        return Array.isArray(controlledValue)
          ? controlledValue
          : controlledValue
            ? [controlledValue]
            : [];
      }
      return internalValue;
    }, [isControlled, controlledValue, internalValue]);

    // Handle item toggle
    const onItemToggle = useCallback(
      (itemValue: string) => {
        let newValue: string[];

        if (type === 'single') {
          // Single mode: toggle or select new
          if (currentValue.includes(itemValue)) {
            newValue = collapsible ? [] : [itemValue];
          } else {
            newValue = [itemValue];
          }
        } else {
          // Multiple mode: toggle in array
          if (currentValue.includes(itemValue)) {
            newValue = currentValue.filter((v) => v !== itemValue);
          } else {
            newValue = [...currentValue, itemValue];
          }
        }

        // Update internal state if uncontrolled
        if (!isControlled) {
          setInternalValue(newValue);
        }

        // Call onChange callback
        if (onValueChange) {
          onValueChange(type === 'single' ? (newValue[0] ?? '') : newValue);
        }
      },
      [type, currentValue, collapsible, isControlled, onValueChange],
    );

    const contextValue = useMemo<AccordionContextValue>(
      () => ({
        type,
        variant,
        size,
        value: currentValue,
        onItemToggle,
        collapsible,
        disabled,
      }),
      [type, variant, size, currentValue, onItemToggle, collapsible, disabled],
    );

    const variantConfig = ACCORDION_VARIANT_CONFIG[variant];

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(variantConfig.root, className)}
          data-accordion-type={type}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);

/**
 * AccordionItem - Individual accordion panel
 */
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  function AccordionItem(
    { value, disabled: itemDisabled, children, className },
    ref,
  ) {
    const {
      variant,
      value: openItems,
      disabled: rootDisabled,
    } = useAccordionContext();
    const uniqueId = useId();

    const isOpen = openItems.includes(value);
    const isDisabled = rootDisabled || itemDisabled;

    const variantConfig = ACCORDION_VARIANT_CONFIG[variant];

    const itemContextValue = useMemo<AccordionItemContextValue>(
      () => ({
        value,
        isOpen,
        isDisabled: isDisabled ?? false,
        triggerId: `accordion-trigger-${uniqueId}`,
        contentId: `accordion-content-${uniqueId}`,
      }),
      [value, isOpen, isDisabled, uniqueId],
    );

    return (
      <AccordionItemContext.Provider value={itemContextValue}>
        <div
          ref={ref}
          className={cn(variantConfig.item, className)}
          data-state={isOpen ? 'open' : 'closed'}
          data-disabled={isDisabled || undefined}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);

/**
 * AccordionTrigger - Clickable header to expand/collapse
 */
export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(function AccordionTrigger(
  { children, icon, hideIcon = false, className },
  ref,
) {
  const { variant, size, onItemToggle } = useAccordionContext();
  const { value, isOpen, isDisabled, triggerId, contentId } =
    useAccordionItemContext();

  const sizeConfig = ACCORDION_SIZE_CONFIG[size];
  const variantConfig = ACCORDION_VARIANT_CONFIG[variant];

  const handleClick = () => {
    if (!isDisabled) {
      onItemToggle(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      id={triggerId}
      aria-expanded={isOpen}
      aria-controls={contentId}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        // Base
        'flex w-full items-center justify-between text-left',
        'transition-colors duration-150',
        sizeConfig.trigger,
        sizeConfig.text,

        // Text color
        'text-gray-900 dark:text-white',
        'font-medium',

        // Variant styles
        variantConfig.trigger,

        // Disabled state
        isDisabled && 'opacity-50 cursor-not-allowed',

        // Focus
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500',

        className,
      )}
    >
      <span className="flex-1">{children}</span>

      {/* Icon */}
      {!hideIcon && (
        <motion.span
          className={cn(
            'flex-shrink-0 ml-2',
            sizeConfig.icon,
            'text-gray-500 dark:text-gray-400',
          )}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          {icon ?? <FiChevronDown className={sizeConfig.icon} />}
        </motion.span>
      )}
    </button>
  );
});

/**
 * AccordionContent - Expandable content panel
 */
export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(function AccordionContent({ children, className }, ref) {
  const { size, variant } = useAccordionContext();
  const { isOpen, triggerId, contentId } = useAccordionItemContext();

  const sizeConfig = ACCORDION_SIZE_CONFIG[size];
  const variantConfig = ACCORDION_VARIANT_CONFIG[variant];

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          ref={ref}
          id={contentId}
          role="region"
          aria-labelledby={triggerId}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.2, ease: 'easeInOut' },
          }}
          className="overflow-hidden"
        >
          <div
            className={cn(
              sizeConfig.content,
              'text-gray-600 dark:text-gray-400',
              sizeConfig.text === 'text-lg' ? 'text-base' : 'text-sm',
              variantConfig.content,
              className,
            )}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

AccordionRoot.displayName = 'AccordionRoot';
AccordionItem.displayName = 'AccordionItem';
AccordionTrigger.displayName = 'AccordionTrigger';
AccordionContent.displayName = 'AccordionContent';
