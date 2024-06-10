import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const videos = sqliteTable("video", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    videoUrl: text("videoUrl").notNull(),
    intro: text("intro").notNull(),
    // done: integer("done").default(0).notNull(),
});