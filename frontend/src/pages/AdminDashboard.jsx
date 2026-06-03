import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { 
  Users, 
  FileText, 
  Check
} from "lucide-react";
import { API_BASE_URL } from "../config";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/bloodrequests`);
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE_URL}/bloodrequests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchRequests(); // Re-fetch request list
      } else {
        alert("Failed to update request status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Helper stats
  const donorsCount = users.filter(u => u.role !== "admin").length;
  const urgentCount = requests.filter(r => r.status === "Urgent").length;
  const completedCount = requests.filter(r => r.status === "Completed").length;

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <div className="page-header">
          <div className="page-title-area">
            <h1 className="page-title">Admin Dashboard</h1>
            <p className="page-subtitle">Manage users, track request logs, and supervise blood logistics operations</p>
          </div>
        </div>

        {/* Admin Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div className="stat-number">{users.length}</div>
              <div className="stat-label">Total Registered Accounts</div>
            </div>
            <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-muted)", justifyContent: "center" }}>
              <Users size={14} />
              <span>{donorsCount} Active Donors</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{requests.length}</div>
            <div className="stat-label">Total Blood Requests</div>
          </div>

          <div className="stat-card" style={{ borderLeft: "4px solid #ef4444" }}>
            <div className="stat-number" style={{ color: "#ef4444" }}>{urgentCount}</div>
            <div className="stat-label">Urgent Requests</div>
          </div>

          <div className="stat-card" style={{ borderLeft: "4px solid #15803d" }}>
            <div className="stat-number" style={{ color: "#15803d" }}>{completedCount}</div>
            <div className="stat-label">Completed Donations</div>
          </div>
        </div>

        {/* Dashboard Split View */}
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          
          {/* Active Blood Requests Admin Panel */}
          <div>
            <h2 style={{ fontSize: "20px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <FileText size={20} color="var(--primary)" />
              <span>Manage Blood Requests</span>
            </h2>

            <div className="table-container">
              {loadingRequests ? (
                <div style={{ textAlign: "center", padding: "40px" }}>Loading requests...</div>
              ) : requests.length > 0 ? (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Blood Group</th>
                      <th>Hospital</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req) => (
                      <tr key={req._id}>
                        <td style={{ fontWeight: "600" }}>{req.patientName}</td>
                        <td>
                          <span style={{ background: "var(--primary-light)", color: "var(--primary)", fontWeight: "800", padding: "4px 8px", borderRadius: "4px" }}>
                            {req.bloodGroup}
                          </span>
                        </td>
                        <td>{req.hospital}</td>
                        <td>{req.city || "Not specified"}</td>
                        <td>
                          <span className={`badge ${
                            req.status === "Completed" ? "badge-approved" : 
                            req.status === "Urgent" ? "badge-urgent" : "badge-pending"
                          }`}>
                            {req.status || "Pending"}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: "6px" }}>
                            {req.status !== "Approved" && req.status !== "Completed" && (
                              <button 
                                onClick={() => handleUpdateStatus(req._id, "Approved")}
                                className="btn btn-outline" 
                                style={{ padding: "6px 10px", fontSize: "11px", borderColor: "#15803d", color: "#15803d" }}
                              >
                                Approve
                              </button>
                            )}
                            {req.status !== "Urgent" && req.status !== "Completed" && (
                              <button 
                                onClick={() => handleUpdateStatus(req._id, "Urgent")}
                                className="btn btn-outline" 
                                style={{ padding: "6px 10px", fontSize: "11px", borderColor: "#ef4444", color: "#ef4444" }}
                              >
                                Set Urgent
                              </button>
                            )}
                            {req.status !== "Completed" && (
                              <button 
                                onClick={() => handleUpdateStatus(req._id, "Completed")}
                                className="btn btn-primary" 
                                style={{ padding: "6px 10px", fontSize: "11px", background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)" }}
                              >
                                <Check size={12} />
                                <span>Complete</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                  No blood requests found in the system.
                </div>
              )}
            </div>
          </div>

          {/* Registered Users Admin Panel */}
          <div>
            <h2 style={{ fontSize: "20px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Users size={20} color="var(--primary)" />
              <span>Registered Accounts List</span>
            </h2>

            <div className="table-container">
              {loadingUsers ? (
                <div style={{ textAlign: "center", padding: "40px" }}>Loading accounts...</div>
              ) : users.length > 0 ? (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Email</th>
                      <th>Blood Group</th>
                      <th>Location City</th>
                      <th>Account Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id}>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            {u.profilePic ? (
                              <img src={u.profilePic} alt="" style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover" }} />
                            ) : (
                              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#fee2e2", color: "#d32f2f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "bold" }}>
                                {u.name ? u.name.charAt(0).toUpperCase() : "U"}
                              </div>
                            )}
                            <span style={{ fontWeight: "600" }}>{u.name}</span>
                          </div>
                        </td>
                        <td>{u.email}</td>
                        <td>
                          <span style={{ fontWeight: "600", color: "var(--primary)" }}>{u.bloodGroup || "N/A"}</span>
                        </td>
                        <td>{u.city || "Not specified"}</td>
                        <td>
                          <span style={{ 
                            fontSize: "11px", 
                            fontWeight: "700", 
                            textTransform: "uppercase",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            background: u.role === "admin" ? "#e0f2fe" : "#f1f5f9",
                            color: u.role === "admin" ? "#0369a1" : "#475569"
                          }}>
                            {u.role || "Donor"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                  No accounts found in the database.
                </div>
              )}
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

export default AdminDashboard;