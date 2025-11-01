// src/db/index.ts
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { cache } from "react";
import * as schema from "@/db/schema";

/**
 * Build a pg Pool from Hyperdrive (prod) or DATABASE_URL (dev).
 * On Workers, avoid reusing pooled sockets across requests.
 */
function makePoolFromEnv(env?: Record<string, any>) {
  const hyperdriveConn: string | undefined =
    env?.HYPERDRIVE?.connectionString ?? undefined;

  const connectionString =
    hyperdriveConn || process.env.DATABASE_URL || "";

  if (!connectionString) {
    throw new Error(
      "No DB connection string. Ensure Hyperdrive binding is set, or define DATABASE_URL for local dev."
    );
  }

  // Important for Workers: don't keep hot sockets around
  return new Pool({ connectionString, maxUses: 1 });
}

/** For normal server requests (RSC/route handlers) */
export const getDb = cache(() => {
  const { env } = getCloudflareContext();
  const pool = makePoolFromEnv(env);
  return drizzle({ client: pool, schema });
});

/** For static-ish loaders that require async env fetch (rare) */
export const getDbAsync = cache(async () => {
  const { env } = await getCloudflareContext({ async: true });
  const pool = makePoolFromEnv(env);
  return drizzle({ client: pool, schema });
});

/**
 * Convenience export for code that expects `{ db }` (like your dashboard page).
 * This resolves per-request thanks to Next’s `cache()` scoping.
 */
export const db = getDb();
