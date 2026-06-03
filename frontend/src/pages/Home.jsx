import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { 
  Heart, 
  Activity, 
  ArrowRight, 
  Clock, 
  CheckCircle 
} from "lucide-react";

function Home() {
  const navigate = useNavigate();
  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleRegisterDonor = () => {
    if (user) {
      navigate("/donors");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-info">
            <span className="hero-tagline">Save lives, give blood</span>
            <h1>Every Drop Counts, Become a Lifesaver</h1>
            <p>
              Drop-End connects blood donors with individuals in need of urgent blood requests. Join our network of thousands of donors and help bridge the gap in healthcare emergencies.
            </p>
            <div className="hero-actions">
              <button onClick={handleRegisterDonor} className="btn btn-primary">
                <span>Become a Donor</span>
                <Heart size={16} fill="white" />
              </button>
              <button onClick={() => navigate("/bloodrequest")} className="btn btn-outline">
                <span>Request Blood</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="hero-graphics">
            <div className="hero-shape-bg"></div>
            <div className="hero-main-card">
              <div className="heart-icon-badge">
                <Heart size={32} fill="#d32f2f" />
              </div>
              <h3 style={{ marginBottom: "8px", fontSize: "20px" }}>Ready to Help?</h3>
              <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "20px" }}>
                Your single donation can save up to three lives. Check your eligibility and register in less than 2 minutes.
              </p>
              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <div style={{ padding: "10px", background: "var(--bg-main)", borderRadius: "8px", flex: 1 }}>
                  <h4 style={{ fontSize: "18px" }}>100%</h4>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Safe Process</span>
                </div>
                <div style={{ padding: "10px", background: "var(--bg-main)", borderRadius: "8px", flex: 1 }}>
                  <h4 style={{ fontSize: "18px" }}>Free</h4>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Registration</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">1,240+</div>
            <div className="stat-label">Active Donors</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">3,850+</div>
            <div className="stat-label">Lives Saved</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">45+</div>
            <div className="stat-label">Partner Hospitals</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">99.8%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </section>

        {/* Guidelines / Info Section */}
        <section style={{ marginBottom: "60px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "40px", fontSize: "28px" }}>
            How the Donation Process Works
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px" }}>
            <div className="card">
              <div style={{ background: "var(--primary-light)", color: "var(--primary)", width: "40px", height: "40px", borderRadius: "8px", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <CheckCircle size={20} />
              </div>
              <h3 className="card-title" style={{ fontSize: "18px" }}>1. Registration</h3>
              <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
                Sign up with your credentials, provide your location, and specify your blood type. This registers you as an active donor in our database.
              </p>
            </div>

            <div className="card">
              <div style={{ background: "var(--primary-light)", color: "var(--primary)", width: "40px", height: "40px", borderRadius: "8px", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <Clock size={20} />
              </div>
              <h3 className="card-title" style={{ fontSize: "18px" }}>2. Match & Alert</h3>
              <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
                When a hospital or patient nearby requests your specific blood type, our system coordinates notifications to connect you quickly.
              </p>
            </div>

            <div className="card">
              <div style={{ background: "var(--primary-light)", color: "var(--primary)", width: "40px", height: "40px", borderRadius: "8px", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <Activity size={20} />
              </div>
              <h3 className="card-title" style={{ fontSize: "18px" }}>3. Save Lives</h3>
              <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
                Visit the clinic or hospital, complete the safe donation procedure, and make a massive difference in someone's recovery.
              </p>
            </div>
          </div>
        </section>
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

export default Home;