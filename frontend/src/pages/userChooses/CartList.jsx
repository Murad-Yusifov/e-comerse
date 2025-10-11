import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CartList = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  const handleRemove = (id) => {
    const updated = cart.filter(item => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  if (cart.length === 0) return <div className="p-4">Cart is empty.</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Cart List</h2>
      <ul className="space-y-2">
        {cart.map(item => (
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

export default CartList;