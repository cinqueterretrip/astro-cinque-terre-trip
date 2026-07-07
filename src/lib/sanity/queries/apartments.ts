import { sanityClient } from "sanity:client";
import type { Locale } from "@/lib/i18n/config";

export async function fetchApartmentsCards(lang: Locale) {
  return sanityClient.fetch(
    `*[_type == "apartments" && language == $lang] | order(coalesce(order, 9999) asc, _createdAt asc) {
      _id,
      rating,
      title,
      accommodationVillage,
      text,
      linkBooking,
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
