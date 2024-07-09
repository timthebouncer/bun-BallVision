// 網址路徑
// 傳遞的參數較驗
// 裡面就調用 service 去處理
// 返回直
import {app} from "../constants";
import {addArticle, getArticleList, getHottestArticle, getSingleArticle, updateArticleView} from "../service";


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
}).put('/api/updateArticleView',({body}: { body: UpdateArticleViewBody })=>{
        updateArticleView(body.id);
})

