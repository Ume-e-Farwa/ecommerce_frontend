// src/api/productApi.js
import axios from "axios";

const productApi = axios.create({
  baseURL: "http://localhost:5000/api/products", // product related routes
});

// Token attach karna (agar product add karne ke liye auth required hai)
productApi.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default productApi;
