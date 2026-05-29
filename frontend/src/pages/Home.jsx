import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">

      <h1>DROP-END</h1>

      <p>Donate Blood Save Lives</p>

      <Link to="/register">
        <button>Become Donor</button>
      </Link>

    </div>
  );
};

export default Home;