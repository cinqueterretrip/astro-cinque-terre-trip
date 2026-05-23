import type { Locale } from './config';

const ui = {
  it: {
    'nav.villages': 'Villaggi',
    'nav.experiences': 'Esperienze',
    'nav.hiking': 'Escursioni',
    'nav.beaches': 'Spiagge',
    'nav.food': 'Cibo',
    'nav.tips': 'Consigli',
    'nav.planTrip': 'Pianifica il viaggio',
    'hero.eyebrow': 'Scopri la Riviera Italiana',
    'hero.cta': 'Esplora i Villaggi',
    'footer.tagline':
      'La tua guida definitiva per esplorare i cinque villaggi della Riviera Italiana.',
    // ...
  },
  en: {
    'nav.villages': 'Villages',
    'nav.experiences': 'Experiences',
    'nav.hiking': 'Hiking',
    'nav.beaches': 'Beaches',
    'nav.food': 'Food',
    'nav.tips': 'Tips',
    'nav.planTrip': 'Plan Your Trip',
    'hero.eyebrow': 'Discover the Italian Riviera',
    'hero.cta': 'Explore the Villages',
    'footer.tagline':
      'Your definitive guide to exploring the five villages of the Italian Riviera.',
    // ...
  },
} as const;

export type UIKey = keyof typeof ui.it;

export function t(locale: Locale, key: UIKey): string {
  return ui[locale][key] ?? ui.en[key] ?? key;
}
