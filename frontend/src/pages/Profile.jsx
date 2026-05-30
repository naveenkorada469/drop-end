import Navbar from "../components/Navbar";

function Profile() {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  return (
    <>
      <Navbar />

      <h2>Profile</h2>

      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Blood Group: {user.bloodGroup}</p>
      <p>City: {user.city}</p>
    </>
  );
}

export default Profile;