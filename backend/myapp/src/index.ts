import {cors} from '@elysiajs/cors'
import {app} from "./constants";
import './controller/video.controller'
import './controller/article.controller'
import './controller/user.controller'

;(async ()=>{

    app
        .use(cors())
        .listen(3000)

    console.log(
        `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    );
})()


