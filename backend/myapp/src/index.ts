import Elysia, {t} from "elysia";
import {cors} from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger';
// import { env } from './env';
import {z} from "zod";

// import {app, db} from "./constants";
// import {migrate} from "drizzle-orm/bun-sqlite/migrator";
// import './controller/video.controller'
// import './controller/article.controller'

const envVariables = z.object({
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
    PORT: z.coerce.number().default(3000),
    RUNTIME: z.enum(['bun', 'edge']).default('bun'),
});

const env = envVariables.parse(process.env);

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

    app.listen({ port: env.PORT }, ({ hostname, port }) => {
        const url = env.NODE_ENV === 'production' ? 'https' : 'http';

        console.log(`🦊 Elysia is running at ${url}://${hostname}:${port}`);
    });

    // console.log(
    //     `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    // );
})()

