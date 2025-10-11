import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

export function useUserProducts(user) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setError(null);
    getProducts()
      .then((data) => {
        let filtered = data;
        if (user.role !== "admin") {
          filtered = data.filter((p) => p.owner === user._id);
        }
        setProducts(filtered);
      })
      .catch((err) => setError(err?.message || "Failed to load products"))
      .finally(() => setLoading(false));
  }, [user]);

  return { products, loading, error };
}
