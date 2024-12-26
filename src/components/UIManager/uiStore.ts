// src/components/UIManager/uiStore.ts
"use client";
import { create } from "zustand";

type UIComponent = {
  id: string;
  onEscape?: () => void;
};

type UIState = {
  stack: UIComponent[];
  register: (comp: UIComponent) => void;
  unregister: (id: string) => void;
  top: () => UIComponent | undefined;
};

export const useUIManager = create<UIState>((set, get) => ({
  stack: [],
  register: (comp) =>
    set((s) => ({
      stack: [...s.stack, comp],
    })),
  unregister: (id) =>
    set((s) => ({
      stack: s.stack.filter((c) => c.id !== id),
    })),
  top: () => {
    const st = get().stack;
    return st[st.length - 1];
  },
}));
