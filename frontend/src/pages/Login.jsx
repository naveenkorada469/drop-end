import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import { API_BASE_URL } from "../config";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
        navigate("/home");
      } else {
        setError(data.message || "Login Failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">Drop-End</div>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Log in to your donor account</p>
        </div>

        {error && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fee2e2", border: "1px solid #fecaca", padding: "12px", borderRadius: "8px", color: "#ef4444", fontSize: "13px", marginBottom: "20px" }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={loginUser}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-container">
              <Mail className="input-icon" size={18} />
              <input
                className="input-field"
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "24px" }}>
            <label className="form-label">Password</label>
            <div className="input-container">
              <Lock className="input-icon" size={18} />
              <input
                className="input-field"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
            {loading ? "Logging in..." : (
              <>
                <span>Login</span>
                <LogIn size={16} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "var(--text-muted)" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "var(--primary)", fontWeight: "600" }}>
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;