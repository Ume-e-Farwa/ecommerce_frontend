import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Place Order
  const placeOrder = async () => {
    try {
      await axios.post("http://localhost:5000/api/orders/create", { userId });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>📦 Your Orders</h2>
      <button onClick={placeOrder}>Place Order</button>

      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              Order #{order._id} - Status: {order.status} - Total: {order.totalAmount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default Orders;
