import { useState } from "react";
import Navbar from "../components/Navbar";

function BloodRequest() {
  const [form, setForm] = useState({
    patientName: "",
    bloodGroup: "",
    hospital: "",
    city: "",
    contact: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(
      "https://drop-end.onrender.com/api/bloodrequests",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      }
    );

    alert("Request Sent");
  };

  return (
    <>
      <Navbar />

      <h2>Blood Request</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Patient Name"
          onChange={(e) =>
            setForm({
              ...form,
              patientName: e.target.value
            })
          }
        />

        <input
          placeholder="Blood Group"
          onChange={(e) =>
            setForm({
              ...form,
              bloodGroup: e.target.value
            })
          }
        />

        <input
          placeholder="Hospital"
          onChange={(e) =>
            setForm({
              ...form,
              hospital: e.target.value
            })
          }
        />

        <button>Submit</button>
      </form>
    </>
  );
}

export default BloodRequest;