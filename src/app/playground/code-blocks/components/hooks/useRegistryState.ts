// src/app/playground/code-blocks/components/hooks/useRegistryState.ts
'use client';

import { useState, useMemo, useCallback } from 'react';
import type {
  RegistryComponent,
  RegistryConfig,
  FilterState,
  SortOption,
  ComponentCategory,
  ComponentComplexity,
} from '../types';

interface UseRegistryStateOptions {
  /** Registry configuration */
  registry: RegistryConfig;
  /** Initial category filter */
  initialCategory?: ComponentCategory | 'all';
  /** Initial sort option */
  initialSort?: SortOption;
}

interface UseRegistryStateReturn {
  /** Filtered and sorted components */
  components: RegistryComponent[];
  /** Current filter state */
  filters: FilterState;
  /** Current sort option */
  sortBy: SortOption;
  /** Set search query */
  setQuery: (query: string) => void;
  /** Set category filter */
  setCategory: (category: ComponentCategory | 'all') => void;
  /** Set complexity filter */
  setComplexity: (complexity: ComponentComplexity | 'all') => void;
  /** Toggle tag filter */
  toggleTag: (tag: string) => void;
  /** Set sort option */
  setSortBy: (sort: SortOption) => void;
  /** Reset all filters */
  resetFilters: () => void;
  /** All unique tags from registry */
  availableTags: string[];
  /** Count of components matching filters */
  resultCount: number;
  /** Total component count */
  totalCount: number;
}

/**
 * Simple fuzzy search scoring
 */
function fuzzyMatch(text: string, query: string): number {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  // Exact match gets highest score
  if (lowerText === lowerQuery) return 100;

  // Contains full query
  if (lowerText.includes(lowerQuery)) return 80;

  // Check each word in query
  const queryWords = lowerQuery.split(/\s+/);
  let matchedWords = 0;
  for (const word of queryWords) {
    if (lowerText.includes(word)) matchedWords++;
  }
  if (matchedWords > 0) {
    return (matchedWords / queryWords.length) * 60;
  }

  // Check if characters appear in order
  let queryIndex = 0;
  for (let i = 0; i < lowerText.length && queryIndex < lowerQuery.length; i++) {
    if (lowerText[i] === lowerQuery[queryIndex]) {
      queryIndex++;
    }
  }
  if (queryIndex === lowerQuery.length) {
    return 40;
  }

  return 0;
}

/**
 * Score a component against search query
 */
function scoreComponent(component: RegistryComponent, query: string): number {
  if (!query.trim()) return 100;

  const nameScore = fuzzyMatch(component.name, query) * 1.5;
  const descScore = fuzzyMatch(component.description, query);
  const tagScore = Math.max(
    0,
    ...component.tags.map((tag) => fuzzyMatch(tag, query) * 0.8),
  );

  return Math.max(nameScore, descScore, tagScore);
}

/**
 * Hook for managing registry state with filtering and sorting
 */
export function useRegistryState({
  registry,
  initialCategory = 'all',
  initialSort = 'name',
}: UseRegistryStateOptions): UseRegistryStateReturn {
  const [filters, setFilters] = useState<FilterState>({
    query: '',
    category: initialCategory,
    complexity: 'all',
    tags: [],
  });

  const [sortBy, setSortBy] = useState<SortOption>(initialSort);

  // Get all unique tags
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    registry.components.forEach((c) => c.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [registry.components]);

  // Filter and sort components
  const components = useMemo(() => {
    let filtered = registry.components;

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter((c) => c.category === filters.category);
    }

    // Filter by complexity
    if (filters.complexity !== 'all') {
      filtered = filtered.filter((c) => c.complexity === filters.complexity);
    }

    // Filter by tags
    if (filters.tags.length > 0) {
      filtered = filtered.filter((c) =>
        filters.tags.every((tag) => c.tags.includes(tag)),
      );
    }

    // Filter by search query and score
    if (filters.query.trim()) {
      filtered = filtered
        .map((c) => ({ component: c, score: scoreComponent(c, filters.query) }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((item) => item.component);
    } else {
      // Sort without search
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'category':
            return a.category.localeCompare(b.category);
          case 'complexity': {
            const order = { simple: 0, moderate: 1, complex: 2 };
            return order[a.complexity] - order[b.complexity];
          }
          case 'updated':
            return (b.updatedAt || '').localeCompare(a.updatedAt || '');
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [registry.components, filters, sortBy]);

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

  const toggleTag = useCallback((tag: string) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      query: '',
      category: 'all',
      complexity: 'all',
      tags: [],
    });
  }, []);

  return {
    components,
    filters,
    sortBy,
    setQuery,
    setCategory,
    setComplexity,
    toggleTag,
    setSortBy,
    resetFilters,
    availableTags,
    resultCount: components.length,
    totalCount: registry.components.length,
  };
}

export default useRegistryState;
