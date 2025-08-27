import api from "./axios";

// register
export const registerUser = (userData) => api.post("/register", userData);

// login
export const loginUser = (userData) => api.post("/login", userData);

// profile
export const getProfile = () => api.get("/profile");
