'use client';
import { createStore, useStore } from 'zustand';
import React from 'react';

export type UIComponentState = {
  isOpen: boolean;
  isClosing: boolean;
  closeDelay: number;
  content: React.ReactNode | null;
  open: (content: React.ReactNode) => void;
  close: () => void;
};

export const useUIComponentStore = createStore<UIComponentState>((set) => ({
  isOpen: false,
  isClosing: false,
  closeDelay: 300,
  content: null,
  open: (content) => set({ isOpen: true, content }),
  close: () =>
    set((state) => {
      setTimeout(
        () => set({ isOpen: false, isClosing: false, content: null }),
        state.closeDelay,
      );
      return { isClosing: true };
    }),
}));

export const useUIComponent = () => useStore(useUIComponentStore);
