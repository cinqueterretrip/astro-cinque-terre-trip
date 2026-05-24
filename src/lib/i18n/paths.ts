// lib/i18n/paths.ts
import { LOCALES, DEFAULT_LOCALE, type Locale } from "./config";

export function getLocalePaths() {
  return LOCALES.filter((l) => l !== DEFAULT_LOCALE).map((lang) => ({
    params: { lang },
  }));
}
