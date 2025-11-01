// src/db/index.ts
import 'pg-cloudflare';           // must be first: patches 'pg' for Workers
import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/db/schema';

function getHyperdriveConnString() {
  const anyGlobal = globalThis as any;
  const fromBinding = anyGlobal.ENV?.HYPERDRIVE?.connectionString;
  const fromProcess = anyGlobal.process?.env?.HYPERDRIVE_CONNECTION_STRING; // optional fallback
  const conn = fromBinding ?? fromProcess;
  if (!conn) throw new Error('HYPERDRIVE connection string not found');
  return conn;
}

// Open a connection per request; remember to client.end()
export async function openDb() {
  const client = new Client({ connectionString: getHyperdriveConnString() });
  await client.connect();
  const db = drizzle(client, { schema });
  return { db, client };
}
