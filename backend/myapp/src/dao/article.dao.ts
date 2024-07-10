import {articles} from "../db/schema";
import {asc, count, desc, eq, like, sql} from "drizzle-orm";
import {config} from "../config";
import {getBallVisionDb} from "../db";

//對應表的所有sql操作



export class ArticleDao {
    async getArticleList() {
        const response: any = {};

        const { ballVisionDb } = getBallVisionDb({
            dbName: config.env.DATABASE_URL,
            authToken: config.env.DATABASE_AUTH_TOKEN!,
        });

        response.list = await ballVisionDb.select().from(articles)
        response.totalElement = await ballVisionDb.select({ count: count() }).from(articles).orderBy(desc(articles.createTime))
        return response
    }
    async getSingleArticle(id: number) {
        const response: any = {};
        const { ballVisionDb } = getBallVisionDb({
            dbName: config.env.DATABASE_URL,
            authToken: config.env.DATABASE_AUTH_TOKEN!,
        });
        response.list = await ballVisionDb.select().from(articles).where(eq(articles.id, id))
        return response
    }
    async getHottestArticle() {
        const response: any = {};
        const { ballVisionDb } = getBallVisionDb({
            dbName: config.env.DATABASE_URL,
            authToken: config.env.DATABASE_AUTH_TOKEN!,
        });
        response.list = await ballVisionDb.select().from(articles).orderBy(desc(articles.views))
        return response
    }
    async addArticle(params: AddArticle) {
        const { title, intro, avatar, content, category } = params;
        // await db.insert(articleDetail).values({
        //     title,
        //     intro,
        //     avatar,
        //     content,
        //     category,
        //     views: 0,
        // });

        const { ballVisionDb } = getBallVisionDb({
            dbName: config.env.DATABASE_URL,
            authToken: config.env.DATABASE_AUTH_TOKEN!,
        });


        const [article] = await ballVisionDb
            .insert(articles)
            .values({
                title,
                intro,
                avatar,
                content,
                category,
                views: 0,
            })
            .returning();

        console.log(article,'article')
    }
    async updateArticleView(id: number) {
        const { ballVisionDb } = getBallVisionDb({
            dbName: config.env.DATABASE_URL,
            authToken: config.env.DATABASE_AUTH_TOKEN!,
        });

        await ballVisionDb.update(articles).set({views: sql`${articles.views} + 1`,}).where(eq(articles.id, id))
    }
}