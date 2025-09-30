import { LocalStorageEnum, LocalStorageService } from "@/utils/storage";
import { create } from "zustand";

export type ThemeStates = "light" | "dark";

type ThemeStore = {
  theme: ThemeStates;
  setTheme: (value: ThemeStates) => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
  toggleTheme: async () => {
    const current = get().theme;
    const newTheme = current === "light" ? "dark" : "light";
    set({ theme: newTheme });
    await LocalStorageService.set(LocalStorageEnum.customTheme, newTheme);
  },
}));
