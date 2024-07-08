
// 網址路徑
// 傳遞的參數較驗
// 裡面就調用 service 去處理
// 返回直
import {t} from "elysia";
import {app} from "../constants";
import {addVideo, getVideosByText, updateVideo} from "../service";


type UploadVideoText = {
    title: string
    intro: string
    videoUrl: string
}

type UpdateVideo = {
    id: number
    videoUrl: string
}


app.get('/api/getVideoList', async ({query}) => {
    const response = await getVideosByText(query)
    return response || null
}, {
    query: t.Object({
        keyword:t.String(),
        pageNumber: t.Optional(t.Numeric()),  // <----- Works
        pageSize: t.Optional(t.Numeric()), // <----- Works
    }),
}).post('/api/addVideo',({body})=>{
    console.log(body,'body')
    if (isUploadVideoText(body)) {
        addVideo(body);
    } else {
        throw new Error('Invalid body');
    }
}).put('/api/updateVideo',({body}:{body: UpdateVideo})=>{
    console.log(body,'body')
        updateVideo(body)
})

function isUploadVideoText(obj: any): obj is UploadVideoText {
    return typeof obj.title === 'string' &&
        typeof obj.intro === 'string' &&
        typeof obj.videoUrl === 'string';
}
