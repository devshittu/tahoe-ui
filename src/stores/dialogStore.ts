// // /stores/dialogStore.ts
// "use client";

// import { createStore, useStore } from 'zustand';

// export type Position = 'top' | 'bottom' | 'left' | 'right';
// export type Size = 'full' | 'half' | 'normal';
// export type AlignmentHorizontal = 'left' | 'center' | 'right';
// export type AlignmentVertical = 'top' | 'middle' | 'bottom';

// type DialogState = {
//   isOpen: boolean;
//   isClosing: boolean;
//   position: Position;
//   size: Size;
//   horizontalAlign: AlignmentHorizontal;
//   verticalAlign: AlignmentVertical;
//   show: (
//     position: Position,
//     size: Size,
//     horizontalAlign?: AlignmentHorizontal,
//     verticalAlign?: AlignmentVertical
//   ) => void;
//   close: () => void;
//   finalizeClose: () => void;
// };

// export const dialogStore = createStore<DialogState>((set) => ({
//   isOpen: false,
//   isClosing: false,
//   position: 'bottom',
//   size: 'normal',
//   horizontalAlign: 'center',
//   verticalAlign: 'middle',
//   show: (position, size, horizontalAlign = 'center', verticalAlign = 'middle') =>
//     set({ isOpen: true, isClosing: false, position, size, horizontalAlign, verticalAlign }),
//   close: () => set({ isClosing: true }),
//   finalizeClose: () => set({ isOpen: false, isClosing: false }),
// }));

// export const useDialog = () => useStore(dialogStore);

// /stores/dialogStore.ts
'use client';

import { create } from 'zustand';

export type Position = 'top' | 'bottom' | 'left' | 'right';
export type Size = 'full' | 'half' | 'normal';
export type AlignmentHorizontal = 'left' | 'center' | 'right';
export type AlignmentVertical = 'top' | 'middle' | 'bottom';
export type Mode = 'alert' | 'page';

type DialogState = {
  isOpen: boolean;
  isClosing: boolean;
  mode: Mode;
  position: Position;
  size: Size;
  horizontalAlign: AlignmentHorizontal;
  verticalAlign: AlignmentVertical;
  show: (
    mode: Mode,
    position: Position,
    size: Size,
    horizontalAlign?: AlignmentHorizontal,
    verticalAlign?: AlignmentVertical,
  ) => void;
  close: () => void;
  finalizeClose: () => void;
};

export const useDialog = create<DialogState>((set) => ({
  isOpen: false,
  isClosing: false,
  mode: 'alert',
  position: 'center',
  size: 'normal',
  horizontalAlign: 'center',
  verticalAlign: 'middle',
  show: (
    mode,
    position,
    size,
    horizontalAlign = 'center',
    verticalAlign = 'middle',
  ) =>
    set({
      isOpen: true,
      isClosing: false,
      mode,
      position,
      size,
      horizontalAlign,
      verticalAlign,
    }),
  close: () => set({ isClosing: true }),
  finalizeClose: () => set({ isOpen: false, isClosing: false }),
}));
