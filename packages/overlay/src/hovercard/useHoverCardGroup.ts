'use client';

import { create } from 'zustand';
import { useCallback, useEffect, useId } from 'react';

interface HoverCardGroupStore {
  activeCards: Map<string, string | null>;
  setActiveCard: (groupId: string, cardId: string | null) => void;
  getActiveCard: (groupId: string) => string | null;
  clearAll: () => void;
}

const useHoverCardGroupStore = create<HoverCardGroupStore>((set, get) => ({
  activeCards: new Map(),

  setActiveCard: (groupId, cardId) => {
    set((state) => {
      const newMap = new Map(state.activeCards);
      newMap.set(groupId, cardId);
      return { activeCards: newMap };
    });
  },

  getActiveCard: (groupId) => {
    return get().activeCards.get(groupId) ?? null;
  },

  clearAll: () => {
    set({ activeCards: new Map() });
  },
}));

/**
 * Hook for hover card group coordination
 */
export function useHoverCardGroup(groupId?: string) {
  const cardId = useId();
  const store = useHoverCardGroupStore();

  const isActive = groupId ? store.getActiveCard(groupId) === cardId : true;

  const setActive = useCallback(() => {
    if (groupId) {
      store.setActiveCard(groupId, cardId);
    }
  }, [groupId, cardId, store]);

  const clearActive = useCallback(() => {
    if (groupId && store.getActiveCard(groupId) === cardId) {
      store.setActiveCard(groupId, null);
    }
  }, [groupId, cardId, store]);

  const isOtherActive = groupId
    ? store.getActiveCard(groupId) !== null &&
      store.getActiveCard(groupId) !== cardId
    : false;

  const activeCardInGroup = groupId ? store.getActiveCard(groupId) : null;

  useEffect(() => {
    return () => {
      if (groupId && store.getActiveCard(groupId) === cardId) {
        store.setActiveCard(groupId, null);
      }
    };
  }, [groupId, cardId, store]);

  return {
    cardId,
    isActive,
    isOtherActive,
    activeCardInGroup,
    setActive,
    clearActive,
  };
}

export default useHoverCardGroup;
