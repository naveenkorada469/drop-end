import React, { useEffect, useState } from "react";

const Donors = () => {

  const [donors, setDonors] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/api/users/donors")

      .then((res) => res.json())

      .then((data) => {
        setDonors(data);
      })

      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <div className="donor-container">

      {
        donors.map((donor) => (

          <div className="card" key={donor._id}>

            <h3>{donor.name}</h3>

            <p>
              <b>Blood Group:</b> {donor.bloodGroup}
            </p>

            <p>
              <b>City:</b> {donor.city}
            </p>

            <p>
              <b>Email:</b> {donor.email}
            </p>

          </div>

        ))
      }

    </div>
  );
};

export default Donors;