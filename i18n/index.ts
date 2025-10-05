import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

import en from "./translations/en";
import es from "./translations/es";
import pt from "./translations/pt";

const i18n = new I18n({ en, pt, es });

const SUPPORTED_LANGUAGES = ["en", "pt", "es"] as const;
const deviceLanguage = getLocales()[0]?.languageCode ?? "en";

const locale = SUPPORTED_LANGUAGES.includes(deviceLanguage as any)
  ? deviceLanguage
  : "en";

i18n.enableFallback = true;
i18n.defaultLocale = "en";
i18n.locale = locale;

export default i18n;
