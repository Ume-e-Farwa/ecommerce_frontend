import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./api/authapi";

export default function Register({ setIsAuth }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await registerUser(form);

  //     // ✅ Remove localStorage, only save in database
  //     // localStorage.setItem("token", res.data.token); // remove this line

  //     // Set auth state true for navbar
  //     setIsAuth(true);

  //     alert(res.data.message);

  //     // Redirect to home
  //     navigate("/");
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Error");
  //   }                 
  // };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await registerUser(form);

    setIsAuth(true); // Navbar update
    alert(res.data.message); // Success message
    navigate("/"); // Redirect
  } catch (err) {
    // ❌ clearly show duplicate email or other errors
    if (err.response?.status === 400) {
      alert(err.response.data.message); // e.g. "User already exists"
    } else {
      alert("❌ Registration failed: " + (err.response?.data?.message || err.message));
    }
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Register</h2>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
