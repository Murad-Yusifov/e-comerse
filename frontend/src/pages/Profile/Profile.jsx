// src/pages/Profile/Profile.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/users/me"); // protected route
        setUser(res.data.user);
        setOrders(res.data.orders);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>

      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id}>
              <strong>Order #{order._id}</strong> — Status: {order.status}
              <div>
                <h4>Shipping:</h4>
                <p>{order.shipping.address}</p>
                <p>{order.shipping.city}, {order.shipping.zip}</p>
                <p>{order.shipping.country}</p>
              </div>
              <div>
                <h4>Items:</h4>
                {order.items.map(item => (
                  <p key={item._id}>{item.product.name} x {item.qty} — ${item.price}</p>
                ))}
              </div>
              <p>Total: ${order.total}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
