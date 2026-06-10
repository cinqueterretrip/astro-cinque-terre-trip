import { ROUTE_MAP } from "./routes";

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

  // Costruisce la mappa inversa dai segmenti di tutte le lingue verso targetLocale
  const segmentMap: Record<string, string> = {};
  for (const variants of Object.values(ROUTE_MAP)) {
    const toSegment = variants[targetLocale];
    for (const fromSegment of Object.values(variants)) {
      segmentMap[fromSegment] = toSegment;
    }
  }

  const translated = stripped
    .split("/")
    .map((seg) => segmentMap[seg] ?? seg)
    .join("/");

  return getLocalePath(targetLocale, translated || "/");
}
