import type { Locale } from "./config";

const ui = {
  it: {
    "hero.cta": "Esplora i Villaggi",
    "hero.readBlog": "Leggi il Blog",
    "villages.cta": "Scopri",
    "villages.overview": "Panoramica",
    "villages.quickFacts": "Info rapide",
    "villages.population": "Popolazione",
    "villages.bestKnown": "Famoso per",
    "villages.connection": "Collegamenti",
    "villages.gastronomy": "Gastronomia",
    "villages.train-station": "Treno",
    "villages.boat": "Barca",
    "footer.tagline":
      "La tua guida definitiva per esplorare i cinque villaggi della Riviera Italiana.",
  },
  en: {
    "hero.cta": "Explore the Villages",
    "hero.readBlog": "Read the Blog",
    "villages.cta": "Explore",
    "villages.overview": "Overview",
    "villages.quickFacts": "Quick Facts",
    "villages.population": "Population",
    "villages.bestKnown": "Best Known For",
    "villages.connection": "Connections",
    "villages.gastronomy": "Gastronomy",
    "villages.train-station": "Train",
    "villages.boat": "Boat",
    "footer.tagline":
      "Your ultimate guide to exploring the five villages of the Italian Riviera.",
  },
} as const;

export type UIKey = keyof typeof ui.it;

export function t(locale: Locale, key: UIKey): string {
  return ui[locale][key] ?? ui.en[key] ?? key;
}
