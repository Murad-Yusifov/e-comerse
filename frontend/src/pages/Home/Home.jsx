import Collections from './components/collections/Collections'
import SendMail from './components/common/SendMail'
import { useEffect, useState } from 'react';
import { getCategories } from '../../services/categoryService';
import { getProducts } from '../../services/productService';
import { useLocation } from 'react-router-dom';
import Banner from './components/Banner';


const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();

  // Helper to get query params for filtering
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      q: params.get("q") || "",
      min: parseFloat(params.get("min")) || 0,
      max: parseFloat(params.get("max")) || Infinity,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allCategories, allProducts] = await Promise.all([
          getCategories(),
          getProducts()
        ]);
        setCategories(allCategories);

        // Filter products by query params
        const { q, min, max } = getQueryParams();
        const filtered = allProducts.filter((p) => {
          const matchName = q
            ? (p.title || p.name || "").toLowerCase().includes(q.toLowerCase())
            : true;
          const matchPrice = p.price >= min && p.price <= max;
          return matchName && matchPrice;
        });
        setProducts(filtered);
      } catch (err) {
        setError("Failed to load data");
      }
    };
    fetchData();
  }, [location.search]);

  // Determine which section to show based on the route
  const path = location.pathname.toLowerCase();

  let content = null;
  if (path === "/" || path === "/home") {
    content = <Collections data={products} />;
  } else if (path === "/hot-deals") {
    const hotDeals = products.filter(p => p.isHotDeal || (categories.find(c => c._id === p.category)?.slug === "hot-deals"));
    content = <Collections data={hotDeals} />;
  } else if (path === "/categories" || path === "/catagories") {
    content = (
      <div className="w-full max-w-md bg-white rounded shadow p-4 my-4">
        <h2 className="text-lg font-bold mb-2">Categories</h2>
        {error && <div className="text-red-500">{error}</div>}
        <ul className='flex flex-wrap justify-around items-center text-black'>
          {categories.map(cat => (
            <li key={cat._id}>{cat.name} <span className="text-gray-400">({cat.slug})</span></li>
          ))}
        </ul>
      </div>
    );
  } else if (categories.some(cat => path === `/${cat.slug}`)) {
    // Dynamic: show products for any category slug
    const slug = path.replace("/", "");
    const category = categories.find(cat => cat.slug === slug);
    const filteredProducts = category
      ? products.filter(p => {
          if (!p.category) return false;
          if (typeof p.category === 'object' && p.category._id) {
            return p.category._id === category._id;
          }
          return p.category === category._id;
        })
      : [];
    content = <Collections data={filteredProducts} />;
  } else {
    content = <div className="text-gray-500">Section not found.</div>;
  }

  return (
    <div className='w-full h-full flex flex-col gap-4 justify-center items-center'>
      {content}
      <SendMail/>
      <Banner/>
    </div>
  );
}

export default Home
