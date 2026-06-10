import type { Locale } from "./config";
// lib/i18n/routes.ts  — unica fonte di verità
export const ROUTE_MAP: Record<string, Record<Locale, string>> = {
  villages: {
    it: "borghi",
    en: "villages",
  },
  // domani aggiungi una sezione:
  // experiences: { it: "esperienze", en: "experiences" },
};
