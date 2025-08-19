import { getDB } from "../../../server/utils/cloudflare"
import { redirects } from "../../../server/db/schema"
import { eq } from "drizzle-orm"
import { defineEventHandler, getRouterParam, sendRedirect } from "h3"
import { error } from "../../../server/utils/response"

export default defineEventHandler(async (event) => {
  const db = getDB(event)
  const slug = getRouterParam(event, "slug")
  if (!slug) {
    return error(event, {}, "Slug is required", 400)
  }
  const redirect = await db.select().from(redirects).where(eq(redirects.slug, slug)).limit(1)
  if (redirect.length === 0) {
    return error(event, {}, "Redirect not found", 404)
  }
  console.log(`Redirecting to ${redirect[0].destination}`)
  await sendRedirect(event, redirect[0].destination, 302)
})
