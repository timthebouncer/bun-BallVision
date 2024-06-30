import { db } from "./index";
import * as schema from "../schema";

await db.insert(schema.videos).values([
    {
        title: "The Matrix",
        intro: 1999,
        videoUrl: 1999,
        category: 1999,
    },
]);

await db.insert(schema.articles).values([
    {
        title: "The Matrix",
        intro: 1999,
        avatar: 1999,
        views: 1999,
        content: 1999,
    },
]);

console.log(`Seeding complete.`);