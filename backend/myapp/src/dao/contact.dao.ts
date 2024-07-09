import {contact} from "../schema";
import {db} from "../constants";

//對應表的所有sql操作


export class ContactDao {
    async addContact(params: AddContact) {
        await db.insert(contact).values({ ...params })
    }
}