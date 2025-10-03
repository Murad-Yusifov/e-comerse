import { useParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";


const ProductsPage = () => {
  const { slug } = useParams(); // məsələn "/laptops"
  const { products, loading, error } = useProducts(slug);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      I called you pikachu
      {products.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
};

export default ProductsPage;
