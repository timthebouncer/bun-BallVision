// 網址路徑
// 傳遞的參數較驗
// 裡面就調用 service 去處理
// 返回直
import {app} from "../constants";
import {addArticle, getArticleList, getHottestArticle, getSingleArticle, updateArticleView} from "../service";

type AddArticle = {
    title: string;
    intro: string;
    avatar: string;
    content: string;
}

app.get('/api/getArticle', async () => {
    const response = await getArticleList()
    return response || null
}).get('/api/getSingleArticle:id', async ({ params: { id } }) => {
    const response = await getSingleArticle(id)
    return response || null
}).get('/api/getHottestArticle', async () => {
    const response = await getHottestArticle()
    return response || null
}).post('/api/addArticle',({body})=>{
    console.log(body,'body')
    if (isAddArticle(body)) {
        addArticle(body);
    } else {
        throw new Error('Invalid body');
    }
}).put('/api/updateArticleView',({body})=>{
    console.log(body,'body')
    updateArticleView(body)
    if (typeof body === 'string') {
        updateArticleView(body);
    } else {
        throw new Error('Invalid body');
    }
})

// Type guard for AddArticle
function isAddArticle(obj: any): obj is AddArticle {
    return typeof obj.title === 'string' &&
        typeof obj.intro === 'string' &&
        typeof obj.avatar === 'string' &&
        typeof obj.content === 'string';
}
