import { sanityClient } from "sanity:client";
import type { Locale } from "@/lib/i18n/config";

export async function fetchHikingCards(lang: Locale) {
  return sanityClient.fetch(
    `*[_type == "hiking" && language == $lang] | order(coalesce(order, 9999) asc, _createdAt asc) {
      _id,
      title,
      articleType,
      tagline,
      "slug": slug.current,
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

export async function fetchHikingCardsHome(lang: Locale) {
  return sanityClient.fetch(
    `*[_type == "hiking" && language == $lang] | order(coalesce(order, 9999) asc, _createdAt asc) [0...6] {
      _id,
      title,
      articleType,
      tagline,
      "slug": slug.current,
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

// L'ordinamento e' stabile: prima per `order`, poi per `_createdAt`.
export async function fetchHikings(lang: Locale) {
  return sanityClient.fetch(
    `*[_type == "hiking" && language == $lang] | order(coalesce(order, 9999) asc, _createdAt asc) {
      _id,
      language,
      title,
      articleType,
      "slug": slug.current,
      "translations": *[_type == "translation.metadata" && references(^._id)][0].translations[].value->{
        language,
        "slug": slug.current
      },
      text,
      localTips,
      "likesCount": coalesce(likesCount, 0),
      asideHint {
        title,
        text
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
      seo
    }`,
    { lang },
  );
}
