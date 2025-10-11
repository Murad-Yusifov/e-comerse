// src/services/authService.js
import api from "./api.js";

// Login user
export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // { token, user }
};

// Register user
export const register = async (name, email, password) => {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data; // { token?, user }
};


