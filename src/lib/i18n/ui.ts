import type { Locale } from "./config";

const ui = {
  it: {
    "hero.cta": "Esplora i Villaggi",
    "hero.readBlog": "Leggi il Blog",
    "villages.cta": "Scopri",
    "footer.tagline":
      "La tua guida definitiva per esplorare i cinque villaggi della Riviera Italiana.",
  },
  en: {
    "hero.cta": "Explore the Villages",
    "hero.readBlog": "Read the Blog",
    "villages.cta": "Explore",
    "footer.tagline":
      "Your ultimate guide to exploring the five villages of the Italian Riviera.",
  },
} as const;

export type UIKey = keyof typeof ui.it;

export function t(locale: Locale, key: UIKey): string {
  return ui[locale][key] ?? ui.en[key] ?? key;
}
