import i18n from "@/i18n";
import { useLanguageStore } from "@/stores/language";
import { getLocales } from "expo-localization";
import { useCallback, useMemo } from "react";

export function useTranslation() {
  const language = useLanguageStore((state) => state.language);

  const translation = useMemo(() => (key: string) => i18n.t(key), [language]);

  const handleLanguageIsSupported = useCallback(() => {
    const deviceLanguage = getLocales()[0]?.languageCode ?? "en";

    return ["en", "pt", "es"].includes(deviceLanguage) ? deviceLanguage : "en";
  }, []);

  return { translation, language, handleLanguageIsSupported };
}
