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
      .listen(3000)

    console.log(
        `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    );
})()

