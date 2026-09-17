const express = require("express");
const router = express.Router();
const { pool } = require("../db");
const { analyzeTicket } = require("../ai");

// Create a new ticket
router.post("/", async (req, res) => {
  try {
    const { customer_name, customer_email, subject, message } = req.body;

    if (!customer_name || !subject || !message) {
      return res.status(400).json({ error: "customer_name, subject, and message are required." });
    }

    // Placeholder values for now — Step 6 will replace these with real AI output
    const analysis = await analyzeTicket({ subject, message });
    const { category, urgency, draft_reply: ai_draft_reply } = analysis;

    const result = await pool.query(
      `INSERT INTO tickets (customer_name, customer_email, subject, message, category, urgency, ai_draft_reply)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [customer_name, customer_email, subject, message, category, urgency, ai_draft_reply]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create ticket", details: err.message });
  }
});

// List all tickets
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM tickets ORDER BY created_at DESC");
  res.json(result.rows);
});

module.exports = router;