// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: "icon", type: "image/webp", href: "/favicon.webp" }],
    },
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@sentry/nuxt/module",
  ],

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    viewTransition: true,
    componentIslands: true,
    lazyHydration: true,
  },

  fonts: {
    defaults: {
      weights: [400],
      styles: ["normal", "italic"],
      subsets: ["latin-ext", "latin"],
    },
    families: [
      { name: "Sixtyfour Convergence", provider: "google" },
      { name: "Sono", provider: "google" },
      { name: "Victor Mono", provider: "google" },
    ],
    assets: {
      prefix: "/_fonts/",
    },
  },

  sourcemap: {
    server: true,
    client: "hidden",
  },

  sentry: {
    sourceMapsUploadOptions: {
      org: "daveio",
      project: "rebuild-dave-io",
    },

    autoInjectServerSentry: "top-level-import",
  },
});