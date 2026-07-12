import { useState } from "react";
import API from "../services/api";

function TicketList({ tickets, loadTickets }) {

  const [selectedTicket, setSelectedTicket] = useState(null);

  const updateStatus = async (id, status) => {
    await API.put(`/tickets/${id}`, { status });
    loadTickets();
  };

  return (
    <>
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Status</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.ticket_id}</td>
              <td>{ticket.customer_name}</td>
              <td>{ticket.customer_email}</td>
              <td>{ticket.subject}</td>

              <td>
                <select
                  value={ticket.status}
                  onChange={(e) =>
                    updateStatus(ticket.id, e.target.value)
                  }
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Closed</option>
                </select>
              </td>

              <td>
                <button onClick={() => setSelectedTicket(ticket)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTicket && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            background: "#f8f9fa",
          }}
        >
          <h2>Ticket Details</h2>

          <p><b>Ticket ID:</b> {selectedTicket.ticket_id}</p>
          <p><b>Customer:</b> {selectedTicket.customer_name}</p>
          <p><b>Email:</b> {selectedTicket.customer_email}</p>
          <p><b>Subject:</b> {selectedTicket.subject}</p>
          <p><b>Description:</b> {selectedTicket.description}</p>
          <p><b>Status:</b> {selectedTicket.status}</p>

          <button onClick={() => setSelectedTicket(null)}>
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default TicketList;