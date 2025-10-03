import { useEffect, useState } from "react";

const slugToDBCategory = {
  laptops: "laptop",
  smartphones: "smartphone",
  cameras: "camera",
  accessories: "accessory",
  // lazım olduqca əlavə et
};

export function useProducts(slug) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Backend olmadığı üçün prototip/mock data istifadə olunur
    const mockProducts = [
      { id: 1, name: "Laptop A", category: "laptop", price: 1200 },
      { id: 2, name: "Smartphone B", category: "smartphone", price: 800 },
      { id: 3, name: "Camera C", category: "camera", price: 500 },
      { id: 4, name: "Accessory D", category: "accessory", price: 50 },
    ];

    // Kategoriya filteri tətbiq et
    let filtered = mockProducts;
    if (slug) {
      const apiCategory = slugToDBCategory[slug] ?? slug;
      filtered = mockProducts.filter(p => p.category === apiCategory);
    }

    // Asinxronluq simulyasiyası üçün setTimeout istifadə olunur
    setTimeout(() => {
      setProducts(filtered);
      setLoading(false);
    }, 500);
  }, [slug]);

  return { products, loading, error };
}
