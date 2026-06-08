import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosClient';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get(`/products/${id}`).then(({ data }) => {
      setP(data);
      setSize(data.sizes?.[0] || '');
    });
  }, [id]);

  if (!p) return <div>Loading...</div>;

  return (
    <div>
      <img src={p.imageUrl} alt={p.name} />
      <h3>{p.name}</h3>
      <p>{p.description}</p>
      <div>${p.price}</div>
      <div>
        <label>Size</label>
        <select value={size} onChange={e => setSize(e.target.value)}>
          {p.sizes?.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label>Qty</label>
        <input type="number" min="1" max={p.countInStock} value={qty} onChange={e => setQty(Number(e.target.value))} />
      </div>
      <button
        disabled={p.countInStock <= 0}
        onClick={() => addToCart({ product: p._id, name: p.name, price: p.price, size, qty, imageUrl: p.imageUrl })}
      >
        Add to cart
      </button>
    </div>
  );
}
