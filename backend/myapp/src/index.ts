import { Elysia } from "elysia";
import {cors} from '@elysiajs/cors'
// import { db } from "./db";
import {videosDatabase} from './db'

type UploadVideoText = {
  title: string
  intro: string
  videoUrl: string
}

const app = new Elysia().decorate('db', new videosDatabase)
      .use(cors())
      .get('/api/getVideoList', async({db}) => {
              const result = await db.getVideoList()
              console.log(result,'result');
              return result
            })
      .post('/api/addVideo', async ({body, db})=>{
        console.log(body,'bbb')
        db.addVideo(body)
      })
      .put('/api/toggleTodo', async({body, db})=>{
          const {id, done} = body
          const result = await db.toggleTodo(id, done)
          return result
      })
      .delete('/api/deleteTodo', async({body, db})=>{
        const {id} = body
        db.deleteTodo(id)
      })
      .listen(3000)




console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);