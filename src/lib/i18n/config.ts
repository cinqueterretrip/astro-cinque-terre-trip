export const LOCALES = ["it", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "it";

export const LOCALE_LABELS: Record<Locale, string> = {
  it: "Italiano",
  en: "English",
};

// Costruisce un path con prefisso lingua corretto
// IT: /villages  →  EN: /en/villages
export function getLocalePath(locale: Locale, path: string): string {
  return locale === DEFAULT_LOCALE ? path : `/${locale}${path}`;
}

// Dato l'URL corrente e una locale target, restituisce l'URL nella nuova lingua
// Usato dal menu cambio lingua
export function switchLocalePath(
  currentPath: string,
  targetLocale: Locale,
): string {
  // Rimuove il prefisso /en se presente
  const stripped = currentPath.replace(/^\/en(\/|$)/, "/");
  return getLocalePath(targetLocale, stripped || "/");
}
