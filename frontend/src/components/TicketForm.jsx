import { useState } from "react";
import API from "../services/api";

function TicketForm({ loadTickets }) {
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/tickets", form);

    setForm({
      customer_name: "",
      customer_email: "",
      subject: "",
      description: "",
    });

    loadTickets();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="customer_name"
        placeholder="Customer Name"
        value={form.customer_name}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="customer_email"
        placeholder="Customer Email"
        value={form.customer_email}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
      />

      <br /><br />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <br /><br />

      <button>Create Ticket</button>
    </form>
  );
}

export default TicketForm;