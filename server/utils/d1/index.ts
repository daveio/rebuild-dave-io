/// <reference types="../../../worker-configuration" />
import { drizzle } from "drizzle-orm/d1"
import type { H3Event } from "h3"

export function queryRedirect(env: Env, slug: string) {
  const stmt = env.DB.prepare("SELECT * FROM redirects WHERE slug = ?")
  return stmt.bind(slug).first()
}

export function getDB(event: H3Event) {
  return drizzle(event.context.cloudflare.env.DB)
}
