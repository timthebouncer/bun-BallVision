import {contact} from "../schema";
import {asc, desc, eq, like} from "drizzle-orm";
import {db} from "../constants";

//對應表的所有sql操作


type AddContact = {
    emailOrPhone: string
    request: string
}

export class ContactDao {
    async addContact(params: AddContact) {
        await db.insert(contact).values({ ...params })
    }
}