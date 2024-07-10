import {contact} from "../db/schema";
import {db} from "../constants";
import {getBallVisionDb} from "../db";
import {config} from "../config";

//對應表的所有sql操作


export class ContactDao {
    async addContact(params: AddContact) {
        const { ballVisionDb } = getBallVisionDb({
            dbName: config.env.DATABASE_URL,
            authToken: config.env.DATABASE_AUTH_TOKEN!,
        });
        await ballVisionDb.insert(contact).values({ ...params })
    }
}