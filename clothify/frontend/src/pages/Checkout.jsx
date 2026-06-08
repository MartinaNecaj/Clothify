import { useState } from 'react';
import { useCart } from '../context/CartContext';
import api from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const nav = useNavigate();
  const [shipping, setShipping] = useState({ fullName: '', address: '', city: '', postalCode: '', country: '' });
  const [method, setMethod] = useState('CashOnDelivery');
  const [err, setErr] = useState('');

  const placeOrder = async () => {
    try {
      const payload = {
        orderItems: cart.map(c => ({ product: c.product, name: c.name, price: c.price, qty: c.qty, size: c.size })),
        shippingAddress: shipping,
        paymentMethod: method
      };
      await api.post('/orders', payload);
      clearCart();
      nav('/orders');
    } catch (e) {
      setErr(e.response?.data?.message || 'Order failed');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      <input placeholder="Full name" value={shipping.fullName} onChange={e => setShipping({ ...shipping, fullName: e.target.value })} />
      <input placeholder="Address" value={shipping.address} onChange={e => setShipping({ ...shipping, address: e.target.value })} />
      <input placeholder="City" value={shipping.city} onChange={e => setShipping({ ...shipping, city: e.target.value })} />
      <input placeholder="Postal code" value={shipping.postalCode} onChange={e => setShipping({ ...shipping, postalCode: e.target.value })} />
      <input placeholder="Country" value={shipping.country} onChange={e => setShipping({ ...shipping, country: e.target.value })} />
      <select value={method} onChange={e => setMethod(e.target.value)}>
        <option value="CashOnDelivery">Cash on Delivery</option>
      </select>
      <button disabled={!cart.length} onClick={placeOrder}>Place order</button>
    </div>
  );
}
