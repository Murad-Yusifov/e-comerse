// src/services/categoryService.js
import api from "./api";

// Get all categories
export const getCategories = async () => {
  const res = await api.get("/categories");
  return res.data;
};

// Create new category
export const createCategory = async (data) => {
  const res = await api.post("/categories", data);
  return res.data;
};

// Delete category by id
export const deleteCategory = async (id) => {
  await api.delete(`/categories/${id}`);
};
