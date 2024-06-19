import {videos} from "../schema";
import {asc, desc, eq, like} from "drizzle-orm";
import {db} from "../constants";

//對應表的所有sql操作

type UploadVideoText = {
    title: string
    intro: string
    videoUrl: string
}

type UpdateVideo = {
    id: string
    videoUrl: string
}

type Keyword = {
    keyword: string;
    pageSize: number
    currentPage: number
}

export class VideoDao {

    // Get TodoList
    async getVideoList(text: Keyword) {
        console.log(text,'text')
        // if(text){
        //     return db.select().from(videos).where(like(videos.title, `%${text}%`)).orderBy(desc(videos.createTime))
        // } else {
        //     return db.select().from(videos).limit(10).orderBy(desc(videos.createTime))
        // }
    }

    // Add a todo
    async addVideo(params: UploadVideoText) {
        await db.insert(videos).values({ ...params })
    }

    // Update a todo
    async updateVideo({id, videoUrl}: UpdateVideo) {
        return db.update(videos)
            .set({videoUrl})
            .where(eq(videos.id, id))
    }

    // Delete a todo
    async deleteTodo(id: number) {
        await db.delete(videos).where(eq(videos.id, id))
    }
}