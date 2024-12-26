// src/store/uiStore.ts
import { create } from 'zustand';
import { ReactNode } from 'react';

export type Position =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'middle-left'
  | 'middle-center'
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type UIComponentType = 'page' | 'prompt' | 'dialog' | 'drawer';

export interface UIComponentState {
  isOpen: boolean;
  isClosing: boolean;
  closeDelay: number;
  type: UIComponentType | null;
  position: Position;
  content: ReactNode | null;
  open: (type: UIComponentType, content: ReactNode, position?: Position) => void;
  close: () => void;
}

export const useUIStore = create<UIComponentState>((set) => ({
  isOpen: false,
  isClosing: false,
  closeDelay: 300,
  type: null,
  position: 'middle-center',
  content: null,
  open: (type, content, position = 'middle-center') =>
    set({ isOpen: true, type, content, position }),
  close: () =>
    set((state) => {
      setTimeout(() => set({ isOpen: false, isClosing: false, type: null, content: null }), state.closeDelay);
      return { isClosing: true };
    }),
}));
