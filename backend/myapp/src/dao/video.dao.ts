import {videos} from "../model/video-model";
import {eq} from "drizzle-orm";
import {db} from "../constants";

//對應表的所有sql操作

type UploadVideoText = {
    title: string
    intro: string
    videoUrl: string
}

export class VideoDao {

    // Get TodoList
    async getVideoList() {
        return db.select().from(videos);
    }

    // Add a todo
    async addVideo(params: UploadVideoText) {
        await db.insert(videos).values({ ...params })
    }

    // Update a todo
    async toggleTodo(id: Number, done: Number) {
        return db.update(videos)
            .set({done: done})
            .where(eq(videos.id, id))
    }

    // Delete a todo
    async deleteTodo(id: number) {
        await db.delete(videos).where(eq(videos.id, id))
    }
}