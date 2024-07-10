import {pushToBallVisionDbDb} from "./index";
import {config} from "../config";

await pushToBallVisionDbDb({
    dbName: config.env.DATABASE_URL,
    authToken: config.env.DATABASE_AUTH_TOKEN!,
    input: true
})