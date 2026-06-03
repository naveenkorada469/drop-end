import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, MapPin, Droplet, UserPlus, AlertCircle } from "lucide-react";
import { API_BASE_URL } from "../config";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bloodGroup: "",
    city: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.bloodGroup) {
      setError("Please select a blood group.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
        alert("Registration Successful! Welcome to Drop-End.");
        navigate("/donors");
      } else {
        setError(data.message || "Registration failed. Please check details.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ minHeight: "100vh", padding: "40px 20px" }}>
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">Drop-End</div>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Become a registered blood donor</p>
        </div>

        {error && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fee2e2", border: "1px solid #fecaca", padding: "12px", borderRadius: "8px", color: "#ef4444", fontSize: "13px", marginBottom: "20px" }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-container">
              <User className="input-icon" size={18} />
              <input
                className="input-field"
                placeholder="John Doe"
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-container">
              <Mail className="input-icon" size={18} />
              <input
                className="input-field"
                type="email"
                placeholder="name@example.com"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-container">
              <Lock className="input-icon" size={18} />
              <input
                className="input-field"
                type="password"
                placeholder="Create password"
                required
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
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
                  placeholder="New Delhi"
                  required
                  value={form.city}
                  onChange={(e) =>
                    setForm({ ...form, city: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <button className="btn btn-primary btn-block" type="submit" disabled={loading} style={{ marginTop: "12px" }}>
            {loading ? "Registering..." : (
              <>
                <span>Register</span>
                <UserPlus size={16} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "var(--primary)", fontWeight: "600" }}>
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;