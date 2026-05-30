import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Donors() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    fetch(
      "https://drop-end.onrender.com/api/users"
    )
      .then((res) => res.json())
      .then((data) => setDonors(data));
  }, []);

  return (
    <>
      <Navbar />

      <h2>Donor List</h2>

      {donors.map((donor) => (
        <div key={donor._id}>
          <h3>{donor.name}</h3>
          <p>{donor.bloodGroup}</p>
          <p>{donor.city}</p>
        </div>
      ))}
    </>
  );
}

export default Donors;