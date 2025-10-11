import { useEffect, useState, useContext } from "react";
import { deleteProduct, getProducts } from "../../services/productService";
import ProductForm from "./components/product/ProductForm";
import { AuthContext } from "../../context/authContext";
// import { getProducts, deleteProduct } from "../../services/productService";
// import ProductForm from "../../components/product/ProductForm";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);

  // Fetch products from backend
  const loadProducts = async () => {
    try {
      const data = await getProducts();
      // Only show products owned by the logged-in user (or all if admin)
      let filtered = data;
      if (user && user.role !== "admin") {
        filtered = data.filter(p => p.owner === user._id);
      }
      setProducts(filtered);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  // Delete a product by ID
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      loadProducts(); // refresh after delete
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  // Run once on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-3">Product Management</h1>

      {/* Only admin can add new product */}
      {user && user.role === "admin" && <ProductForm onAdded={loadProducts} />}

      <hr className="my-4" />

      {/* List all products */}
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p._id} className="flex justify-between items-center border-b py-2">
              <span>
                <strong>{p.name || p.title}</strong> — ${p.price}
              </span>
              {/* Only admin can delete products */}
              {user && user.role === "admin" && (
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;





// // src/pages/Product/Products.jsx
// import { useEffect, useState } from "react";
// import { getProducts, deleteProduct } from "../../services/productService";

// const Products = () => {
//   const [products, setProducts] = useState([]);

//   const loadProducts = async () => {
//     const data = await getProducts();
//     setProducts(data);
//   };

//   const handleDelete = async (id) => {
//     await deleteProduct(id);
//     loadProducts();
//   };

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2>Products</h2>
//       {products.map((p) => (
//         <div key={p._id}>
//           <span>{p.name} – ${p.price}</span>
//           <button onClick={() => handleDelete(p._id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Products;




















// import { useParams } from "react-router-dom";
// import { useProducts } from "../../hooks/useProducts";


// const ProductsPage = () => {
//   const { slug } = useParams(); // məsələn "/laptops"
//   const { products, loading, error } = useProducts(slug);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div>
//       I called you pikachu
//       {products.map((p) => (
//         <div key={p.id}>{p.name}</div>
//       ))}
//     </div>
//   );
// };

// export default ProductsPage;
