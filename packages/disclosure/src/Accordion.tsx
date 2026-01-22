'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useId,
  forwardRef,
  useMemo,
  ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

/**
 * Accordion expansion type
 */
export type AccordionType = 'single' | 'multiple';

/**
 * Accordion visual variants
 */
export type AccordionVariant = 'default' | 'bordered' | 'separated';

/**
 * Accordion sizes
 */
export type AccordionSize = 'sm' | 'md' | 'lg';

/**
 * Props for AccordionRoot
 */
export interface AccordionRootProps {
  type?: AccordionType;
  variant?: AccordionVariant;
  size?: AccordionSize;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Props for AccordionItem
 */
export interface AccordionItemProps {
  value: string;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Props for AccordionTrigger
 */
export interface AccordionTriggerProps {
  children: ReactNode;
  icon?: ReactNode;
  hideIcon?: boolean;
  className?: string;
}

/**
 * Props for AccordionContent
 */
export interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

/**
 * Accordion context value
 */
interface AccordionContextValue {
  type: AccordionType;
  variant: AccordionVariant;
  size: AccordionSize;
  value: string[];
  onItemToggle: (itemValue: string) => void;
  collapsible: boolean;
  disabled: boolean;
}

/**
 * AccordionItem context value
 */
interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  isDisabled: boolean;
  triggerId: string;
  contentId: string;
}

/**
 * Size configuration
 */
const ACCORDION_SIZE_CONFIG: Record<
  AccordionSize,
  {
    trigger: string;
    content: string;
    icon: string;
    text: string;
  }
> = {
  sm: {
    trigger: 'px-3 py-2',
    content: 'px-3 pb-3',
    icon: 'w-4 h-4',
    text: 'text-sm',
  },
  md: {
    trigger: 'px-4 py-3',
    content: 'px-4 pb-4',
    icon: 'w-5 h-5',
    text: 'text-base',
  },
  lg: {
    trigger: 'px-5 py-4',
    content: 'px-5 pb-5',
    icon: 'w-5 h-5',
    text: 'text-lg',
  },
};

/**
 * Variant configuration (CSS variable-backed via @tahoe-ui/tailwind-preset)
 */
const ACCORDION_VARIANT_CONFIG: Record<
  AccordionVariant,
  {
    root: string;
    item: string;
    trigger: string;
    content: string;
  }
> = {
  default: {
    root: '',
    item: 'border-b border-border-default last:border-b-0',
    trigger: 'hover:bg-bg-secondary',
    content: '',
  },
  bordered: {
    root: 'border border-border-default rounded-lg overflow-hidden',
    item: 'border-b border-border-default last:border-b-0',
    trigger: 'hover:bg-bg-secondary',
    content: '',
  },
  separated: {
    root: 'space-y-2',
    item: 'border border-border-default rounded-lg overflow-hidden',
    trigger: 'hover:bg-bg-secondary',
    content: '',
  },
};

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
 * @example
 * ```tsx
 * <AccordionRoot type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>Content 1</AccordionContent>
 *   </AccordionItem>
 * </AccordionRoot>
 * ```
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
          if (currentValue.includes(itemValue)) {
            newValue = collapsible ? [] : [itemValue];
          } else {
            newValue = [itemValue];
          }
        } else {
          if (currentValue.includes(itemValue)) {
            newValue = currentValue.filter((v) => v !== itemValue);
          } else {
            newValue = [...currentValue, itemValue];
          }
        }

        if (!isControlled) {
          setInternalValue(newValue);
        }

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
          className={twMerge(variantConfig.root, className)}
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
          className={twMerge(variantConfig.item, className)}
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
      className={twMerge(
        // Base
        'flex w-full items-center justify-between text-left',
        'transition-colors duration-150',
        sizeConfig.trigger,
        sizeConfig.text,

        // Text color (CSS variable-backed via @tahoe-ui/tailwind-preset)
        'text-text-primary',
        'font-medium',

        // Variant styles
        variantConfig.trigger,

        // Disabled state
        isDisabled && 'opacity-50 cursor-not-allowed',

        // Focus (CSS variable-backed via @tahoe-ui/tailwind-preset)
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary-500',

        className,
      )}
    >
      <span className="flex-1">{children}</span>

      {/* Icon (CSS variable-backed via @tahoe-ui/tailwind-preset) */}
      {!hideIcon && (
        <motion.span
          className={twMerge(
            'flex-shrink-0 ml-2',
            sizeConfig.icon,
            'text-text-muted',
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
          {/* Content text color (CSS variable-backed via @tahoe-ui/tailwind-preset) */}
          <div
            className={twMerge(
              sizeConfig.content,
              'text-text-secondary',
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

export default AccordionRoot;
