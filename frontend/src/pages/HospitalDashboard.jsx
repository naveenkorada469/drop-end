import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { 
  Building2, 
  PlusCircle, 
  Clock, 
  User, 
  Droplet,
  Send,
  Check
} from "lucide-react";
import { API_BASE_URL } from "../config";

function HospitalDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(() => {
    const storedUser = localStorage.getItem("user");
    let defaultHospital = "";
    let defaultCity = "";
    if (storedUser) {
      const u = JSON.parse(storedUser);
      if (u.role === "hospital" || u.role === "admin") {
        defaultHospital = u.name || "";
        defaultCity = u.city || "";
      }
    }
    return {
      patientName: "",
      bloodGroup: "",
      hospital: defaultHospital,
      city: defaultCity,
      contact: ""
    };
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/bloodrequests`);
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
        fetchRequests();
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating request:", err);
    }
  };

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!form.bloodGroup) {
      setErrorMsg("Please select a blood group.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/bloodrequests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSuccessMsg("Blood request registered successfully!");
        setForm({
          patientName: "",
          bloodGroup: "",
          hospital: form.hospital,
          city: form.city,
          contact: ""
        });
        fetchRequests();
      } else {
        const data = await res.json();
        setErrorMsg(data.message || "Failed to create request");
      }
    } catch (err) {
      console.error("Create request error:", err);
      setErrorMsg("Could not connect to the server.");
    } finally {
      setSubmitting(false);
    }
  };

  // Helper stats
  const activeCount = requests.filter(r => r.status !== "Completed").length;
  const urgentCount = requests.filter(r => r.status === "Urgent").length;
  const completedCount = requests.filter(r => r.status === "Completed").length;

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <div className="page-header">
          <div className="page-title-area">
            <h1 className="page-title">Hospital Console</h1>
            <p className="page-subtitle">Coordinate patient blood requests and track supply fulfillments</p>
          </div>
        </div>

        {/* Hospital Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div className="stat-number">{activeCount}</div>
            <div className="stat-label">Active Hospital Requests</div>
          </div>
          <div className="stat-card" style={{ borderLeft: "4px solid #ef4444" }}>
            <div className="stat-number" style={{ color: "#ef4444" }}>{urgentCount}</div>
            <div className="stat-label">Urgent Patient Cases</div>
          </div>
          <div className="stat-card" style={{ borderLeft: "4px solid #22c55e" }}>
            <div className="stat-number" style={{ color: "#22c55e" }}>{completedCount}</div>
            <div className="stat-label">Resolved / Discharged</div>
          </div>
        </div>

        <div className="dashboard-layout">
          {/* Left Side: Requests List */}
          <div>
            <h2 style={{ fontSize: "20px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Clock size={20} color="var(--primary)" />
              <span>Current Blood Request Logs</span>
            </h2>

            <div className="table-container">
              {loading ? (
                <div style={{ textAlign: "center", padding: "40px" }}>Loading logs...</div>
              ) : requests.length > 0 ? (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Blood Group</th>
                      <th>Hospital</th>
                      <th>Urgency</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((r) => (
                      <tr key={r._id}>
                        <td style={{ fontWeight: "600" }}>{r.patientName}</td>
                        <td>
                          <span style={{ background: "var(--primary-light)", color: "var(--primary)", fontWeight: "800", padding: "4px 8px", borderRadius: "4px" }}>
                            {r.bloodGroup}
                          </span>
                        </td>
                        <td>{r.hospital}</td>
                        <td>
                          <span className={`badge ${
                            r.status === "Completed" ? "badge-approved" : 
                            r.status === "Urgent" ? "badge-urgent" : "badge-pending"
                          }`}>
                            {r.status || "Pending"}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: "6px" }}>
                            {r.status !== "Urgent" && r.status !== "Completed" && (
                              <button 
                                onClick={() => handleUpdateStatus(r._id, "Urgent")}
                                className="btn btn-outline" 
                                style={{ padding: "6px 10px", fontSize: "11px", borderColor: "#ef4444", color: "#ef4444" }}
                              >
                                Set Urgent
                              </button>
                            )}
                            {r.status !== "Completed" && (
                              <button 
                                onClick={() => handleUpdateStatus(r._id, "Completed")}
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
                  No request logs registered in the system.
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Create Quick Request Form */}
          <div className="card" style={{ height: "fit-content" }}>
            <h2 className="card-title" style={{ marginBottom: "20px" }}>
              <PlusCircle color="var(--primary)" size={20} />
              <span>Create Patient Request</span>
            </h2>

            {successMsg && (
              <div style={{ background: "#dcfce7", border: "1px solid #bbf7d0", padding: "10px", borderRadius: "8px", color: "#15803d", fontSize: "13px", marginBottom: "16px" }}>
                {successMsg}
              </div>
            )}

            {errorMsg && (
              <div style={{ background: "#fee2e2", border: "1px solid #fecaca", padding: "10px", borderRadius: "8px", color: "#ef4444", fontSize: "13px", marginBottom: "16px" }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleCreateRequest}>
              <div className="form-group">
                <label className="form-label">Patient Name</label>
                <div className="input-container">
                  <User className="input-icon" size={16} />
                  <input
                    className="input-field"
                    style={{ padding: "10px 12px 10px 38px" }}
                    placeholder="Patient Full Name"
                    required
                    value={form.patientName}
                    onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Blood Group Required</label>
                <div className="input-container">
                  <Droplet className="input-icon" size={16} color="var(--primary)" />
                  <select
                    className="input-field select-field"
                    style={{ padding: "10px 12px 10px 38px" }}
                    value={form.bloodGroup}
                    onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
                    required
                  >
                    <option value="">Select</option>
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

              <div className="form-group">
                <label className="form-label">Hospital Name</label>
                <div className="input-container">
                  <Building2 className="input-icon" size={16} />
                  <input
                    className="input-field"
                    style={{ padding: "10px 12px 10px 38px" }}
                    required
                    value={form.hospital}
                    onChange={(e) => setForm({ ...form, hospital: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    className="input-field"
                    style={{ padding: "10px 12px", paddingLeft: "12px" }}
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    className="input-field"
                    style={{ padding: "10px 12px", paddingLeft: "12px" }}
                    required
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  />
                </div>
              </div>

              <button className="btn btn-primary btn-block" type="submit" disabled={submitting} style={{ marginTop: "12px" }}>
                {submitting ? "Submitting..." : (
                  <>
                    <Send size={14} />
                    <span>Create Request</span>
                  </>
                )}
              </button>
            </form>
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

export default HospitalDashboard;