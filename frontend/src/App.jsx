import { useEffect, useState } from "react";
import API from "./services/api";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const loadTickets = async () => {
    const res = await API.get("/tickets");
    setTickets(res.data);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      ticket.customer_email.toLowerCase().includes(search.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
      ticket.ticket_id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || ticket.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container">
      <h1>Customer Support CRM</h1>

      <TicketForm loadTickets={loadTickets} />

      <br />

      <input
        type="text"
        placeholder="Search by customer, email, subject or ticket ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All Status</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>

      <br />
      <br />

      <TicketList
        tickets={filteredTickets}
        loadTickets={loadTickets}
      />
    </div>
  );
}

export default App;