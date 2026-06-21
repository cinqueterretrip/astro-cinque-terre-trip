import { LOCALES, getLocalePath, type Locale } from "@/lib/i18n/config";
import { ROUTE_MAP } from "@/lib/i18n/routes";

type RouteKey = keyof typeof ROUTE_MAP;

type TranslationEntry = {
  language?: Locale;
  slug?: string;
};

type TranslatableEntry = {
  slug: string;
  translations?: TranslationEntry[] | null;
};

export function buildAlternateLocalePaths(
  routeKey: RouteKey,
  entry: TranslatableEntry,
  currentLocale: Locale,
): Partial<Record<Locale, string>> {
  const slugsByLocale: Partial<Record<Locale, string>> = {
    [currentLocale]: entry.slug,
  };

  for (const translation of entry.translations ?? []) {
    if (!translation?.language || !translation?.slug) continue;
    slugsByLocale[translation.language] = translation.slug;
  }

  const alternatePaths: Partial<Record<Locale, string>> = {};

  for (const locale of LOCALES) {
    const segment = ROUTE_MAP[routeKey][locale];
    const translatedSlug = slugsByLocale[locale];

    alternatePaths[locale] = translatedSlug
      ? getLocalePath(
          locale,
          `/${segment}/${encodeURIComponent(translatedSlug)}`,
        )
      : getLocalePath(locale, `/${segment}`);
  }

  return alternatePaths;
}
