import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleProductLocal = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Try to find the product in localStorage (wishlist or cart)
    const wish = JSON.parse(localStorage.getItem("wishlist")) || [];
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const found = wish.find(p => p._id === id) || cart.find(p => p._id === id);
    setProduct(found || null);
  }, [id]);

  if (!product) return <div className="p-4">Product not found in your cart or wishlist.</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{product.name || product.title}</h2>
      {product.image && (
        <img src={Array.isArray(product.image) ? product.image[0] : product.image} alt={product.name} className="w-64 h-64 object-contain mb-4" />
      )}
      <div className="mb-2">Price: <span className="text-green-600 font-bold">${product.price}</span></div>
      <div className="mb-2">Category: {product.category?.name || product.category}</div>
      <div className="mb-2">Description: {product.description}</div>
      {product.count && <div className="mb-2">Count: {product.count}</div>}
    </div>
  );
};

export default SingleProductLocal;
