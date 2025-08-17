/// <reference types="../../worker-configuration" />

import type { H3Event } from "h3"
import { drizzle } from "drizzle-orm/d1"

export function getEnv(event: H3Event) {
  return (event.context.cloudflare?.env || {}) as Env
}

export function getDB(event: H3Event) {
  return drizzle(getEnv(event).DB)
}
