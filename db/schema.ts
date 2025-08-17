import { sqliteTable, text } from "drizzle-orm/sqlite-core"

export const redirects = sqliteTable("redirects", {
  slug: text().unique().primaryKey(),
  destination: text().notNull(),
})
