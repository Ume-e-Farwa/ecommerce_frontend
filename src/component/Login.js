import { useState } from "react";
import { loginUser } from "./api/authapi";
import { useNavigate,Link } from "react-router-dom";

export default function Login({ setIsAuth }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token); // save token
      setIsAuth(true); // update auth state
      alert("Login Successful ✅");
      navigate("/"); // redirect to products/home
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
<>







<div className="d-flex justify-content-center align-items-center vh-100">
  <div className="card p-4 shadow" style={{ width: "400px" }}>
    <form onSubmit={handleSubmit}>
      {/* Email Field */}
      <div className="form-outline mb-4">
        <input
          type="email"
          placeholder="Email"
          className="form-control"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <label className="form-label">Email address</label>
      </div>

      {/* Password Field */}
      <div className="form-outline mb-4">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <label className="form-label">Password</label>
      </div>

      {/* Remember me & Forgot password */}
      <div className="row mb-4">
        <div className="col d-flex justify-content-center">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="remember" />
            <label className="form-check-label" htmlFor="remember">
              Remember me
            </label>
          </div>
        </div>
        <div className="col text-right">
          <a href="/">Forgot password?</a>
        </div>
      </div>

      {/* Submit button */}
      <button type="submit" className="btn btn-primary btn-block mb-4">
        Sign in
      </button>

      {/* Register */}
      <div className="text-center">
        <p>
          Not a member?{" "}
          <Link to="/register" className="ml-2">
            Register
          </Link>
        </p>
        <p>or sign up with:</p>

        {/* Social buttons */}
        <div>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-github"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</div>


</>

    // <form onSubmit={handleSubmit}>
    //   <h2>Login</h2>
    //   <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
    //   <input
    //     type="password"
    //     placeholder="Password"
    //     onChange={(e) => setForm({ ...form, password: e.target.value })}
    //   />
    //   <button type="submit">Login</button>
    // </form>
  );
}
