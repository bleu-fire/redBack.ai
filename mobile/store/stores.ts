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

  // Live Backend Data
  speciesList: any[];
  identifications: any[];
  learningModules: any[];
  isDataLoading: boolean;

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
  setSpeciesList: (list: any[]) => void;
  setIdentifications: (records: any[]) => void;
  setLearningModules: (modules: any[]) => void;
  loadAllBackendData: () => Promise<void>;
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
      speciesList: [],
      identifications: [],
      learningModules: [],
      isDataLoading: false,

      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
      setUser: (user: UserData | null) => set({ user }),
      setToken: (token: string | null) => set({ token, isLoggedIn: Boolean(token) }),
      setEmail: (email: string | null) => set({ email }),
      setPassword: (password: string | null) => set({ password }),
      setIsDarkMode: (isDarkMode: boolean) => set({ isDarkMode }),
      toggleDarkMode: () => set((state: StoreState) => ({ isDarkMode: !state.isDarkMode })),
      setSpeciesList: (speciesList: any[]) => set({ speciesList }),
      setIdentifications: (identifications: any[]) => set({ identifications }),
      setLearningModules: (learningModules: any[]) => set({ learningModules }),

      loadAllBackendData: async () => {
        set({ isDataLoading: true });
        try {
          const { fetchAllSpecies, fetchAllIdentifications, fetchLearningModules, speciesDtoToSpeciesDetail } = await import('@/data/api/logic');
          
          const [speciesRes, identsRes, learnRes] = await Promise.allSettled([
            fetchAllSpecies(),
            fetchAllIdentifications(),
            fetchLearningModules(),
          ]);

          if (speciesRes.status === 'fulfilled' && speciesRes.value?.data) {
            const mapped = speciesRes.value.data.map((s: any) => speciesDtoToSpeciesDetail(s));
            set({ speciesList: mapped });
          }

          if (identsRes.status === 'fulfilled' && Array.isArray(identsRes.value)) {
            set({ identifications: identsRes.value });
          }

          if (learnRes.status === 'fulfilled' && Array.isArray(learnRes.value)) {
            set({ learningModules: learnRes.value });
          }
        } catch (err) {
          console.warn('[Store] Failed loading backend data:', err);
        } finally {
          set({ isDataLoading: false });
        }
      },

      login: (token: string, user: UserData | null = null) =>
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
      partialize: (state: StoreState) => ({
        token: state.token,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);

export default useStore;