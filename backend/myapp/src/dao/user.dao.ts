import {contact, users} from "../db/schema";
import {db} from "../constants";
import {eq} from "drizzle-orm";
import {getBallVisionDb} from "../db";
import {config} from "../config";

//對應表的所有sql操作


export class UserDao {
    async userCheck(password: string) {
        const { ballVisionDb } = getBallVisionDb({
            dbName: config.env.DATABASE_URL,
            authToken: config.env.DATABASE_AUTH_TOKEN!,
        });
        await ballVisionDb.select().from(users).where(eq(users.password, password))
    }
}