import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import {sql} from "drizzle-orm";

export const videos = sqliteTable("video", {
    id: integer("id").notNull().primaryKey({ autoIncrement: true }),
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

export const articles = sqliteTable("article", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    intro: text("intro").notNull(),
    avatar: text("avatar").notNull(),
    views: integer("views"),
    content: text('content',{ mode: 'json' }).notNull().$type<string[]>().default(sql`'[]'`),
    createTime: text('createTime').notNull().default(sql`current_timestamp`),
});