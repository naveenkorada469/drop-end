import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { 
  Search, 
  MapPin, 
  Mail, 
  Phone, 
  Droplet, 
  MessageSquare
} from "lucide-react";
import { API_BASE_URL } from "../config";

function Donors() {
  const [donors, setDonors] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [filterBloodGroup, setFilterBloodGroup] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    fetch(`${API_BASE_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        setDonors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching donors: ", err);
        setLoading(false);
      });
  }, []);

  // Filter donor logic
  const filteredDonors = donors.filter((donor) => {
    // Only display actual donors (optionally match role if role !== 'admin')
    const matchesCity = donor.city
      ? donor.city.toLowerCase().includes(searchCity.toLowerCase())
      : true;
    const matchesBloodGroup = filterBloodGroup
      ? donor.bloodGroup === filterBloodGroup
      : true;
    return matchesCity && matchesBloodGroup && donor.role !== "admin";
  });

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <div className="page-header">
          <div className="page-title-area">
            <h1 className="page-title">Find Blood Donors</h1>
            <p className="page-subtitle">Search for active donors in your area and connect with them instantly</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="filter-input-group">
            <Search className="input-icon" size={18} />
            <input
              type="text"
              placeholder="Search by city..."
              className="filter-input"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
          </div>

          <div className="filter-input-group" style={{ maxWidth: "250px" }}>
            <Droplet className="input-icon" size={18} color="var(--primary)" />
            <select
              className="filter-input filter-select"
              value={filterBloodGroup}
              onChange={(e) => setFilterBloodGroup(e.target.value)}
            >
              <option value="">All Blood Groups</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>

        {/* Donors Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
            <div style={{ width: "40px", height: "40px", border: "3px solid var(--border-color)", borderTopColor: "var(--primary)", borderRadius: "50%", margin: "0 auto 16px", animation: "pulse 1.5s infinite linear" }} />
            <span>Loading donors list...</span>
          </div>
        ) : filteredDonors.length > 0 ? (
          <div className="grid-listing">
            {filteredDonors.map((donor) => {
              const isSelf = currentUser && currentUser._id === donor._id;
              return (
                <div 
                  key={donor._id} 
                  className="card donor-card"
                  style={isSelf ? { borderColor: "var(--primary)", borderWidth: "2px", background: "rgba(211, 47, 47, 0.02)" } : {}}
                >
                  <div>
                    <div className="donor-header">
                      {donor.profilePic ? (
                        <img 
                          src={donor.profilePic} 
                          alt={donor.name} 
                          className="donor-avatar"
                        />
                      ) : (
                        <div className="donor-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fee2e2', color: '#d32f2f', fontWeight: 'bold', fontSize: '18px' }}>
                          {donor.name ? donor.name.charAt(0).toUpperCase() : 'D'}
                        </div>
                      )}

                      <div className="donor-meta">
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <h3 style={{ fontSize: "16px", marginBottom: "2px" }}>{donor.name}</h3>
                          {isSelf && (
                            <span style={{ background: "var(--primary)", color: "white", fontSize: "9px", fontWeight: "bold", padding: "2px 6px", borderRadius: "4px", textTransform: "uppercase" }}>
                              You
                            </span>
                          )}
                        </div>
                        <div className="donor-blood-badge">{donor.bloodGroup}</div>
                      </div>
                    </div>

                  <div className="donor-details">
                    <div className="donor-detail-item">
                      <MapPin size={15} />
                      <span>{donor.city || "Not Specified"}</span>
                    </div>
                    <div className="donor-detail-item">
                      <Mail size={15} />
                      <span>{donor.email}</span>
                    </div>
                    {donor.contact && (
                      <div className="donor-detail-item">
                        <Phone size={15} />
                        <span>{donor.contact}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                  <a href={`mailto:${donor.email}`} className="btn btn-outline" style={{ flex: 1, padding: "8px 12px", fontSize: "12px" }}>
                    <Mail size={14} />
                    <span>Email</span>
                  </a>
                  <button 
                    onClick={() => alert(`Connect with ${donor.name} at: ${donor.email}`)}
                    className="btn btn-primary" 
                    style={{ flex: 1, padding: "8px 12px", fontSize: "12px" }}
                  >
                    <MessageSquare size={14} />
                    <span>Contact</span>
                  </button>
                </div>
              </div>
            );
          })}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 20px", background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: "12px", color: "var(--text-muted)" }}>
            <MapPin size={48} style={{ margin: "0 auto 16px", strokeWidth: 1.2, color: "var(--text-muted)" }} />
            <h3 style={{ fontSize: "18px", color: "var(--secondary)", marginBottom: "8px" }}>No Donors Found</h3>
            <p style={{ fontSize: "14px", maxWidth: "400px", margin: "0 auto" }}>
              We couldn't find any donors matching your criteria in this area. Try adjusting your search query or blood group filter.
            </p>
          </div>
        )}
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

export default Donors;