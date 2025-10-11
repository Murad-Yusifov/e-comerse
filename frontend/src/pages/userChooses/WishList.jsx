import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const WishList = () => {
  const [wish, setWish] = useState([]);

  useEffect(() => {
    const wishData = localStorage.getItem("wishlist");
    if (wishData) {
      setWish(JSON.parse(wishData));
    }
  }, []);

  const handleRemove = (id) => {
    const updated = wish.filter(item => item._id !== id);
    setWish(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  if (wish.length === 0) return <div className="p-4">Wishlist is empty.</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Wishlist</h2>
      <ul className="space-y-2">
        {wish.map(item => (
          <li key={item._id} className="flex items-center gap-4 border-b pb-2">
            <Link to={`/userChooses/product/${item._id}`} className="flex-1 flex items-center gap-2 hover:underline">
              <img src={item.image?.[0] || item.image} alt={item.name} className="w-12 h-12 object-contain" />
              <div>
                <div className="font-medium">{item.name || item.title}</div>
                <div>Price: ${item.price}</div>
                {item.count && <div>Count: {item.count}</div>}
              </div>
            </Link>
            <button onClick={() => handleRemove(item._id)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishList;