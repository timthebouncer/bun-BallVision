import {videos} from "../schema";
import {asc, count, desc, eq, like} from "drizzle-orm";
import {db} from "../constants";

//對應表的所有sql操作

type UploadVideoText = {
    title: string
    intro: string
    videoUrl: string
    category: string
}

type UpdateVideo = {
    id: number
    videoUrl: string
}

type Keyword = {
    keyword: string;
    pageSize?: number;
    pageNumber?: number;
}

export class VideoDao {

    // Get TodoList
    async getVideoList(query: Keyword) {
        const { keyword, pageSize = 10, pageNumber = 1 } = query

        const response: any = {};

        if(keyword){
            response.list = await db.select().from(videos).where(like(videos.title, `%${keyword}%`)).orderBy(desc(videos.createTime))
            const totalElement =
                await db.select({ count: count() })
                    .from(videos)
                    .where(like(videos.title, `%${keyword}%`))
                    .orderBy(desc(videos.createTime))
            response.totalElement = totalElement[0].count

        } else {
            response.list = await db.select().from(videos).limit(pageSize).offset((pageNumber - 1) * pageSize).orderBy(desc(videos.createTime))
            const totalElement = await db.select({ count: count() }).from(videos)
            response.totalElement = totalElement[0].count
        }

        return response
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