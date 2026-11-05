import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en";
import fr from "./locales/fr";
import ar from "./locales/ar";

export const SUPPORTED_LANGUAGES = ["fr", "en", "ar"] as const;
export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const RTL_LANGUAGES: AppLanguage[] = ["ar"];

i18next.use(initReactI18next).init({
  compatibilityJSON: "v4",
  resources: {
    fr: { translation: fr },
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: "fr",
  fallbackLng: "fr",
  interpolation: { escapeValue: false },
});

export default i18next;
