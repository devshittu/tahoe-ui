'use client';

import { createStore, useStore } from 'zustand';
import type { Position, DialogMaxWidthPreset } from '../shared/types';

// Modal types
export type ModalType = 'dialog' | 'pagemode';

// Individual modal instance
export type ModalInstance = {
  id: string;
  type: ModalType;
  content: React.ReactNode;
  position: Position;
  size?: 'small' | 'medium' | 'large' | 'full';
  isLoading: boolean;
  loadingMessage?: string;
  zIndex: number;
  isClosing: boolean;
  // Dialog-specific
  showFrom?: Position;
  handlebarPosition?: Position;
  // Dialog sizing (content-adaptive)
  sizingPreset?: DialogMaxWidthPreset;
  maxWidth?: number;
};

// Store state
export type ModalStoreState = {
  // Stack of all modals (both Dialog and PageMode)
  stack: ModalInstance[];

  // Base z-index (increments for each new modal)
  baseZIndex: number;

  // Close delay for animations (fallback)
  closeDelay: number;

  // Actions
  openDialog: (
    content: React.ReactNode,
    options?: {
      showFrom?: Position;
      handlebarPosition?: Position;
      /** Use a preset max-width for content-adaptive sizing */
      sizingPreset?: DialogMaxWidthPreset;
      /** Custom max-width in pixels (overrides sizingPreset) */
      maxWidth?: number;
    },
  ) => string; // Returns modal ID

  openPageMode: (
    content: React.ReactNode,
    options?: {
      position?: Position;
      size?: 'small' | 'medium' | 'large' | 'full';
    },
  ) => string; // Returns modal ID

  close: (id?: string) => void; // Close specific modal or top modal (marks as closing)
  completeClose: (id: string) => void; // Actually remove modal from stack (call after animation)
  closeAll: () => void;

  setLoading: (id: string, isLoading: boolean, message?: string) => void;

  // Getters
  getModal: (id: string) => ModalInstance | undefined;
  getTopModal: () => ModalInstance | undefined;
  getPageMode: () => ModalInstance | undefined; // Get current PageMode
  getDialog: () => ModalInstance | undefined; // Get current Dialog
};

// Generate unique ID
let modalCounter = 0;
const generateId = (type: ModalType): string => {
  return `${type}-${++modalCounter}-${Date.now()}`;
};

// Create the store
export const modalStore = createStore<ModalStoreState>((set, get) => ({
  stack: [],
  baseZIndex: 9999,
  closeDelay: 300,

  openDialog: (content, options = {}) => {
    const id = generateId('dialog');
    const currentStack = get().stack;
    const zIndex = get().baseZIndex + currentStack.length;

    const newModal: ModalInstance = {
      id,
      type: 'dialog',
      content,
      position: options.showFrom || 'top',
      showFrom: options.showFrom || 'top',
      handlebarPosition: options.handlebarPosition || options.showFrom || 'top',
      sizingPreset: options.sizingPreset,
      maxWidth: options.maxWidth,
      isLoading: false,
      zIndex,
      isClosing: false,
    };

    set({ stack: [...currentStack, newModal] });
    return id;
  },

  openPageMode: (content, options = {}) => {
    const id = generateId('pagemode');
    const currentStack = get().stack;
    const zIndex = get().baseZIndex + currentStack.length;

    const newModal: ModalInstance = {
      id,
      type: 'pagemode',
      content,
      position: options.position || 'bottom',
      size: options.size || 'large',
      isLoading: false,
      zIndex,
      isClosing: false,
    };

    set({ stack: [...currentStack, newModal] });
    return id;
  },

  close: (id?: string) => {
    const stack = get().stack;
    const closeDelay = get().closeDelay;

    if (!id) {
      // Close top modal
      if (stack.length === 0) return;
      const topModal = stack[stack.length - 1];
      id = topModal.id;
    }

    // Mark as closing (animation starts)
    set({
      stack: stack.map((modal) =>
        modal.id === id ? { ...modal, isClosing: true } : modal,
      ),
    });

    // Fallback removal after extended delay (safety net if callback not called)
    // Animation should complete well within 500ms
    setTimeout(() => {
      const currentStack = get().stack;
      const modal = currentStack.find((m) => m.id === id);
      // Only remove if still marked as closing (wasn't already removed by completeClose)
      if (modal?.isClosing) {
        set({
          stack: currentStack.filter((m) => m.id !== id),
        });
      }
    }, closeDelay + 200);
  },

  completeClose: (id: string) => {
    // Called by animation's onExitComplete - removes modal from stack
    set({
      stack: get().stack.filter((modal) => modal.id !== id),
    });
  },

  closeAll: () => {
    const stack = get().stack;
    const closeDelay = get().closeDelay;

    // Mark all as closing
    set({
      stack: stack.map((modal) => ({ ...modal, isClosing: true })),
    });

    // Clear after animation
    setTimeout(() => {
      set({ stack: [] });
    }, closeDelay);
  },

  setLoading: (id, isLoading, message) => {
    set({
      stack: get().stack.map((modal) =>
        modal.id === id
          ? { ...modal, isLoading, loadingMessage: message }
          : modal,
      ),
    });
  },

  getModal: (id) => {
    return get().stack.find((modal) => modal.id === id);
  },

  getTopModal: () => {
    const stack = get().stack;
    return stack.length > 0 ? stack[stack.length - 1] : undefined;
  },

  getPageMode: () => {
    const stack = get().stack;
    // Get the last PageMode in stack
    for (let i = stack.length - 1; i >= 0; i--) {
      if (stack[i].type === 'pagemode') {
        return stack[i];
      }
    }
    return undefined;
  },

  getDialog: () => {
    const stack = get().stack;
    // Get the last Dialog in stack
    for (let i = stack.length - 1; i >= 0; i--) {
      if (stack[i].type === 'dialog') {
        return stack[i];
      }
    }
    return undefined;
  },
}));

// Main hook - unified access
export const useModals = () => useStore(modalStore);

// Convenience hooks for specific modal types
export const usePageMode = () => {
  const store = useStore(modalStore);
  const pageMode = store.getPageMode();

  return {
    isOpen: !!pageMode,
    isClosing: pageMode?.isClosing || false,
    content: pageMode?.content || null,
    position: pageMode?.position || 'bottom',
    size: pageMode?.size || 'large',
    isLoading: pageMode?.isLoading || false,
    loadingMessage: pageMode?.loadingMessage,
    id: pageMode?.id,
    open: store.openPageMode,
    close: () => pageMode && store.close(pageMode.id),
    completeClose: () => pageMode && store.completeClose(pageMode.id),
    setLoading: (isLoading: boolean, message?: string) =>
      pageMode && store.setLoading(pageMode.id, isLoading, message),
  };
};

export const useDialog = () => {
  const store = useStore(modalStore);
  const dialog = store.getDialog();

  return {
    isOpen: !!dialog,
    isClosing: dialog?.isClosing || false,
    content: dialog?.content || null,
    showFrom: dialog?.showFrom || 'top',
    handlebarPosition: dialog?.handlebarPosition || 'top',
    sizingPreset: dialog?.sizingPreset,
    maxWidth: dialog?.maxWidth,
    isLoading: dialog?.isLoading || false,
    loadingMessage: dialog?.loadingMessage,
    id: dialog?.id,
    open: store.openDialog,
    close: () => dialog && store.close(dialog.id),
    setLoading: (isLoading: boolean, message?: string) =>
      dialog && store.setLoading(dialog.id, isLoading, message),
  };
};

// src/app/playground/modal/components/stores/useModalStore.ts
