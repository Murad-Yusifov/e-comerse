import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCategories()
      .then((data) => setCategories(data))
      .catch((err) => setError(err?.message || "Failed to load categories"))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}
