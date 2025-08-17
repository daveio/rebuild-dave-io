import { ok } from "../utils/response"
import { getDB } from "../utils/cloudflare"
import { redirects } from "../db/schema"

export default defineEventHandler(async (event) => {
  const db = getDB(event)
  return ok(event, {
    message: "pong!",
    redirects: await db.select().from(redirects),
  })
})
