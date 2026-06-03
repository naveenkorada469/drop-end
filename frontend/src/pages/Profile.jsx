import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { 
  User, 
  Mail, 
  Droplet, 
  MapPin, 
  Camera, 
  Save, 
  CheckCircle, 
  AlertCircle 
} from "lucide-react";
import { API_BASE_URL } from "../config";

function Profile() {
  const fileInputRef = useRef(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {};
  });
  const [formData, setFormData] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      return {
        name: parsed.name || "",
        email: parsed.email || "",
        bloodGroup: parsed.bloodGroup || "",
        city: parsed.city || "",
        profilePic: parsed.profilePic || ""
      };
    }
    return {
      name: "",
      email: "",
      bloodGroup: "",
      city: "",
      profilePic: ""
    };
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate size (limit to 1MB to keep database payload clean)
    if (file.size > 1024 * 1024) {
      setErrorMsg("Image size should be less than 1MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        profilePic: reader.result // Base64 representation of the image
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/users/profile/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.user) {
        // Save back updated user object to local storage
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setSuccessMsg("Profile updated successfully!");
        
        // Dispatch custom storage event to alert other components like Navbar
        window.dispatchEvent(new Event("storage"));
      } else {
        setErrorMsg(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Profile save error: ", err);
      setErrorMsg("Could not save profile changes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <div className="page-header">
          <div className="page-title-area">
            <h1 className="page-title">Donor Profile</h1>
            <p className="page-subtitle">Manage your personal information and profile picture</p>
          </div>
        </div>

        {successMsg && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#dcfce7", border: "1px solid #bbf7d0", padding: "14px", borderRadius: "8px", color: "#15803d", fontSize: "14px", marginBottom: "24px" }}>
            <CheckCircle size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fee2e2", border: "1px solid #fecaca", padding: "14px", borderRadius: "8px", color: "#ef4444", fontSize: "14px", marginBottom: "24px" }}>
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="card" style={{ padding: "40px" }}>
          <form onSubmit={handleSave} className="profile-card">
            {/* Left Section: Avatar Upload */}
            <div className="profile-avatar-sec">
              <div className="profile-pic-container" onClick={triggerFileInput}>
                {formData.profilePic ? (
                  <img 
                    src={formData.profilePic} 
                    alt="Profile" 
                    className="profile-pic-img"
                  />
                ) : (
                  <div className="profile-pic-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fee2e2', color: '#d32f2f', fontWeight: '800', fontSize: '48px' }}>
                    {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                <div className="profile-pic-overlay">
                  <Camera size={20} />
                  <span>Upload Photo</span>
                </div>
              </div>

              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="profile-file-input" 
                accept="image/*"
              />

              <h3 className="profile-username">{user.name || "Donor Name"}</h3>
              <span className="profile-role-badge">{user.role || "Donor"}</span>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
                Click photo to change. Max size 1MB.
              </p>
            </div>

            {/* Right Section: Form Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-container">
                  <User className="input-icon" size={18} />
                  <input
                    className="input-field"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
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
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div className="form-group">
                  <label className="form-label">Blood Group</label>
                  <div className="input-container">
                    <Droplet className="input-icon" size={18} color="var(--primary)" />
                    <select
                      className="input-field select-field"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
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
                  <label className="form-label">City</label>
                  <div className="input-container">
                    <MapPin className="input-icon" size={18} />
                    <input
                      className="input-field"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading}
                style={{ alignSelf: "flex-end", marginTop: "12px" }}
              >
                {loading ? (
                  <span>Saving...</span>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
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

export default Profile;