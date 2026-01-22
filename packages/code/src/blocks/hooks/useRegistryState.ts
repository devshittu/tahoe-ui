'use client';

import { useState, useMemo, useCallback } from 'react';
import type {
  RegistryConfig,
  RegistryComponent,
  FilterState,
  ComponentCategory,
  ComponentComplexity,
} from '../types';

interface UseRegistryStateOptions {
  registry: RegistryConfig;
  initialCategory?: ComponentCategory | 'all';
}

interface UseRegistryStateReturn {
  /** Filtered components */
  components: RegistryComponent[];
  /** Current filter state */
  filters: FilterState;
  /** Set search query */
  setQuery: (query: string) => void;
  /** Set category filter */
  setCategory: (category: ComponentCategory | 'all') => void;
  /** Set complexity filter */
  setComplexity: (complexity: ComponentComplexity | 'all') => void;
  /** Reset all filters */
  resetFilters: () => void;
  /** Result count */
  resultCount: number;
  /** Total count */
  totalCount: number;
}

/**
 * Hook for managing registry state and filtering
 */
export function useRegistryState({
  registry,
  initialCategory = 'all',
}: UseRegistryStateOptions): UseRegistryStateReturn {
  const [filters, setFilters] = useState<FilterState>({
    query: '',
    category: initialCategory,
    complexity: 'all',
    tags: [],
  });

  // Fuzzy search helper
  const matchesQuery = useCallback(
    (component: RegistryComponent, query: string): boolean => {
      if (!query) return true;

      const lowerQuery = query.toLowerCase();
      const searchableText = [
        component.name,
        component.description,
        ...component.tags,
        component.category,
      ]
        .join(' ')
        .toLowerCase();

      // Simple fuzzy matching: all query words must be present
      const queryWords = lowerQuery.split(/\s+/).filter(Boolean);
      return queryWords.every((word) => searchableText.includes(word));
    },
    [],
  );

  // Filter components
  const filteredComponents = useMemo(() => {
    return registry.components.filter((component) => {
      // Category filter
      if (
        filters.category !== 'all' &&
        component.category !== filters.category
      ) {
        return false;
      }

      // Complexity filter
      if (
        filters.complexity !== 'all' &&
        component.complexity !== filters.complexity
      ) {
        return false;
      }

      // Tags filter
      if (
        filters.tags.length > 0 &&
        !filters.tags.some((tag) => component.tags.includes(tag))
      ) {
        return false;
      }

      // Search query
      if (!matchesQuery(component, filters.query)) {
        return false;
      }

      return true;
    });
  }, [registry.components, filters, matchesQuery]);

  // Setters
  const setQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, query }));
  }, []);

  const setCategory = useCallback((category: ComponentCategory | 'all') => {
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const setComplexity = useCallback(
    (complexity: ComponentComplexity | 'all') => {
      setFilters((prev) => ({ ...prev, complexity }));
    },
    [],
  );

  const resetFilters = useCallback(() => {
    setFilters({
      query: '',
      category: 'all',
      complexity: 'all',
      tags: [],
    });
  }, []);

  return {
    components: filteredComponents,
    filters,
    setQuery,
    setCategory,
    setComplexity,
    resetFilters,
    resultCount: filteredComponents.length,
    totalCount: registry.components.length,
  };
}

export default useRegistryState;
