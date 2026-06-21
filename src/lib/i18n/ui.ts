import type { Locale } from "@/lib/i18n/config";

const ui = {
  it: {
    "hero.cta": "Esplora i Villaggi",
    "hero.readBlog": "Leggi il Blog",
    "home.hikingSectionTitle": "Le migliori escursioni",
    "hikings.pageTitle": "Escursioni alle Cinque Terre: guide e itinerari",
    "hikings.pageDescription":
      "Scopri tutte le escursioni alle Cinque Terre: itinerari panoramici, consigli pratici e guide complete per organizzare il tuo viaggio tra sentieri, borghi e mare.",
    "hikings.eyebrow": "Diario di viaggio",
    "hikings.heading": "Escursioni e itinerari autentici nelle Cinque Terre",
    "hikings.intro":
      "Dalle passeggiate vista mare ai percorsi piu panoramici, trovi qui guide curate, consigli locali e idee pratiche per vivere la Riviera Ligure con il ritmo giusto.",
    "hikings.latestSectionTitle": "Ultime escursioni",
    "hikings.fallbackTagline":
      "Scopri l'itinerario completo con consigli pratici e spunti locali per vivere al meglio le Cinque Terre.",
    "hikings.readArticle": "Leggi l'articolo",
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
    "hikings.pageTitle": "Cinque Terre Hikes: Guides and Itineraries",
    "hikings.pageDescription":
      "Discover all Cinque Terre hikes: scenic itineraries, practical tips, and complete guides to plan your trip across trails, villages, and sea views.",
    "hikings.eyebrow": "Travel journal",
    "hikings.heading": "Authentic hikes and itineraries in Cinque Terre",
    "hikings.intro":
      "From coastal walks to the most panoramic trails, find curated guides, local tips, and practical ideas to enjoy the Italian Riviera at the right pace.",
    "hikings.latestSectionTitle": "Latest hikes",
    "hikings.fallbackTagline":
      "Discover the full itinerary with practical tips and local insights to experience Cinque Terre at its best.",
    "hikings.readArticle": "Read article",
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
