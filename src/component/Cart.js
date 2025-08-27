import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = ({ userId, cart, setCart, setCartCount }) => {
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Cart from Backend
  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCart(res.data.products || []);
      setCartCount(res.data.products.length);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // ✅ Remove item
  const removeFromCart = async (productId) => {
    try {
      await axios.post("http://localhost:5000/api/cart/remove", {
        userId,
        productId,
      });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  return (
    <div className="cart-page container">
      <h2 className="my-4">🛒 Your Cart</h2>

      {loading ? (
        <p>Loading...</p>
      ) : cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center border p-2 my-2"
            >
              <div>
                <h5>{item.productId?.name || item.name}</h5>
                <p>${item.productId?.price || item.price}</p>
                <p>Qty: {item.quantity}</p>
              </div>
              <img
                src={item.productId?.image || item.image}
                alt={item.productId?.name || item.name}
                width="80"
              />
              <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                  removeFromCart(item.productId?._id || item.id)
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
