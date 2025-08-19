import { getDB } from "../../utils/cloudflare"
import { redirects } from "../../db/schema"
import { eq } from "drizzle-orm"
import { defineEventHandler, getRouterParam, sendRedirect } from "h3"
import { error } from "~~/server/utils/response"

export default defineEventHandler(async (event) => {
  const db = getDB(event)
  const slug = getRouterParam(event, "slug")
  if (!slug || slug.length === 0) {
    return error(event, {}, "Slug is required", 400)
  }
  const redirect = await db.select().from(redirects).where(eq(redirects.slug, slug)).limit(1)
  if (!redirect || redirect.length === 0) {
    return error(event, {}, "Redirect not found", 404)
  }
  await sendRedirect(event, redirect[0].destination, 302)
})
