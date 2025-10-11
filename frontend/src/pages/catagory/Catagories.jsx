import { useEffect, useState, useContext } from "react";
import { deleteCategory, getCategories } from "../../services/categoryService";
import { getProducts } from "../../services/productService";
import CategoryForm from "../../components/CatagoryForm";
import { AuthContext } from "../../context/authContext";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const { user } = useContext(AuthContext);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  const loadProducts = async () => {
    try {
      const products = await getProducts();
      // Only show products owned by the logged-in user (or all if admin)
      let filtered = products;
      if (user && user.role !== "admin") {
        filtered = products.filter(p => p.owner === user._id);
      }
      // Group products by category id (handle both string and object)
      const grouped = {};
      filtered.forEach((product) => {
        let catId = product.category;
        if (catId && typeof catId === 'object' && catId._id) {
          catId = catId._id;
        }
        if (!catId) return;
        if (!grouped[catId]) grouped[catId] = [];
        grouped[catId].push(product);
      });
      setProductsByCategory(grouped);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      loadCategories();
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
  };

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-3">Category Management</h1>

      {/* Only admin can add new category */}
      {user && user.role === "admin" && <CategoryForm onAdded={loadCategories} />}

      <hr className="my-4" />

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="space-y-8">
          {categories.map((c) => (
            <div key={c._id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-black">
                  <strong>{c.name}</strong> — {c.slug}
                </span>
                {/* Only admin can delete categories */}
                {user && user.role === "admin" && (
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {(productsByCategory[c._id] || []).length === 0 ? (
                  <div className="col-span-full text-gray-500">No products in this category.</div>
                ) : (
                  productsByCategory[c._id].map((product) => (
                    <div key={product._id} className="border rounded p-3 flex flex-col items-center">
                      {product.image && (
                        <img src={product.image} alt={product.name} className="w-24 h-24 object-contain mb-2" />
                      )}
                      <div className="font-medium">{product.name}</div>
                      <div className="text-green-600 font-bold">${product.price}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
