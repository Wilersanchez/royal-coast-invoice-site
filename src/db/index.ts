// src/db/index.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/db/schema";

// Use Hyperdrive's connection string in production (set as DATABASE_URL in Pages)
// and your local .env for dev.
const conn = process.env.DATABASE_URL;
if (!conn) {
  throw new Error("DATABASE_URL is not set (expected Hyperdrive DSN in prod, or .env in dev).");
}

// Reuse a single Pool across hot reloads
let _pool: Pool;
declare global {
  // eslint-disable-next-line no-var
  var __dbPool: Pool | undefined;
}

_pool = globalThis.__dbPool ?? new Pool({
  connectionString: conn,
  ssl: { rejectUnauthorized: false }, // Xata/Hyperdrive use SSL
});
if (!globalThis.__dbPool) globalThis.__dbPool = _pool;

export const db = drizzle(_pool, { schema });
export type Db = typeof db;
