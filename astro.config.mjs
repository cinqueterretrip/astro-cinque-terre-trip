// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import sanity from "@sanity/astro";
import vercel from "@astrojs/vercel";
import { loadEnv } from "vite";

const { SANITY_STUDIO_PROJECT_ID } = loadEnv(
  process.env.NODE_ENV ?? "development",
  process.cwd(),
  "",
);

// https://astro.build/config
export default defineConfig({
  site: "https://www.cinqueterretrip.info",
  output: "static",
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      name: "Playfair Display",
      provider: fontProviders.fontsource(),
      cssVariable: "--font-playfair-display",
      styles: ["normal"],
      weights: ["400 700"],
      subsets: ["latin"],
    },
    {
      name: "DM Sans",
      provider: fontProviders.fontsource(),
      cssVariable: "--font-dm-sans",
      styles: ["normal"],
      weights: ["400 600"],
      subsets: ["latin"],
    },
  ],
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "it",
        locales: {
          it: "it-IT",
          en: "en-US",
        },
      },
    }),
    sanity({
      projectId: SANITY_STUDIO_PROJECT_ID,
      dataset: "production",
      useCdn: false, // for static builds
    }),
  ],
  i18n: {
    defaultLocale: "it",
    locales: ["it", "en"],
    routing: {
      prefixDefaultLocale: false, // Italian at /, English at /en/
    },
  },
});
