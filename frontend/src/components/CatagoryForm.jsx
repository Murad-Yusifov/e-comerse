import { useState } from "react";
import { createCategory } from "../services/categoryService";
// import { createCategory } from "../../services/categoryService";

const CategoryForm = ({ onAdded }) => {
  const [form, setForm] = useState({ name: "", slug: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.slug) return alert("Fill all fields");

    try {
      await createCategory(form);
      onAdded(); // refresh list
      setForm({ name: "", slug: "" });
    } catch (err) {
      console.error("Failed to create category:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Category name"
        className="border px-2 py-1 rounded"
      />
      <input
        type="text"
        name="slug"
        value={form.slug}
        onChange={handleChange}
        placeholder="Slug"
        className="border px-2 py-1 rounded"
      />
      <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">
        Add
      </button>
    </form>
  );
};

export default CategoryForm;
