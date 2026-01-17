// src/app/playground/hover-card/components/useHoverCardGroup.ts
'use client';

import { create } from 'zustand';
import { useCallback, useEffect, useId } from 'react';

/**
 * Store for coordinating multiple hover cards
 * When one card opens, others in the same group close
 */
interface HoverCardGroupStore {
  /** Map of group ID to active card ID */
  activeCards: Map<string, string | null>;
  /** Set active card for a group */
  setActiveCard: (groupId: string, cardId: string | null) => void;
  /** Get active card for a group */
  getActiveCard: (groupId: string) => string | null;
  /** Clear all active cards */
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
 *
 * @param groupId - Group identifier (cards with same ID coordinate)
 * @returns Object with active state and control functions
 *
 * @example
 * ```tsx
 * const { isActive, setActive, clearActive } = useHoverCardGroup('user-cards');
 *
 * // When this card opens, it becomes active and others close
 * const handleOpen = () => setActive();
 * ```
 */
export function useHoverCardGroup(groupId?: string) {
  const cardId = useId();
  const store = useHoverCardGroupStore();

  // Check if this card is the active one in its group
  const isActive = groupId ? store.getActiveCard(groupId) === cardId : true;

  // Set this card as active (closes others in group)
  const setActive = useCallback(() => {
    if (groupId) {
      store.setActiveCard(groupId, cardId);
    }
  }, [groupId, cardId, store]);

  // Clear active state for this card
  const clearActive = useCallback(() => {
    if (groupId && store.getActiveCard(groupId) === cardId) {
      store.setActiveCard(groupId, null);
    }
  }, [groupId, cardId, store]);

  // Check if another card in the group is active
  const isOtherActive = groupId
    ? store.getActiveCard(groupId) !== null &&
      store.getActiveCard(groupId) !== cardId
    : false;

  // Subscribe to changes for this group
  const activeCardInGroup = groupId ? store.getActiveCard(groupId) : null;

  // Cleanup on unmount
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
