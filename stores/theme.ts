import { LocalStorageEnum, LocalStorageService } from "@/utils/storage";
import { create } from "zustand";

export type ThemeStates = "light" | "dark";
export type ThemeSource = "app" | "system";

type ThemeStore = {
  theme: ThemeStates;
  setLocalTheme: (value: ThemeStates) => void;
  toggleStorageTheme: (
    theme: ThemeStates,
    source: ThemeSource,
  ) => Promise<void>;
  isUsingSystemTheme: boolean;
  setIsUsingSystemTheme: (value: boolean) => void;
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: "light",
  isUsingSystemTheme: true,
  setIsUsingSystemTheme: (isUsingSystemTheme) => set({ isUsingSystemTheme }),
  setLocalTheme: (theme) => set({ theme }),
  toggleStorageTheme: async (theme, source) => {
    set({ theme, isUsingSystemTheme: source === "system" });

    if (source === "system") {
      await LocalStorageService.remove(LocalStorageEnum.customTheme);
    } else {
      await LocalStorageService.set(LocalStorageEnum.customTheme, theme);
    }
  },
}));
