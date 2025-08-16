/// <reference types="../../../worker-configuration" />

import type { H3Event } from "h3"

export function getCloudflareEnv(event: H3Event) {
  return (event.context.cloudflare?.env || {}) as Env
}
