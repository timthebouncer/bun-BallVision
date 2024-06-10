import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todo", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    text: text("text").notNull(),
    done: integer("done").default(0).notNull(),
});