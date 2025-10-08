import i18n from "@/i18n";
import { SetLanguage, useLanguageStore } from "@/stores/language";
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

  return {
    translation,
    language,
    handleLanguageIsSupported,
    handleChangeLanguage,
  };
}
