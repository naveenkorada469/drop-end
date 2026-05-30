import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/home">Home</Link> |
      <Link to="/donors"> Donors</Link> |
      <Link to="/bloodrequest"> Request</Link> |
      <Link to="/hospital"> Hospital</Link> |
      <Link to="/admin"> Admin</Link> |
      <Link to="/profile"> Profile</Link> |
      <Link to="/contact"> Contact</Link>
    </nav>
  );
}

export default Navbar;