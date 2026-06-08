import { useEffect, useState } from 'react';
import api from '../api/axiosClient';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const { data } = await api.get('/orders');
    setOrders(data);
  };

  useEffect(() => { load(); }, []);

  const deliver = async (id) => {
    await api.put(`/orders/${id}/deliver`);
    load();
  };

  return (
    <div>
      <h3>All Orders</h3>
      {orders.map(o => (
        <div key={o._id} className="row">
          <div>{o.user?.name} - ${o.totalPrice}</div>
          <div>{o.isDelivered ? 'Delivered' : 'Pending'}</div>
          {!o.isDelivered && <button onClick={() => deliver(o._id)}>Mark Delivered</button>}
        </div>
      ))}
    </div>
  );
}
