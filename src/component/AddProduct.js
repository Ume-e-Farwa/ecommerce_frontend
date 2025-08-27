import React, { useState } from "react";
import productApi from "./api/productApi";  

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    category: "",
    size: "",
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await productApi.post("/", form);
      alert("✅ Product Added!");
      setForm({
        name: "",
        image: "",
        description: "",
        price: "",
        category: "",
        size: "",
      });
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h2>Add Product</h2>
      <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
      <input type="text" name="size" placeholder="Size" value={form.size} onChange={handleChange} required />
      <button type="submit">Add Product</button>
    </form>
  );
}
