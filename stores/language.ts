import i18n from "@/i18n";
import { LocalStorageEnum, LocalStorageService } from "@/utils/storage";
import { create } from "zustand";

type SetLanguage = {
  language: string;
  saveOnStorage: boolean;
};

type LanguageStore = {
  language: string;
  setLanguage: (data: SetLanguage) => Promise<void>;
};

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: i18n.locale,
  setLanguage: async ({ language, saveOnStorage }) => {
    i18n.locale = language;

    set({ language });

    if (saveOnStorage) {
      await LocalStorageService.set(LocalStorageEnum.language, language);
    }
  },
}));
