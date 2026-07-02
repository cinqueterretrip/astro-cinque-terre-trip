import { sanityClient } from "sanity:client";
import type { Locale } from "@/lib/i18n/config";

export async function fetchBeachesCards(lang: Locale) {
  return sanityClient.fetch(
    `*[_type == "beach" && language == $lang] | order(coalesce(order, 9999) asc, _createdAt asc) {
      _id,
      title,
      subtitle,
      text,
      posterImage {
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
