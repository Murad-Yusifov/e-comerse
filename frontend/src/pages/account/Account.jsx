import { useEffect, useState } from "react";
import api from "../../services/api";

const Account = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    api.get("/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error fetching orders:", err));
  };

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth?.user) setUser(auth.user);
    fetchOrders();
  }, []);

  const handleRemoveOrder = async (id) => {
    try {
      await api.delete(`/orders/${id}`);
      setOrders(orders => orders.filter(order => order._id !== id));
    } catch (err) {
      alert("Failed to delete order.");
    }
  };

  if (!user) return <p>Loading user info...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>

      <h2 className="text-xl mt-6 mb-2">Your Orders</h2>
      {orders.length > 0 ? (
        <ul className="space-y-2">
          {orders.map(order => (
            <li key={order._id} className="border p-3 rounded flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <p>Order ID: {order._id}</p>
                <p>Status: {order.status}</p>
                <p>Total: ${order.total}</p>
              </div>
              <button
                onClick={() => handleRemoveOrder(order._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove Order
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You don’t have any orders yet.</p>
      )}
    </div>
  );
};

export default Account;
