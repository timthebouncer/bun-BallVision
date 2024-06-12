
// 網址路徑
// 傳遞的參數較驗
// 裡面就調用 service 去處理
// 返回直
import {t} from "elysia";
import {app} from "../constants";
import {addVideo, getVideosByText} from "../service";


app.get('/api/getVideoList', async ({query}) => {
    console.log(query.inputText,'query')

    const data = await getVideosByText(query.inputText)
    console.log(data,'ddddd')
    return data
}, {
    query : t.Object({
        inputText : t.String()
    })
}).post('/api/addVideo',({body})=>{
    console.log(body,'body')
    addVideo(body)
})