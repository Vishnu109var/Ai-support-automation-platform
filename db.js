const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tickets (
      id SERIAL PRIMARY KEY,
      customer_name TEXT NOT NULL,
      customer_email TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      category TEXT,
      urgency TEXT,
      ai_draft_reply TEXT,
      status TEXT DEFAULT 'open',
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log("Database ready: tickets table ensured.");
}

module.exports = { pool, initDb };