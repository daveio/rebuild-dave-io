import { ok } from "../utils/response"
import type { D1Database } from "@cloudflare/workers-types"
// import { getDB } from "../utils/d1"
// import { sqliteTable, text } from "drizzle-orm/sqlite-core"
// import type { H3Event } from "h3"

// const redirects = sqliteTable("redirects", {
//   slug: text("slug").primaryKey(),
//   destination: text("destination").notNull(),
// })

// function testDB(event: H3Event): Promise<unknown> {
//   return getDB(event).select().from(redirects).all()
// }

export default defineEventHandler(async (event) => {
  const db = event.context.cloudflare.env.DB as D1Database
  const stmt = db.prepare("SELECT * FROM redirects")
  const res = await stmt.bind().all()
  return ok(event, {
    message: "pong",
    // queryResult: testDB(event),
    queryResult: res,
  })
})
