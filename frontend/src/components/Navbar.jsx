import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Droplet, 
  Home, 
  Users, 
  FileText, 
  Activity, 
  Shield, 
  User as UserIcon, 
  Phone, 
  LogOut, 
  ChevronDown 
} from "lucide-react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => navigate("/home")}>
        <Droplet size={26} color="#d32f2f" fill="#d32f2f" className="pulse-icon" style={{ animation: "pulse 2s infinite" }} />
        <span>Drop-End</span>
      </div>

      <div className="nav-links">
        <Link to="/home" className={`nav-link ${isActive("/home")}`}>
          <Home size={18} />
          <span>Home</span>
        </Link>
        <Link to="/donors" className={`nav-link ${isActive("/donors")}`}>
          <Users size={18} />
          <span>Donors</span>
        </Link>
        <Link to="/bloodrequest" className={`nav-link ${isActive("/bloodrequest")}`}>
          <FileText size={18} />
          <span>Requests</span>
        </Link>
        <Link to="/hospital" className={`nav-link ${isActive("/hospital")}`}>
          <Activity size={18} />
          <span>Hospital</span>
        </Link>
        <Link to="/admin" className={`nav-link ${isActive("/admin")}`}>
          <Shield size={18} />
          <span>Admin</span>
        </Link>
        <Link to="/contact" className={`nav-link ${isActive("/contact")}`}>
          <Phone size={18} />
          <span>Contact</span>
        </Link>
      </div>

      <div className="nav-actions">
        {user ? (
          <div className="nav-avatar-dropdown">
            <button 
              className="nav-avatar-btn" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.profilePic ? (
                <img 
                  src={user.profilePic} 
                  alt={user.name} 
                  className="nav-avatar-img"
                />
              ) : (
                <div className="nav-avatar-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fee2e2', color: '#d32f2f', fontWeight: 'bold', fontSize: '14px' }}>
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <span className="nav-avatar-name">{user.name}</span>
              <ChevronDown size={14} color="#64748b" />
            </button>

            {dropdownOpen && (
              <div className="nav-dropdown-menu" onMouseLeave={() => setDropdownOpen(false)}>
                <button 
                  className="nav-dropdown-item" 
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/profile");
                  }}
                >
                  <UserIcon size={16} />
                  <span>My Profile</span>
                </button>
                <button 
                  className="nav-dropdown-item logout-btn" 
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/" className="btn btn-primary" style={{ padding: "8px 16px", borderRadius: "8px" }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;