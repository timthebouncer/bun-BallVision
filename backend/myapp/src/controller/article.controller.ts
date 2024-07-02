
// 網址路徑
// 傳遞的參數較驗
// 裡面就調用 service 去處理
// 返回直
import {t} from "elysia";
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
    console.log(response,'response getHottestArticle')
    return response || null
}).post('/api/addArticle',({body})=>{
    console.log(body,'body')
    addArticle(body)
}).put('/api/updateArticleView',({body})=>{
    console.log(body,'body')
    updateArticleView(body)
})