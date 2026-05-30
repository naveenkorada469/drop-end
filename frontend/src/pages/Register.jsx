import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bloodGroup: "",
    city: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://drop-end.onrender.com/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      }
    );

    if (res.ok) {
      alert("Registration Successful");
      navigate("/");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
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
          placeholder="City"
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
        />

        <button>Register</button>
      </form>

      <Link to="/">Already have account?</Link>
    </div>
  );
}

export default Register;