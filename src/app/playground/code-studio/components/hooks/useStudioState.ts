// src/app/playground/code-studio/components/hooks/useStudioState.ts
'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import type { PropsConfig, PropValues, PropControl } from '../types';

interface UseStudioStateOptions {
  /** Controls configuration */
  controls: PropsConfig;
  /** Default prop values */
  defaultProps?: PropValues;
  /** Enable URL state encoding */
  enableUrlState?: boolean;
  /** Callback when props change */
  onPropsChange?: (props: PropValues) => void;
}

interface UseStudioStateReturn {
  /** Current prop values */
  values: PropValues;
  /** Set a single prop value */
  setValue: (name: string, value: unknown) => void;
  /** Set multiple prop values */
  setValues: (updates: PropValues) => void;
  /** Reset to default values */
  reset: () => void;
  /** Whether values have changed from defaults */
  isDirty: boolean;
  /** Get shareable URL */
  getShareUrl: () => string;
}

/**
 * Extract default value from a control
 */
function getDefaultFromControl(control: PropControl): unknown {
  switch (control.type) {
    case 'text':
      return control.defaultValue ?? '';
    case 'number':
      return control.defaultValue ?? 0;
    case 'boolean':
      return control.defaultValue ?? false;
    case 'select':
    case 'radio':
      return control.defaultValue ?? '';
    case 'color':
      return control.defaultValue ?? '#000000';
    case 'range':
      return control.defaultValue ?? control.min;
    case 'object':
      return control.defaultValue ?? {};
    case 'array':
      return control.defaultValue ?? [];
    case 'function':
      return undefined;
    default:
      return undefined;
  }
}

/**
 * Build default values from controls config
 */
function buildDefaults(controls: PropsConfig): PropValues {
  const defaults: PropValues = {};
  for (const [name, control] of Object.entries(controls)) {
    defaults[name] = getDefaultFromControl(control);
  }
  return defaults;
}

/**
 * Encode props to URL-safe string
 */
function encodeProps(props: PropValues): string {
  try {
    return btoa(JSON.stringify(props));
  } catch {
    return '';
  }
}

/**
 * Decode props from URL-safe string
 */
function decodeProps(encoded: string): PropValues | null {
  try {
    return JSON.parse(atob(encoded));
  } catch {
    return null;
  }
}

/**
 * Hook for managing Code Studio state with optional URL persistence
 */
export function useStudioState({
  controls,
  defaultProps,
  enableUrlState = false,
  onPropsChange,
}: UseStudioStateOptions): UseStudioStateReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Build complete defaults by merging control defaults with provided defaults
  const mergedDefaults = useMemo(() => {
    return { ...buildDefaults(controls), ...defaultProps };
  }, [controls, defaultProps]);

  // Initialize from URL if available
  const initialValues = useMemo(() => {
    if (enableUrlState) {
      const encoded = searchParams.get('props');
      if (encoded) {
        const decoded = decodeProps(encoded);
        if (decoded) {
          return { ...mergedDefaults, ...decoded };
        }
      }
    }
    return mergedDefaults;
  }, [enableUrlState, searchParams, mergedDefaults]);

  const [values, setValuesState] = useState<PropValues>(initialValues);

  // Sync with URL when values change
  useEffect(() => {
    if (!enableUrlState) return;

    const encoded = encodeProps(values);
    const params = new URLSearchParams(searchParams.toString());

    // Only update URL if values differ from defaults
    const isDifferent =
      JSON.stringify(values) !== JSON.stringify(mergedDefaults);

    if (isDifferent) {
      params.set('props', encoded);
    } else {
      params.delete('props');
    }

    const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [values, enableUrlState, mergedDefaults, pathname, router, searchParams]);

  // Notify parent of changes
  useEffect(() => {
    onPropsChange?.(values);
  }, [values, onPropsChange]);

  const setValue = useCallback((name: string, value: unknown) => {
    setValuesState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const setValues = useCallback((updates: PropValues) => {
    setValuesState((prev) => ({ ...prev, ...updates }));
  }, []);

  const reset = useCallback(() => {
    setValuesState(mergedDefaults);
  }, [mergedDefaults]);

  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(mergedDefaults);
  }, [values, mergedDefaults]);

  const getShareUrl = useCallback(() => {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams();
    params.set('props', encodeProps(values));
    return `${window.location.origin}${pathname}?${params}`;
  }, [values, pathname]);

  return {
    values,
    setValue,
    setValues,
    reset,
    isDirty,
    getShareUrl,
  };
}

export default useStudioState;
