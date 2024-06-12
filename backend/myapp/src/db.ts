import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";




// Initialize the database
export const initDatabase=()=> {
        const sqlite = new Database("sqlite.db");
        const db = drizzle(sqlite);
        return db
}
