import { sanityClient } from "sanity:client";
import type { Locale } from "../../i18n/config";

// Query leggera per le card in home: payload minimo e ordinamento stabile.
export async function fetchVillageCards(lang: Locale) {
  return sanityClient.fetch(
    `*[_type == "village" && language == $lang] | order(coalesce(order, 9999) asc, _createdAt asc) {
      _id,
      title,
      tagline,
      slug,
      heroImage {
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
    }`,
    { lang },
  );
}

// Filtra per _type + language (campi indicizzati in Sanity) e proietta solo i campi utili.
// L'ordinamento e' stabile: prima per `order`, poi per `_createdAt`.
export async function fetchVillages(lang: Locale) {
  return sanityClient.fetch(
    `*[_type == "village" && language == $lang] | order(coalesce(order, 9999) asc, _createdAt asc) {
      _id,
      language,
      title,
      subtitle,
      slug,
      tagline,
      text,
      quickFacts {
        population,
        bestKnown,
        connections
      },
      foodSpeciality {
        title,
        text,
        image {
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
      heroImage {
        alt,
        asset-> {
          _id,
          url,
          metadata {
            dimensions { width, height },
            lqip
          }
        }
      },
      order,
      seo
    }`,
    { lang },
  );
}
