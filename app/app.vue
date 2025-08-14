<template>
  <div data-theme="mocha" class="mocha">
    <Analytics />
    <SpeedInsights />
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { Analytics } from "@vercel/analytics/nuxt"
import { SpeedInsights } from "@vercel/speed-insights/nuxt"

declare global {
  interface Window {
    SentryToolbar?: {
      init(config: { organizationSlug: string; projectIdOrSlug: string }): void
    }
  }
}

useScript("https://browser.sentry-cdn.com/sentry-toolbar/latest/toolbar.min.js", {
  use() {
    if (window.SentryToolbar) {
      window.SentryToolbar.init({
        organizationSlug: "daveio",
        projectIdOrSlug: "rebuild-dave-io"
      })
    }
    return null
  }
})

// Set default color mode preference
const colorMode = useColorMode()
if (import.meta.client) {
  colorMode.preference = "dark"
}
</script>
