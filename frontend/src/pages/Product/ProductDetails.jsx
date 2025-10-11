import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [orderMsg, setOrderMsg] = useState("");

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => {
        // Fallback: try to find product in localStorage (wishlist or cart)
        const wish = JSON.parse(localStorage.getItem("wishlist")) || [];
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const found = wish.find(p => p._id === id) || cart.find(p => p._id === id);
        if (found) {
          setProduct(found);
        } else {
          setError("Failed to fetch product.");
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleOrder = async () => {
    setOrderMsg("");
    if (!product) return;
    try {
      const orderData = {
        items: [{ product: product._id, qty: 1, price: product.price }],
        total: product.price,
        shipping: { address: "", city: "", zip: "", country: "" },
      };
      await api.post("/orders", orderData);
      setOrderMsg("Order placed successfully!");
    } catch (err) {
      setOrderMsg("Failed to place order. Please login or try again.");
    }
  };

  if (loading) return <div className="p-4">Loading product...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!product) return <div className="p-4">Product not found.</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{product.name || product.title}</h2>
      {product.image && (
        <img src={Array.isArray(product.image) ? product.image[0] : product.image} alt={product.name} className="w-64 h-64 object-contain mb-4" />
      )}
      <div className="mb-2">Price: <span className="text-green-600 font-bold">${product.price}</span></div>
      <div className="mb-2">Category: {product.category?.name || product.category}</div>
      <div className="mb-2">Description: {product.description}</div>
      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={handleOrder}
      >
        Order Now
      </button>
      {orderMsg && <div className="mt-2 text-blue-600">{orderMsg}</div>}
    </div>
  );
};

export default ProductDetails;
