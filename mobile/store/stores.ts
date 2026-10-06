import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserData } from '@/data/storage/asyncstorage';

export interface StoreState {
  // Authentication & User State
  isLoggedIn: boolean;
  user: UserData | null;
  token: string | null;
  email: string | null;
  password: string | null;

  // Preferences
  isDarkMode: boolean;

  // Actions
  setIsLoggedIn: (value: boolean) => void;
  setUser: (user: UserData | null) => void;
  setToken: (token: string | null) => void;
  setEmail: (email: string | null) => void;
  setPassword: (password: string | null) => void;
  setIsDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
  login: (token: string, user?: UserData | null) => void;
  logout: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      token: null,
      email: null,
      password: null,
      isDarkMode: false,

      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token, isLoggedIn: Boolean(token) }),
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setIsDarkMode: (isDarkMode) => set({ isDarkMode }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      login: (token, user = null) =>
        set({
          token,
          user,
          isLoggedIn: true,
        }),

      logout: () =>
        set({
          isLoggedIn: false,
          user: null,
          token: null,
          email: null,
          password: null,
        }),
    }),
    {
      name: 'redback-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist safe credentials and preferences across app restarts
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);

export default useStore;