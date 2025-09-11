import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Footer.css";

function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSend = async () => {
  if (!name || !email || !message) {
    setStatus("Please fill in all fields.");
    return;
  }

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        user_name: name,     // matches {{user_name}}
        user_email: email,   // matches {{user_email}}
        message: message,    // matches {{message}}
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    setStatus("✅ Message sent successfully!");
    setName("");
    setEmail("");
    setMessage("");
  } catch (err) {
    console.error(err);
    setStatus("❌ Failed to send message. Please try again.");
  }
};


  return (
    <footer className="footer">
      <h4 className="footer-h4">HabitFlow</h4>
      <p className="footer-p">© 2025 HabitFlow || All rights reserved</p>

      <a href="#" className="footer-cta" onClick={() => setIsModalOpen(true)}>
        Reach Out
      </a>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Contact Us</h2>

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="modal-buttons">
              <button onClick={handleSend}>Send</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>

            {status && <p className="status-msg">{status}</p>}
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
