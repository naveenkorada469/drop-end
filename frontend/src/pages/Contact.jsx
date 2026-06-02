import { useState } from "react";
import Navbar from "../components/Navbar";
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle } from "lucide-react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <div className="page-header">
          <div className="page-title-area">
            <h1 className="page-title">Contact Support</h1>
            <p className="page-subtitle">Get in touch with us for inquiries, partnerships, or support issues</p>
          </div>
        </div>

        {submitted && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#dcfce7", border: "1px solid #bbf7d0", padding: "14px", borderRadius: "8px", color: "#15803d", fontSize: "14px", marginBottom: "24px" }}>
            <CheckCircle size={18} />
            <span>Thank you for your message! Our support team will get back to you shortly.</span>
          </div>
        )}

        <div className="dashboard-layout">
          {/* Left Column: Form */}
          <div className="card">
            <h2 className="card-title" style={{ marginBottom: "20px" }}>Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    className="input-field"
                    style={{ paddingLeft: "16px" }}
                    placeholder="John Doe"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    className="input-field"
                    style={{ paddingLeft: "16px" }}
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  className="input-field"
                  style={{ paddingLeft: "16px" }}
                  placeholder="How can we help you?"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "24px" }}>
                <label className="form-label">Message</label>
                <textarea
                  className="input-field"
                  style={{ paddingLeft: "16px", minHeight: "120px", resize: "vertical" }}
                  placeholder="Write your message here..."
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <button className="btn btn-primary" type="submit">
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Right Column: Contact details & FAQs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="card" style={{ background: "var(--secondary)", color: "white" }}>
              <h2 className="card-title" style={{ color: "white", marginBottom: "20px" }}>Contact Info</h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ background: "rgba(255,255,255,0.1)", padding: "10px", borderRadius: "8px" }}>
                    <Mail size={18} color="white" />
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>Email Support</div>
                    <a href="mailto:support@dropend.com" style={{ fontSize: "14px", fontWeight: "600" }}>support@dropend.com</a>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ background: "rgba(255,255,255,0.1)", padding: "10px", borderRadius: "8px" }}>
                    <Phone size={18} color="white" />
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>Phone Hotline</div>
                    <a href="tel:+919876543210" style={{ fontSize: "14px", fontWeight: "600" }}>+91 9876543210</a>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ background: "rgba(255,255,255,0.1)", padding: "10px", borderRadius: "8px" }}>
                    <MapPin size={18} color="white" />
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>Main HQ Office</div>
                    <span style={{ fontSize: "14px", fontWeight: "600" }}>Connaught Place, New Delhi, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs card */}
            <div className="card">
              <h2 className="card-title" style={{ marginBottom: "16px" }}>
                <HelpCircle size={18} color="var(--primary)" />
                <span>Frequently Asked FAQs</span>
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px" }}>
                <div>
                  <h4 style={{ color: "var(--secondary)", fontWeight: "600", marginBottom: "4px" }}>Is blood donation safe?</h4>
                  <p style={{ color: "var(--text-muted)" }}>Yes, all materials are single-use, sterile, and discarded after donation, making the process 100% safe.</p>
                </div>
                <div>
                  <h4 style={{ color: "var(--secondary)", fontWeight: "600", marginBottom: "4px" }}>How often can I donate?</h4>
                  <p style={{ color: "var(--text-muted)" }}>Whole blood donors can safely donate once every 56 days (approx. 8 weeks).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <span style={{ color: "var(--primary)" }}>Drop-</span>End
          </div>
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} Drop-End Blood Donation Network. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;