import type { Locale } from "./config";

const ui = {
  it: {
    "hero.cta": "Esplora i Villaggi",
    "hero.readBlog": "Leggi il Blog",
    "home.hikingSectionTitle": "Le migliori escursioni",
    "villages.cta": "Scopri",
    "villages.overview": "Panoramica",
    "villages.quickFacts": "Info rapide",
    "villages.population": "Popolazione",
    "villages.bestKnown": "Famoso per",
    "villages.connection": "Collegamenti",
    "villages.gastronomy": "Gastronomia",
    "villages.car": "Macchina",
    "villages.bus": "Bus",
    "villages.train-station": "Treno",
    "villages.boat": "Barca",
    "article.read": "di lettura",
    "article.inThisArticle": "In questo articolo",
    "article.localTip": "Consiglio dell'Esperto",
    "share.buttonLabel": "Condividi articolo",
    "share.articleText": "Leggi questo articolo",
    "share.copied": "Link copiato negli appunti",
    "share.copyError": "Impossibile copiare il link",
    "footer.tagline":
      "La tua guida definitiva per esplorare i cinque villaggi della Riviera Italiana.",
  },
  en: {
    "hero.cta": "Explore the Villages",
    "hero.readBlog": "Read the Blog",
    "home.hikingSectionTitle": "The Best Hikes",
    "villages.cta": "Explore",
    "villages.overview": "Overview",
    "villages.quickFacts": "Quick Facts",
    "villages.population": "Population",
    "villages.bestKnown": "Best Known For",
    "villages.connection": "Connections",
    "villages.gastronomy": "Gastronomy",
    "villages.train-station": "Train",
    "villages.boat": "Boat",
    "villages.bus": "Bus",
    "villages.car": "Car",
    "article.read": "read",
    "article.inThisArticle": "In this article",
    "article.localTip": "Local Tip",
    "share.buttonLabel": "Share article",
    "share.articleText": "Read this article",
    "share.copied": "Link copied to clipboard",
    "share.copyError": "Unable to copy link",
    "footer.tagline":
      "Your ultimate guide to exploring the five villages of the Italian Riviera.",
  },
} as const;

export type UIKey = keyof typeof ui.it;

export function t(locale: Locale, key: UIKey): string {
  return ui[locale][key] ?? ui.en[key] ?? key;
}
