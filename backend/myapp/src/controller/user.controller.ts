// 網址路徑
// 傳遞的參數較驗
// 裡面就調用 service 去處理
// 返回直

import {app} from "../constants";
import {userCheck} from "../service";



app.get('/api/userCheck',({ params: { password } })=>{
    userCheck(password)
})