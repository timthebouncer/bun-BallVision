import Elysia, {t} from "elysia";
import {cors} from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger';
import { env } from './env';

// import {app, db} from "./constants";
// import {migrate} from "drizzle-orm/bun-sqlite/migrator";
// import './controller/video.controller'
// import './controller/article.controller'

const createElysia = (
    config?: ConstructorParameters<typeof Elysia>[0]
) => new Elysia({ ...config, aot: env.RUNTIME === 'bun' });

;(async ()=>{

    const app = createElysia()

  // await migrate(db, { migrationsFolder: "./drizzle" });

  app
      .use(swagger())
      .use(cors())
      .get('/www',()=>{
        return 'wwwwww'
      })
      .listen(3000)

    console.log(
        `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    );
})()

