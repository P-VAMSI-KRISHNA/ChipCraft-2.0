require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDB() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Create teams table
    await client.query(`
      CREATE TABLE IF NOT EXISTS teams (
        id VARCHAR(255) PRIMARY KEY,
        "teamNumber" INTEGER UNIQUE NOT NULL,
        "teamName" VARCHAR(255) NOT NULL
      );
    `);

    // Create problem_statements table
    await client.query(`
      CREATE TABLE IF NOT EXISTS problem_statements (
        id VARCHAR(255) PRIMARY KEY,
        "teamNumber" INTEGER UNIQUE NOT NULL,
        "teamName" VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL
      );
    `);

    // Create marks table
    await client.query(`
      CREATE TABLE IF NOT EXISTS marks (
        "teamId" VARCHAR(255) NOT NULL,
        round INTEGER NOT NULL,
        score INTEGER NOT NULL,
        PRIMARY KEY ("teamId", round)
      );
    `);

    // Create app_state table
    await client.query(`
      CREATE TABLE IF NOT EXISTS app_state (
        key VARCHAR(255) PRIMARY KEY,
        value JSONB NOT NULL
      );
    `);

    // Initialize default funZone state if not exists
    await client.query(`
      INSERT INTO app_state (key, value)
      VALUES ('funZoneEnabled', 'false')
      ON CONFLICT (key) DO NOTHING;
    `);

    await client.query('COMMIT');
    console.log('Database initialized successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error initializing database', error);
  } finally {
    client.release();
  }
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  initDB,
};
