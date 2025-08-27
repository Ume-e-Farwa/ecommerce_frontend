import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Shop from "./component/Shop";
import Login from "./component/Login";
import Register from "./component/Register";
import AddProduct from "./component/AddProduct";
import Profile from "./component/Profile";
import Orders from "./component/Orders";
import Products from "./component/product";
import ProductDetails from "./component/ProductDetails";
import Cart from "./component/Cart";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null);

  // 🛒 Cart state
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // ✅ check token and userId in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (token) setIsAuth(true);
    if (storedUserId) setUserId(storedUserId);
  }, []);

  return (
    <Router>
      {/* Navbar me cart count bheja */}
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} cartCount={cart.length} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        
        {/* Products + Details */}
        <Route path="/products" element={<Products addToCart={addToCart} />} />
        <Route path="/products/:id" element={<ProductDetails addToCart={addToCart} />} />

        {/* Cart */}
        <Route 
          path="/cart" 
          element={isAuth ? <Cart cart={cart} /> : <Navigate to="/login" />} 
        />

        {/* Protected Routes */}
        <Route 
          path="/addproduct" 
          element={isAuth ? <AddProduct /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={isAuth ? <Profile /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/orders" 
          element={isAuth ? <Orders userId={userId} /> : <Navigate to="/login" />} 
        />

        {/* Auth Routes */}
        <Route 
          path="/login" 
          element={isAuth ? <Navigate to="/" /> : <Login setIsAuth={setIsAuth} />} 
        />
        <Route 
          path="/register" 
          element={isAuth ? <Navigate to="/" /> : <Register />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
