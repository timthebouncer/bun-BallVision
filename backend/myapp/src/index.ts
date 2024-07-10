import {cors} from '@elysiajs/cors'
import {app, db} from "./constants";
import './controller/video.controller'
import './controller/article.controller'

;(async ()=>{

    app
        .use(cors())
        .listen(3000)

    console.log(
        `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    );
})()


