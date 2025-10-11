import { useEffect, useState } from "react";
import api from "../../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/orders/my-orders")
      .then(res => setOrders(res.data))
      .catch(() => setError("Failed to fetch orders."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading orders...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      {orders.length > 0 ? (
        <ul className="space-y-2">
          {orders.map(order => (
            <li key={order._id} className="border p-3 rounded">
              <p>Order ID: {order._id}</p>
              <p>Status: {order.status}</p>
              <p>Total: ${order.total}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You don’t have any orders yet.</p>
      )}
    </div>
  );
};

export default Orders;