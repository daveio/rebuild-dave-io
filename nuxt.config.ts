// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite"

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
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  eslint: {
    checker: true,
  },
  experimental: {
    componentIslands: true,
    inlineRouteRules: true,
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
    "@pinia/nuxt",
    "@sentry/nuxt/module",
    "magic-regexp/nuxt",
    "@nuxtjs/device",
    "nuxt-security",
    "nuxt-link-checker",
    "nuxt-graphql-client",
    "@nuxtjs/turnstile",
  ],
  security: {
    ssg: {
      hashScripts: true,
      hashStyles: true,
      meta: true,
    },
    sri: true,
  },
  sentry: {
    autoInjectServerSentry: "experimental_dynamic-import",
    sourceMapsUploadOptions: {
      org: "daveio",
      project: "rebuild-dave-io",
    },
  },
  site: {
    url: "https://rebuild.dave.io",
    name: "Rebuild of dave.io",
  },
  sourcemap: {
    client: "hidden",
    server: true,
  },
  turnstile: {
    siteKey: "0x4AAAAAABraTjA80I4Pmf1K",
    addValidateEndpoint: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
