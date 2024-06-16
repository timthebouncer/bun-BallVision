import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import {sql} from "drizzle-orm";

export const videos = sqliteTable("video", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    videoUrl: text("videoUrl").notNull(),
    intro: text("intro").notNull(),
    createTime: text('createTime').notNull().default(sql`current_timestamp`),
    title: text('title').notNull(),
    category: text('category').notNull(),
    clickCount: integer('clickCount')
});

export const contact = sqliteTable("contact", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    emailOrPhone: text("emailOrPhone").notNull(),
    request: text("request"),
});