import { create } from "zustand";

type AuthStore = {
  setIsSigned: (value: boolean) => void;
  isSigned: boolean;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isSigned: false,
  isLoading: true,
  setIsSigned: (value) => set({ isSigned: value }),
}));
