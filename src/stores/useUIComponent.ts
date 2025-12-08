'use client';
import { createStore, useStore } from 'zustand';
import React from 'react';
import { Position } from '@/app/playground/modal/components/shared/types';

export type UIComponentState = {
  isOpen: boolean;
  isClosing: boolean;
  closeDelay: number;
  content: React.ReactNode | null;
  position: Position;
  size: 'small' | 'medium' | 'large' | 'full';
  open: (
    content: React.ReactNode,
    options?: {
      position?: Position;
      size?: 'small' | 'medium' | 'large' | 'full';
    },
  ) => void;
  close: () => void;
};

export const useUIComponentStore = createStore<UIComponentState>((set) => ({
  isOpen: false,
  isClosing: false,
  closeDelay: 300,
  content: null,
  position: 'bottom',
  size: 'large',
  open: (content, options = {}) =>
    set({
      isOpen: true,
      content,
      position: options.position || 'bottom',
      size: options.size || 'large',
    }),
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
// src/stores/useUIComponent.ts
