import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import {pushToBallVisionDbDb} from "./index";
import {config} from "../config";

await pushToBallVisionDbDb({
    dbName: config.env.DATABASE_URL,
    authToken: config.env.DATABASE_AUTH_TOKEN!,
    input: true
})