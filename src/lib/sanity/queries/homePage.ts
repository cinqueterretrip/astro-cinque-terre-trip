import { sanityClient } from "sanity:client";
import type { Locale } from "../../i18n/config";

// Il documento singleton ha _id fisso: "homePage-it" o "homePage-en"
// Più efficiente di filtrare per language: evita una collection scan
export async function fetchHomePage(lang: Locale) {
  return sanityClient.fetch(
    `*[_id == $id][0]{
      hero {
        eyebrow,
        title,
        text,
        backgroundImage {
          alt,
          asset-> {
            _id,
            url,
            metadata {
              dimensions { width, height },
              lqip
            }
          }
        }
      },
      seo
    }`,
    { id: `homePage-${lang}` },
  );
}
