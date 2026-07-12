const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
  path.join(__dirname, "crm.db"),
  (err) => {
    if (err) {
      console.error("Database Error:", err.message);
    } else {
      console.log("SQLite Connected");

      db.run(`
        CREATE TABLE IF NOT EXISTS tickets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          ticket_id TEXT UNIQUE,
          customer_name TEXT,
          customer_email TEXT,
          subject TEXT,
          description TEXT,
          status TEXT DEFAULT 'Open',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    }
  }
);

module.exports = db;