import {createClient} from "@libsql/client";
import {drizzle} from "drizzle-orm/libsql";
import * as schema from "./schema";
import {unlinkSync} from "fs";

export function getBallVisionDb({
                                dbName,
                                authToken,
                            }:{
    dbName: string;
    authToken: string;
}) {
    const fullUrl = dbName;

    const ballVisionClient = createClient({
        url: fullUrl,
        authToken: authToken,
    });

    const ballVisionDb = drizzle(ballVisionClient, { schema, logger: true });

    return {
        ballVisionClient,
        ballVisionDb,
    };
}

export async function pushToBallVisionDbDb({
                                  dbName,
                                  authToken,
                                  input,
                              }: {
    dbName: string;
    authToken: string;
    input?: boolean;
}) {
    const tempConfigPath = "../drizzle.config.ts";

    const configText = `
  export default {
    schema: "./src/schema.ts",
    driver: "turso",
    dbCredentials: {
      url: "${dbName}",
      authToken: "${authToken}",
    },
    tablesFilter: ["!libsql_wasm_func_table"],
  }`;

    await Bun.write(tempConfigPath, configText);

    return new Promise((resolve, reject) => {
        const proc = Bun.spawn(
            ["bunx", "drizzle-kit", "push:sqlite", `--config=${tempConfigPath}`],
            {
                stdout: input ? "inherit" : undefined,
                stdin: input ? "inherit" : undefined,
                onExit(subprocess, exitCode, signalCode, error) {
                    unlinkSync(tempConfigPath);
                    if (exitCode === 0) {
                        resolve(void 0);
                    } else {
                        console.error("Error pushing to tenant db");
                        reject(error);
                    }
                },
            },
        );
    });
}
