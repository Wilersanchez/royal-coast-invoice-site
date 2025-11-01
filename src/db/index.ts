// src/db/index.ts
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '@/db/schema';

// Prefer a Hyperdrive binding connection string if present; otherwise fall back to your Xata DATABASE_URL
const connectionString =
  (process.env.HYPERDRIVE_XATA && JSON.parse(process.env.HYPERDRIVE_XATA).connectionString) ||
  process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('Missing connection string: set HYPERDRIVE_XATA or DATABASE_URL');
}

// Cloudflare Workers + postgres.js:
export const client = postgres(connectionString, {
  // Cloudflare Workers: disable prepared statements
  // (they rely on connection state; Hyperdrive/edge benefits from stateless)
  prepare: false,
  // Your Xata URL already requires TLS; leaving this explicit is harmless
  ssl: 'require',
  max: 1, // keep tiny – Workers spin up per request
});

export const db = drizzle(client, { schema });
