// https://nuxt.com/docs/api/configuration/nuxt-config

declare global {
  interface Window {
    SentryToolbar?: {
      init(config: { organizationSlug: string; projectIdOrSlug: string }): void
    }
  }
}

export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: "icon", type: "image/webp", href: "/favicon.webp" }],
    },
  },
  compatibilityDate: "2025-08-13",
  devtools: { enabled: true },
  eslint: {
    checker: true,
  },
  experimental: {
    componentIslands: true,
    lazyHydration: true,
    viewTransition: true,
  },
  fonts: {
    assets: {
      prefix: "/_fonts/",
    },
    families: [
      { name: "Sixtyfour Convergence", provider: "bunny" },
      { name: "Sono", provider: "bunny" },
      { name: "Victor Mono", provider: "bunny" },
    ],
    defaults: {
      styles: ["normal", "italic"],
      subsets: ["latin-ext", "latin"],
      weights: [400],
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    "@formkit/auto-animate/nuxt",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@sentry/nuxt/module",
    "magic-regexp/nuxt",
  ],
  sentry: {
    autoInjectServerSentry: "experimental_dynamic-import",
    sourceMapsUploadOptions: {
      org: "daveio",
      project: "rebuild-dave-io",
    },
  },
  sourcemap: {
    client: "hidden",
    server: true,
  },
})
