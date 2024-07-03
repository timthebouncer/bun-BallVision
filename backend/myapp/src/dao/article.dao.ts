import {articles} from "../schema";
import {asc, count, desc, eq, like, sql} from "drizzle-orm";
import {db} from "../constants";

//對應表的所有sql操作


type AddArticle = {
    title: string
    intro: string
    avatar: string
    content: string
}

export class ArticleDao {
    async getArticleList() {
        const response = {}
        response.list = await db.select().from(articles)
        response.totalElement = await db.select({ count: count() }).from(articles).orderBy(desc(articles.createTime))
        return response
    }
    async getSingleArticle(id) {
        const response = {}
        response.list = await db.select().from(articles).where(eq(articles.id, id))
        return response
    }
    async getHottestArticle() {
        const response = {}
        response.list = await db.select().from(articles).orderBy(desc(articles.views))
        return response
    }
    async addArticle(params: AddArticle) {
        await db.insert(articles).values({ ...params, views: 0 })
    }
    async updateArticleView({id}: string) {
        await db.update(articles).set({views: sql`${articles.views} + 1`,}).where(eq(articles.id, id))
    }
}