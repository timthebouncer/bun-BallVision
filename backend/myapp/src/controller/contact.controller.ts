
// 網址路徑
// 傳遞的參數較驗
// 裡面就調用 service 去處理
// 返回直
import {t} from "elysia";
import {app} from "../constants";
import {addContact} from "../service";


app.post('/api/addContact',({body})=>{
    console.log(body,'body')
    addContact(body)
})