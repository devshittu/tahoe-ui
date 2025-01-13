// src/components/SplashScreen/store/splash-store.ts
'use client';

import { createStore, useStore } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { StateCreator } from 'zustand';
import type { SplashConfig } from '../splash-config';

type SplashStoreState = {
  hasMounted: boolean;
  hasShown: boolean;
  loading: boolean;
  displayStyle: 'none' | 'block';

  config: SplashConfig;

  setHasMounted: (val: boolean) => void;
  setHasShown: (val: boolean) => void;
  setLoading: (val: boolean) => void;
  setDisplayStyle: (val: 'none' | 'block') => void;
  setConfig: (cfg: Partial<SplashConfig>) => void;
};

// Default configuration
const defaultConfig: SplashConfig = {
  id: 'app-splash',
  themable: false,
  backgroundColor: 'bg-slate-50 dark:bg-slate-950',
  containerSize: 'w-[100px] h-[100px]',
  containerShape: 'rounded-[20px]',
  frequency: 'once-per-session',
  icon: undefined,
  message: undefined,
  animation: 'grow',
  displayDuration: 2000,
};

const splashStoreCreator: StateCreator<SplashStoreState> = (set) => ({
  hasMounted: false,
  hasShown: false,
  loading: false,
  displayStyle: 'block',

  config: defaultConfig,

  setHasMounted: (val) => set({ hasMounted: val }),
  setHasShown: (val) => set({ hasShown: val }),
  setLoading: (val) => set({ loading: val }),
  setDisplayStyle: (val) => set({ displayStyle: val }),
  setConfig: (cfg) =>
    set((state) => ({
      config: { ...state.config, ...cfg },
    })),
});

export const useSplashBaseStore = createStore(
  persist(splashStoreCreator, {
    name: 'splash-store',
    storage: createJSONStorage(() => sessionStorage), // or localStorage if you like
    version: 1.0,
  }),
);

export const useSplashStore = () => useStore(useSplashBaseStore);