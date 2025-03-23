import { useState } from "react";
import "../styles/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    
      const result = await response.text();
      if (response.ok) {
        setResponseMessage("✅ Email sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponseMessage("❌ Failed to send email. Try again.");
      }
    } catch (error) {
      setResponseMessage("❌ Error sending email.");
    } finally {
      setLoading(false);
    }    
  };

  return (
    <main>
      <section id="contact">
        <div className="container">
          <h2 id="contact-title">Contact Us</h2>
          <p>Protect your digital assets today by contacting us.</p>
          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              aria-label="Name"
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              aria-label="Email"
            />

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Write your message here..."
              aria-label="Message"
            ></textarea>

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
          {responseMessage && <p className="response-message">{responseMessage}</p>}
        </div>
      </section>
    </main>
  );
}

export default Contact;
