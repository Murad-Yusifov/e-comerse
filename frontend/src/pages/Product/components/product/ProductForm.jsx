// src/components/product/ProductForm.jsx
import { useState, useEffect } from "react";
import { createProduct } from "../../../../services/productService";
import { getCategories } from "../../../../services/categoryService";

const ProductForm = ({ onAdded }) => {
  const [form, setForm] = useState({ title: "", price: "", description: "", category: "" });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = { ...form, price: Number(form.price) };
      await createProduct(payload);
      onAdded(); // refresh products
      setForm({ title: "", price: "", description: "", category: "" , image: ""});
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" required />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Img..." />
      <select className="bg-[#2c2c2c]" name="category" value={form.category} onChange={handleChange} required>
        <option  value="">Select Category</option>
        {categories.map((cat) => (
          <option className="text-black" key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>
      <button type="submit">Add</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
};

export default ProductForm;
