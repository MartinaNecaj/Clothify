import { useEffect, useState } from 'react';
import api from '../api/axiosClient';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders/mine').then(({ data }) => setOrders(data));
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map(o => (
        <div key={o._id} className="order">
          <div>Items: {o.orderItems.map(i => `${i.name} x${i.qty}`).join(', ')}</div>
          <div>Total: ${o.totalPrice}</div>
          <div>Status: {o.isDelivered ? 'Delivered' : 'Processing'}</div>
          <div>Placed: {new Date(o.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
