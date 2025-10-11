import { useState } from "react";
import { deleteProduct } from "../services/productService";

export function useDeleteProduct(onSuccess) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProduct(id);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err?.message || "Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading, error };
}
