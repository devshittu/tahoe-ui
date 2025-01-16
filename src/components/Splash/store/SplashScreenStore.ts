import { StateCreator, createStore, useStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type SplashScreenStore = {
  hasShownSplash: boolean;
  setHasShownSplash: (hasShown: boolean) => void;
};

// Explicitly type the state creator with Zustand's StateCreator type
const splashScreenStoreCreator: StateCreator<
  SplashScreenStore,
  [['zustand/persist', unknown]]
> = (set, get) => ({
  hasShownSplash: false, // default value
  setHasShownSplash: (hasShown) => set({ hasShownSplash: hasShown }),
});

export const splashScreenStore = createStore(
  persist(splashScreenStoreCreator, {
    name: 'splashscreen-store',
    storage: createJSONStorage(() => sessionStorage),
    version: 1.0, //
  }),
);

export const useSplashStore = () => useStore(splashScreenStore);

//Path: src/components/SplashScreen/store/SplashScreenStore.ts
