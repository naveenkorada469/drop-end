import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { 
  PlusCircle, 
  User, 
  Droplet, 
  Building, 
  MapPin, 
  Phone, 
  Activity, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { API_BASE_URL } from "../config";

function BloodRequest() {
  const [form, setForm] = useState({
    patientName: "",
    bloodGroup: "",
    hospital: "",
    city: "",
    contact: ""
  });

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/bloodrequests`);
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Error fetching requests: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!form.bloodGroup) {
      setErrorMsg("Please select a blood group.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/bloodrequests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      if (res.ok) {
        setSuccessMsg("Blood request submitted successfully!");
        setForm({
          patientName: "",
          bloodGroup: "",
          hospital: "",
          city: "",
          contact: ""
        });
        fetchRequests(); // refresh active requests
      } else {
        const data = await res.json();
        setErrorMsg(data.message || "Failed to submit request.");
      }
    } catch (err) {
      console.error("Blood request submission error:", err);
      setErrorMsg("Error connecting to the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <div className="page-header">
          <div className="page-title-area">
            <h1 className="page-title">Blood Requests</h1>
            <p className="page-subtitle">Submit requests for blood donations or view existing requests</p>
          </div>
        </div>

        {successMsg && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#dcfce7", border: "1px solid #bbf7d0", padding: "14px", borderRadius: "8px", color: "#15803d", fontSize: "14px", marginBottom: "24px" }}>
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fee2e2", border: "1px solid #fecaca", padding: "14px", borderRadius: "8px", color: "#ef4444", fontSize: "14px", marginBottom: "24px" }}>
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="dashboard-layout">
          {/* Left Column: Form */}
          <div className="card" style={{ height: "fit-content" }}>
            <h2 className="card-title" style={{ marginBottom: "24px" }}>
              <PlusCircle color="var(--primary)" size={22} />
              <span>Request Blood</span>
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Patient Name</label>
                <div className="input-container">
                  <User className="input-icon" size={18} />
                  <input
                    className="input-field"
                    placeholder="Enter Patient Name"
                    required
                    value={form.patientName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        patientName: e.target.value
                      })
                    }
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label className="form-label">Blood Group</label>
                  <div className="input-container">
                    <Droplet className="input-icon" size={18} color="var(--primary)" />
                    <select
                      className="input-field select-field"
                      required
                      value={form.bloodGroup}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          bloodGroup: e.target.value
                        })
                      }
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
                  <label className="form-label">City</label>
                  <div className="input-container">
                    <MapPin className="input-icon" size={18} />
                    <input
                      className="input-field"
                      placeholder="e.g. Hyderabad"
                      required
                      value={form.city}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          city: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Hospital</label>
                <div className="input-container">
                  <Building className="input-icon" size={18} />
                  <input
                    className="input-field"
                    placeholder="Enter Hospital Name & Address"
                    required
                    value={form.hospital}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        hospital: e.target.value
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "24px" }}>
                <label className="form-label">Contact Number</label>
                <div className="input-container">
                  <Phone className="input-icon" size={18} />
                  <input
                    className="input-field"
                    placeholder="e.g. +91 9999999999"
                    required
                    value={form.contact}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        contact: e.target.value
                      })
                    }
                  />
                </div>
              </div>

              <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : (
                  <>
                    <Activity size={16} />
                    <span>Submit Blood Request</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Active Requests List */}
          <div>
            <h2 style={{ fontSize: "20px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
              <Activity color="var(--primary)" size={22} />
              <span>Active Requests</span>
            </h2>

            {loading ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)", background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: "12px" }}>
                <span>Loading active requests...</span>
              </div>
            ) : requests.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {requests.map((request) => (
                  <div key={request._id} className="card" style={{ padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
                      <div>
                        <h3 style={{ fontSize: "16px", marginBottom: "4px" }}>{request.patientName}</h3>
                        <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                          <Building size={12} />
                          {request.hospital}
                        </span>
                      </div>
                      <div className="badge badge-urgent" style={{ fontSize: "11px", fontWeight: "700" }}>
                        {request.bloodGroup} Needed
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", borderTop: "1px solid var(--border-color)", paddingTop: "12px", marginTop: "12px", color: "var(--text-muted)" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <MapPin size={12} />
                        {request.city || "Not Specified"}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Phone size={12} />
                        {request.contact || "No Contact"}
                      </span>
                    </div>

                    <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="badge badge-pending" style={{ fontSize: "10px", padding: "2px 8px" }}>
                        {request.status || "Pending"}
                      </span>
                      <a href={`tel:${request.contact}`} className="btn btn-outline" style={{ padding: "4px 10px", fontSize: "11px" }}>
                        Call Patient
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 20px", background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: "12px", color: "var(--text-muted)" }}>
                <span>No active requests right now.</span>
              </div>
            )}
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

export default BloodRequest;