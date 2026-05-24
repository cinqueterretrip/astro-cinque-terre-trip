import { sanityClient } from "sanity:client";

import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Base comune
 */
function base(img: SanityImageSource) {
  return urlFor(img).auto("format").fit("crop");
}

/**
 * Helper srcset
 */
function buildSrcSet(
  img: SanityImageSource,
  sizes: number[],
  preset: (img: SanityImageSource, size: number) => string,
) {
  return sizes.map((size) => `${preset(img, size)} ${size}w`).join(", ");
}

/**
 * HERO IMAGE
 */
export function heroImage(img: SanityImageSource) {
  return {
    src: base(img).width(1600).height(900).url(),

    srcSet: buildSrcSet(img, [800, 1200, 1600, 2000], (i, s) =>
      base(i)
        .width(s)
        .height(Math.round(s * 0.5625))
        .url(),
    ),

    sizes: "100vw",
  };
}

/**
 * CARD IMAGE
 */
export function cardImage(img: SanityImageSource) {
  return {
    src: base(img).width(800).height(600).url(),

    srcSet: buildSrcSet(img, [400, 600, 800], (i, s) =>
      base(i).width(s).height(600).url(),
    ),

    sizes: "(max-width: 768px) 100vw, 33vw",
  };
}

/**
 * THUMBNAIL
 */
export function thumbImage(img: SanityImageSource) {
  return {
    src: base(img).width(300).height(300).url(),

    srcSet: buildSrcSet(img, [150, 300, 450], (i, s) =>
      base(i).width(s).height(s).url(),
    ),

    sizes: "150px",
  };
}
