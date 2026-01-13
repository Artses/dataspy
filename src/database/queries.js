import pool from "../config/db.js";

export async function getConnections() {
  const { rows } = await pool.query(`
    SELECT count(*) AS connections
    FROM pg_stat_activity
    WHERE state = 'active'
  `);
  return Number(rows[0].connections);
}

export async function getLocks() {
  const { rows } = await pool.query(`
    SELECT count(*) AS locks
    FROM pg_locks
    WHERE granted = false
  `);
  return Number(rows[0].locks);
}

export async function getSlowQueries() {
  const { rows } = await pool.query(`
    SELECT
      pid,
      query,
      ROUND(EXTRACT(EPOCH FROM (NOW() - query_start)) * 1000, 2) AS duration_ms,
      datname
    FROM pg_stat_activity
    WHERE state = 'active'
      AND query_start IS NOT NULL
      AND EXTRACT(EPOCH FROM (NOW() - query_start)) > 5
    ORDER BY duration_ms DESC
    LIMIT 10
  `);
  return rows.map(row => ({
    query: row.query,
    avg_time: parseFloat(row.duration_ms / 1000).toFixed(2),
    calls: row.pid,
    datname: row.datname
  }));
}

export async function countSlowQueries() {
  const { rows } = await pool.query(`
    SELECT COUNT(*) AS slow_queries
    FROM pg_stat_activity
    WHERE state = 'active'
      AND query_start IS NOT NULL
      AND EXTRACT(EPOCH FROM (NOW() - query_start)) > 5
  `);
  return Number(rows[0].slow_queries);
}
