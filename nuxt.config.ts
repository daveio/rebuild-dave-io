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
  colorMode: {
    preference: "dark",
    fallback: "dark",
    storageKey: "nuxt-color-mode",
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
    "@formkit/auto-animate/nuxt", // "@nuxt/content", // disabled for later
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxtjs/device",
    "@nuxtjs/seo",
    "@nuxtjs/turnstile",
    "@pinia/nuxt",
    "@sentry/nuxt/module",
    "magic-regexp/nuxt",
    "nuxt-link-checker",
    "nuxt-security",
    "@nuxtjs/color-mode",
  ],
  robots: {
    mergeWithRobotsTxtPath: "app/assets/robots.txt",
  },
  runtimeConfig: {
    // Server-side environment variables
    runtimeServerVar: true,
    public: {
      // Client-side environment variables
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || "/api",
    },
  },
  nitro: {
    experimental: {
      wasm: true,
    },
    routeRules: {
      "/api/**": {
        cors: true,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "X-XSS-Protection": "0",
        },
      },
      "/go/**": {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      },
      "/.well-known/nostr.json": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
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
    name: "Rebuild of dave.io",
    url: "https://rebuild.dave.io",
  },
  sourcemap: {
    client: "hidden",
    server: true,
  },
  turnstile: {
    addValidateEndpoint: true,
    siteKey: "0x4AAAAAABraTjA80I4Pmf1K",
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
