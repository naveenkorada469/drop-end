import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Donors from "./pages/Donors";

function App() {
  return (
    <BrowserRouter>

      <nav className="navbar">

        <h2>Blood Bank</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/donors">Donors</Link>
        </div>

      </nav>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/donors" element={<Donors />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;