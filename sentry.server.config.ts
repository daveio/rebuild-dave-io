import * as Sentry from "@sentry/nuxt"

Sentry.init({
  dsn: "https://19712a83d2ff473f8f2d24b41aecc886@o374595.ingest.us.sentry.io/4509836115181568",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
})
