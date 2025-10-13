import { LocalStorageEnum, LocalStorageService } from "@/utils/storage";
import { create } from "zustand";

type SessionStore = {
  setIsSigned: (value: boolean) => void;
  isSigned: boolean;
  handleSignIn: () => Promise<void>;
  handleLogout: () => Promise<void>;
};

export const useSessionStore = create<SessionStore>((set) => ({
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
    await LocalStorageService.remove(LocalStorageEnum.userAuth);
  },
}));
