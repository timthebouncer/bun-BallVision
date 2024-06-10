import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import {todos} from "./schema";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { eq } from 'drizzle-orm';

export class todosDatabase {

    db: any;

    constructor() {
        // Initialize the database
        this.init()
            .then(() => console.log('Database initialized'))
            .catch(console.error);
    }

    // Get TodoList
    async getTodoList() {
        return this.db.select().from(todos);
    }

    // Add a todo
    async addTodo(text: String | Number) {
        const aaa = await this.db.insert(todos).values({ text: text })
    }

    // Update a todo
    async toggleTodo(id: Number, done: Number) {
        return this.db.update(todos)
        .set({done: done})
        .where(eq(todos.id, id))
    }

    // Delete a todo
    async deleteTodo(id: number) {
        await this.db.delete(todos).where(eq(todos.id, id))
    }


    // Initialize the database
    async init() {
        const sqlite = new Database("sqlite.db");
        this.db = drizzle(sqlite);
        await migrate(this.db, { migrationsFolder: "./drizzle" });
        return true
    }
}