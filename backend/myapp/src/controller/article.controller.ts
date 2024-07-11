// 網址路徑
// 傳遞的參數較驗
// 裡面就調用 service 去處理
// 返回直
import {app} from "../constants";
import {
    addArticle,
    deleteArticle,
    getArticleList,
    getHottestArticle,
    getSingleArticle, updateArticle,
    updateArticleView
} from "../service";
import {t} from "elysia";


app.get('/api/getArticle', async () => {
    const response = await getArticleList()
    return response || null
}).get('/api/getSingleArticle:id', async ({ params: { id } }) => {
    const response = await getSingleArticle(id)
    return response || null
}).get('/api/getHottestArticle', async () => {
    const response = await getHottestArticle()
    return response || null
}).post('/api/addArticle',({body}:{body: AddArticle})=>{
    addArticle(body);
}).delete('/api/deleteArticle',(query:{id:number})=>{
    deleteArticle(query.id);
}).put('/api/updateArticleView',({body}: { body: UpdateArticleViewBody })=>{
        updateArticleView(body.id);
}).put('/api/updateArticle',({body}: { body: UpdateArticleBody })=>{
        updateArticle(body);
}, {
    body: t.Object({
        title:t.String(),
        intro: t.String(),
        avatar: t.String(),
        category: t.String(),
        content: t.Array(t.String()),
    }),
})

