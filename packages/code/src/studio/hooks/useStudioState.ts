'use client';

import { useState, useCallback, useMemo } from 'react';
import type { PropsConfig, PropValues, PropControl } from '../types';

interface UseStudioStateOptions {
  controls: PropsConfig;
  defaultProps?: PropValues;
  onPropsChange?: (props: PropValues) => void;
}

interface UseStudioStateReturn {
  /** Current prop values */
  props: PropValues;
  /** Update a single prop */
  setProp: (name: string, value: unknown) => void;
  /** Update multiple props */
  setProps: (updates: PropValues) => void;
  /** Reset to defaults */
  resetProps: () => void;
  /** Whether props have been modified */
  isModified: boolean;
}

/**
 * Get default value for a control
 */
function getControlDefault(control: PropControl): unknown {
  if ('defaultValue' in control && control.defaultValue !== undefined) {
    return control.defaultValue;
  }

  switch (control.type) {
    case 'text':
      return '';
    case 'number':
      return 0;
    case 'boolean':
      return false;
    case 'select':
      const firstOption = control.options[0];
      return typeof firstOption === 'string'
        ? firstOption
        : (firstOption?.value ?? '');
    case 'color':
      return '#000000';
    case 'range':
      return control.min ?? 0;
    default:
      return undefined;
  }
}

/**
 * Build initial props from controls
 */
function buildInitialProps(
  controls: PropsConfig,
  defaultProps?: PropValues,
): PropValues {
  const initial: PropValues = {};

  for (const [name, control] of Object.entries(controls)) {
    initial[name] =
      defaultProps?.[name] !== undefined
        ? defaultProps[name]
        : getControlDefault(control);
  }

  return initial;
}

/**
 * Hook for managing CodeStudio state
 */
export function useStudioState({
  controls,
  defaultProps,
  onPropsChange,
}: UseStudioStateOptions): UseStudioStateReturn {
  const initialProps = useMemo(
    () => buildInitialProps(controls, defaultProps),
    [controls, defaultProps],
  );

  const [props, setPropsState] = useState<PropValues>(initialProps);

  const setProp = useCallback(
    (name: string, value: unknown) => {
      setPropsState((prev) => {
        const next = { ...prev, [name]: value };
        onPropsChange?.(next);
        return next;
      });
    },
    [onPropsChange],
  );

  const setProps = useCallback(
    (updates: PropValues) => {
      setPropsState((prev) => {
        const next = { ...prev, ...updates };
        onPropsChange?.(next);
        return next;
      });
    },
    [onPropsChange],
  );

  const resetProps = useCallback(() => {
    const reset = buildInitialProps(controls, defaultProps);
    setPropsState(reset);
    onPropsChange?.(reset);
  }, [controls, defaultProps, onPropsChange]);

  // Check if props differ from initial
  const isModified = useMemo(() => {
    return Object.keys(props).some((key) => props[key] !== initialProps[key]);
  }, [props, initialProps]);

  return {
    props,
    setProp,
    setProps,
    resetProps,
    isModified,
  };
}

export default useStudioState;
