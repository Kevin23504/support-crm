const db = require("../database/db");
const { v4: uuidv4 } = require("uuid");

// Create Ticket
exports.createTicket = (req, res) => {
  const { customer_name, customer_email, subject, description } = req.body;

  const ticket_id = "TKT-" + uuidv4().slice(0, 8);

  db.run(
    `INSERT INTO tickets
    (ticket_id, customer_name, customer_email, subject, description)
    VALUES (?, ?, ?, ?, ?)`,
    [ticket_id, customer_name, customer_email, subject, description],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        success: true,
        message: "Ticket Created Successfully",
        ticket_id,
      });
    }
  );
};

// Get All Tickets
exports.getTickets = (req, res) => {
  db.all(
    "SELECT * FROM tickets ORDER BY created_at DESC",
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json(rows);
    }
  );
};

// Update Ticket Status
exports.updateTicket = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.run(
    "UPDATE tickets SET status = ? WHERE id = ?",
    [status, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        success: true,
        message: "Status Updated Successfully",
      });
    }
  );
};