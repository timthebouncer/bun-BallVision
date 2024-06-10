import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import {videos} from "./schema";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { eq } from 'drizzle-orm';

type UploadVideoText = {
    title: string
    intro: string
    videoUrl: string
  }

export class videosDatabase {

    db: any;

    constructor() {
        // Initialize the database
        this.init()
            .then(() => console.log('Database initialized'))
            .catch(console.error);
    }

    // Get TodoList
    async getVideoList() {
        return this.db.select().from(videos);
    }

    // Add a todo
    async addVideo(params: UploadVideoText) {
        const aaa = await this.db.insert(videos).values({ ...params })
    }

    // Update a todo
    async toggleTodo(id: Number, done: Number) {
        return this.db.update(videos)
        .set({done: done})
        .where(eq(videos.id, id))
    }

    // Delete a todo
    async deleteTodo(id: number) {
        await this.db.delete(videos).where(eq(videos.id, id))
    }


    // Initialize the database
    async init() {
        const sqlite = new Database("sqlite.db");
        this.db = drizzle(sqlite);
        await migrate(this.db, { migrationsFolder: "./drizzle" });
        return true
    }
}