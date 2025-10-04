import { LocalStorageEnum, LocalStorageService } from "@/utils/storage";
import { create } from "zustand";

type AuthStore = {
  setIsSigned: (value: boolean) => void;
  isSigned: boolean;
  handleSignIn: () => Promise<void>;
  handleLogout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isSigned: false,
  setIsSigned: (value) => set({ isSigned: value }),
  handleSignIn: async () => {
    try {
      await LocalStorageService.set(LocalStorageEnum.userAuth, true);
      set({ isSigned: true });
    } catch {
      set({ isSigned: false });
      //
    }
  },
  handleLogout: async () => {
    set({ isSigned: false });
    await LocalStorageService.clear();
  },
}));
