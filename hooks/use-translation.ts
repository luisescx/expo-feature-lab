import i18n from "@/i18n";
import { SetLanguage, useLanguageStore } from "@/stores/language";
import { LocalStorageEnum, LocalStorageService } from "@/utils/storage";
import { getLocales } from "expo-localization";
import { useCallback, useMemo } from "react";

export function useTranslation() {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  const translation = useMemo(
    () => (key: string) => i18n.t(key),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language],
  );

  const handleLanguageIsSupported = useCallback(() => {
    const deviceLanguage = getLocales()[0]?.languageCode ?? "en";

    return ["en", "pt", "es"].includes(deviceLanguage) ? deviceLanguage : "en";
  }, []);

  const handleChangeLanguage = useCallback(
    async (data: SetLanguage) => {
      await setLanguage(data);
    },
    [setLanguage],
  );

  const handleLanguageOnStorage = useCallback(async () => {
    const currentLanguageOnStorage = await LocalStorageService.get(
      LocalStorageEnum.language,
    );

    return !!currentLanguageOnStorage;
  }, []);

  const removeFromStorage = useCallback(async () => {
    await LocalStorageService.remove(LocalStorageEnum.language);
  }, []);

  const handleDeviceLanguage = useCallback(async () => {
    const isLanguageOnStorage = await handleLanguageOnStorage();

    if (isLanguageOnStorage) {
      await removeFromStorage();
    }

    const supportedLanguage = handleLanguageIsSupported();
    await handleChangeLanguage({
      language: supportedLanguage,
      saveOnStorage: false,
    });
  }, [
    handleLanguageOnStorage,
    handleLanguageIsSupported,
    removeFromStorage,
    handleChangeLanguage,
  ]);

  return {
    translation,
    language,
    handleLanguageIsSupported,
    handleChangeLanguage,
    handleDeviceLanguage,
    handleLanguageOnStorage,
  };
}
