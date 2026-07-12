const express = require("express");
const router = express.Router();

const {
  createTicket,
  getTickets,
  updateTicket,
} = require("../controllers/ticketController");

// Create Ticket
router.post("/", createTicket);

// Get All Tickets
router.get("/", getTickets);

// Update Ticket
router.put("/:id", updateTicket);

module.exports = router;