const express = require("express");
const cors = require("cors");

// Initialize Express
const app = express();

// Import Database
require("./database/db");

// Import Routes
const ticketRoutes = require("./routes/ticketRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Customer Support CRM API is Running 🚀");
});

// Ticket Routes
app.use("/api/tickets", ticketRoutes);

// Start Server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});