import { Elysia } from "elysia";
import {cors} from '@elysiajs/cors'
import {todos} from "./schema";
// import { db } from "./db";
import {todosDatabase} from './db'

interface types {
  id: number;
  text: string;
  done: boolean | number;
}

const app = new Elysia().decorate('db', new todosDatabase)
      .use(cors())
      .get('/api/getTodoList', async({db}) => {
              const result = await db.getTodoList()
              console.log(result,'result');
              return result
            })
      .post('/api/addTodo', async ({body, db})=>{
        const {text} = body
        db.addTodo(text)
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