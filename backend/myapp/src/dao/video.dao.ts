import {videos} from "../db/schema";
import {asc, count, desc, eq, like} from "drizzle-orm";
import {db} from "../constants";
import {getBallVisionDb} from "../db";
import {config} from "../config";

//對應表的所有sql操作


export class VideoDao {

    // Get TodoList
    async getVideoList(query: Keyword) {
        const { keyword, pageSize = 10, pageNumber = 1 } = query

        const response: any = {};

        const { ballVisionDb } = getBallVisionDb({
            dbName: config.env.DATABASE_URL,
            authToken: config.env.DATABASE_AUTH_TOKEN!,
        });

        if(keyword){
            response.list = await ballVisionDb.select().from(videos).where(like(videos.title, `%${keyword}%`)).orderBy(desc(videos.createTime))
            const totalElement =
                await ballVisionDb.select({ count: count() })
                    .from(videos)
                    .where(like(videos.title, `%${keyword}%`))
                    .orderBy(desc(videos.createTime))
            response.totalElement = totalElement[0].count

        } else {
            response.list = await ballVisionDb.select().from(videos).limit(pageSize).offset((pageNumber - 1) * pageSize).orderBy(desc(videos.createTime))
            const totalElement = await ballVisionDb.select({ count: count() }).from(videos)
            response.totalElement = totalElement[0].count
        }

        return response
    }

    // Add a todo
    async addVideo(params: UploadVideoText) {
        const { ballVisionDb } = getBallVisionDb({
            dbName: config.env.DATABASE_URL,
            authToken: config.env.DATABASE_AUTH_TOKEN!,
        });
        await ballVisionDb.insert(videos).values({ ...params })
    }

    // Update a todo
    async updateVideo({id, videoUrl}: UpdateVideo) {
        const { ballVisionDb } = getBallVisionDb({
            dbName: config.env.DATABASE_URL,
            authToken: config.env.DATABASE_AUTH_TOKEN!,
        });
        return ballVisionDb.update(videos)
            .set({videoUrl})
            .where(eq(videos.id, id))
    }

    // Delete a todo
    async deleteTodo(id: number) {
        await db.delete(videos).where(eq(videos.id, id))
    }
}