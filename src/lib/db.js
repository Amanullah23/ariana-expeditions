// src/lib/db.js
// Replaces src/lib/supabase/client.js. Import this instead of @supabase/supabase-js
// in every actions.js file, then use pool.query(sql, params) instead of
// supabase.from(table).select()/.insert()/etc.
//
// Cached on `global` so Next.js dev-mode hot-reload doesn't spawn a new pool
// (and exhaust Momtaz's connection limit) on every file save.
//
// NOTE: `pg` is loaded via eval("require") instead of a normal import.
// Next.js 16.2.12's Turbopack production bundler has a bug where it mangles
// the import for this package into an unresolvable name (e.g.
// "pg-587764f78a6c7a9c") even with serverExternalPackages set. Routing the
// require through eval makes it invisible to Turbopack's static analysis,
// so Node resolves it normally from node_modules at runtime instead. This
// is a long-standing trick for exactly this class of bundler issue.
const { Pool } = eval("require")("pg");

if (!global._pgPool) {
  global._pgPool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 10,
    idleTimeoutMillis: 30000,
    // Fail fast instead of hanging forever if the DB is unreachable or a
    // query gets stuck (e.g. lock contention) — without these, a broken
    // connection just hangs the request indefinitely with no error at all.
    connectionTimeoutMillis: 10000,
    statement_timeout: 10000,
    ssl: false, // same-server connection on shared hosting; enable if Momtaz requires SSL
  });

  global._pgPool.on("error", (err) => {
    console.error("Unexpected Postgres pool error:", err);
  });
}

export const pool = global._pgPool;

/**
 * Convenience helper matching the shape most actions.js files will want:
 *   const rows = await query("select * from trips where slug = $1", [slug]);
 */
export async function query(text, params) {
  try {
    const result = await pool.query(text, params);
    return result.rows;
  } catch (err) {
    console.error("DB query failed:", text, err.message);
    throw err;
  }
}
