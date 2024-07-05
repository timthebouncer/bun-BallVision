import {t} from "elysia";
import {cors} from '@elysiajs/cors'


import {app, db} from "./src/constants";
import {migrate} from "drizzle-orm/bun-sqlite/migrator";
import './src/controller/video.controller'
import './src/controller/article.controller'


;(async ()=>{

  await migrate(db, { migrationsFolder: "./drizzle" });

  app
      .use(cors())
      .get('/www',()=>{
        console.log(89899)
        return '899999999922'
      })
      .listen(3000)

    console.log(
        `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    );
})()

