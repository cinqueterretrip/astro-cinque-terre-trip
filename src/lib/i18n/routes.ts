import type { Locale } from "@/lib/i18n/config";
// lib/i18n/routes.ts  — unica fonte di verità
export const ROUTE_MAP: Record<string, Record<Locale, string>> = {
  villages: {
    it: "borghi",
    en: "villages",
  },
  hiking: {
    it: "escursioni",
    en: "hikings",
  },
  tips: {
    it: "consigli",
    en: "tips",
  },
  beaches: {
    it: "spiagge",
    en: "beaches",
  },
  apartments: {
    it: "appartamenti",
    en: "apartments",
  },
};
