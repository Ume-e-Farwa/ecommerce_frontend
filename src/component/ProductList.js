import React, { useEffect, useState } from "react";
import axios from "axios";
import productApi from "./api/productApi";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h2>All Products</h2>
      {products.map((p) => (
        <div key={p._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <h3>{p.name}</h3>
          <img src={p.image} alt={p.name} style={{ width: "100px" }} />
          <p>{p.description}</p>
          <p><b>Price:</b> ${p.price}</p>
          <p><b>Category:</b> {p.category}</p>
          <p><b>Size:</b> {p.size}</p>
        </div>
      ))}
    </div>
  );
}
