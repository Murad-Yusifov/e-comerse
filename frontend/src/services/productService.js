// src/services/productService.js
import api from "./api";

export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const createProduct = async (data) => {
  const res = await api.post("/products", data);
  return res.data;
};

export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};
