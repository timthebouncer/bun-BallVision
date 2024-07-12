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


app.get('/api/getArticle', async ({query}) => {
    const response = await getArticleList(query)
    return response || null
}, {
    query: t.Object({
        category:t.String(),
        pageNumber: t.Optional(t.Numeric()),  // <----- Works
        pageSize: t.Optional(t.Numeric()), // <----- Works
    }),
}).get('/api/getSingleArticle:id', async ({ params: { id } }) => {
    const response = await getSingleArticle(id)
    return response || null
}).get('/api/getHottestArticle', async () => {
    const response = await getHottestArticle()
    return response || null
}).post('/api/addArticle',({body}:{body: AddArticle})=>{
    addArticle(body);
}).delete('/api/deleteArticle',({query})=>{
    deleteArticle(query);
}, {
    query: t.Object({
        id: t.Numeric()
    }),
}).put('/api/updateArticleView',({body}: { body: UpdateArticleViewBody })=>{
        updateArticleView(body.id);
}).put('/api/updateArticle',({body}: { body: UpdateArticleBody })=>{
        updateArticle(body);
})

