import {articles, videos} from "../db/schema";
import {asc, count, desc, eq, like, sql} from "drizzle-orm";
import {config} from "../config";
import {getBallVisionDb} from "../db";
import {deleteArticle} from "../service";

//對應表的所有sql操作



export class ArticleDao {
    async getArticleList(query: ArticleSearch) {
        const { category, pageSize = 10, pageNumber = 1 } = query

        const response: any = {};

        const { ballVisionDb } = getBallVisionDb({
            dbName: config.env.DATABASE_URL,
            authToken: config.env.DATABASE_AUTH_TOKEN!,
        });
        if(category){
            response.list = await ballVisionDb.select().from(articles).where(like(articles.category, `%${category}%`)).orderBy(desc(articles.createTime))
            const totalElement =
                await ballVisionDb.select({ count: count() })
                    .from(articles)
                    .where(like(articles.title, `%${category}%`))
                    .orderBy(desc(articles.createTime))
            response.totalElement = totalElement[0].count
        } else {
            response.list = await ballVisionDb.select().from(articles).limit(pageSize).offset((pageNumber - 1) * pageSize)
            response.totalElement = await ballVisionDb.select({ count: count() }).from(articles).orderBy(desc(articles.createTime))
        }
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

   async deleteArticle(id: number) {
        const { ballVisionDb } = getBallVisionDb({
            dbName: config.env.DATABASE_URL,
            authToken: config.env.DATABASE_AUTH_TOKEN!,
        });
        await ballVisionDb.delete(articles).where(eq(articles.id, id))
    }

    async updateArticleView(id: number) {
        const { ballVisionDb } = getBallVisionDb({
            dbName: config.env.DATABASE_URL,
            authToken: config.env.DATABASE_AUTH_TOKEN!,
        });

        await ballVisionDb.update(articles).set({views: sql`${articles.views} + 1`,}).where(eq(articles.id, id))
    }

    async updateArticle(params: UpdateArticleBody) {
        const { ballVisionDb } = getBallVisionDb({
            dbName: config.env.DATABASE_URL,
            authToken: config.env.DATABASE_AUTH_TOKEN!,
        });

        await ballVisionDb.update(articles).set({
            ...params
        }).where(eq(articles.id, params.id))
    }
}