import { create } from 'zustand';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  login: (user) => set({ user, isLoading: false }),
  logout: () => set({ user: null, isLoading: false }),
}));

export default useAuthStore;
