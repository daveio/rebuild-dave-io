import { ok } from "../utils/response"
import { getDB } from "../utils/d1"
import { sqliteTable, text } from "drizzle-orm/sqlite-core"
import type { H3Event } from "h3"

const redirects = sqliteTable("redirects", {
  slug: text("slug").primaryKey(),
  destination: text("destination").notNull(),
})

function testDB(event: H3Event): Promise<unknown> {
  return getDB(event).select().from(redirects).all()
}

export default defineEventHandler(async (event) => {
  return ok(event, {
    message: "pong",
    queryResult: testDB(event),
  })
})
