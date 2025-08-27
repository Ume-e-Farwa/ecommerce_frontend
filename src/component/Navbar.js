import { Link } from "react-router-dom";

export default function Navbar({ isAuth, setIsAuth, cartCount }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
      <Link className="navbar-brand fw-bold" to="/">
        Clothing Store
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/addproduct">Add Product</Link>
          </li>

          {/* 🛒 Cart link with badge */}
          <li className="nav-item">
            <Link className="nav-link d-flex align-items-center" to="/cart">
              🛒 Cart{" "}
              <span className="badge bg-danger ms-1">{cartCount}</span>
            </Link>
          </li>

          {isAuth ? (
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/profile">
                👤 Profile
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item ms-2">
                <Link className="nav-link" to="/register">
                  <button className="btn btn-success px-3">Get Started</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
