import { useCallback, useEffect, useState } from "react";
import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

import { RTL_LANGUAGES, SUPPORTED_LANGUAGES, type AppLanguage } from "../lib/i18n";

const STORAGE_KEY = "madrasti.language";

export async function getStoredLanguage(): Promise<AppLanguage | null> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored && (SUPPORTED_LANGUAGES as readonly string[]).includes(stored) ? (stored as AppLanguage) : null;
}

// Applies the saved language on app start, before the first screen renders
// its text, and syncs React Native's RTL flag to match (Arabic only).
// Note: I18nManager.forceRTL only fully mirrors layout after an app
// restart — that's a React Native platform limitation, not something
// this call can avoid, so callers that change language mid-session should
// tell the user to restart the app for correct right-to-left layout.
export async function applyStoredLanguageOnStartup() {
  const stored = await getStoredLanguage();
  const language = stored ?? "fr";
  const shouldBeRTL = RTL_LANGUAGES.includes(language);
  if (I18nManager.isRTL !== shouldBeRTL) {
    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);
  }
  const i18next = (await import("../lib/i18n")).default;
  await i18next.changeLanguage(language);
  return language;
}

export function useLanguage() {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState<AppLanguage>((i18n.language as AppLanguage) || "fr");
  // True once a change in this session would need a restart to fully take
  // effect (i.e. RTL-ness changed). Surface this in the UI so the person
  // knows to restart, rather than wondering why layout looks off.
  const [restartRecommended, setRestartRecommended] = useState(false);

  useEffect(() => {
    getStoredLanguage().then((stored) => { if (stored) setLanguageState(stored); });
  }, []);

  const setLanguage = useCallback(
    async (next: AppLanguage) => {
      await AsyncStorage.setItem(STORAGE_KEY, next);
      await i18n.changeLanguage(next);
      setLanguageState(next);
      const shouldBeRTL = RTL_LANGUAGES.includes(next);
      if (I18nManager.isRTL !== shouldBeRTL) {
        I18nManager.allowRTL(shouldBeRTL);
        I18nManager.forceRTL(shouldBeRTL);
        setRestartRecommended(true);
      } else {
        setRestartRecommended(false);
      }
    },
    [i18n],
  );

  return { language, setLanguage, restartRecommended, languages: SUPPORTED_LANGUAGES };
}
