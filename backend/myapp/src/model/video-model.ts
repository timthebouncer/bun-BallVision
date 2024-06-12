import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const videos = sqliteTable("video", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    videoUrl: text("videoUrl").notNull(),
    intro: text("intro").notNull(),
    createTime: text('createTime').notNull().default(sql`CURRENT_TIMESTAMP`),
});