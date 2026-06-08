import { useEffect, useState } from 'react';
import api from '../api/axiosClient';

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', brand: '', category: 'Men', price: 0, sizes: ['M'], countInStock: 0, imageUrl: '' });

  const load = async () => {
    const { data } = await api.get('/products?limit=100');
    setItems(data.items);
  };

  useEffect(() => { load(); }, []);

  const create = async () => {
    await api.post('/products', form);
    setForm({ name: '', description: '', brand: '', category: 'Men', price: 0, sizes: ['M'], countInStock: 0, imageUrl: '' });
    load();
  };

  const update = async (id, patch) => { await api.put(`/products/${id}`, patch); load(); };
  const remove = async (id) => { await api.delete(`/products/${id}`); load(); };

  return (
    <div>
      <h3>Products</h3>
      <div className="create">
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Brand" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
          <option>Men</option><option>Women</option><option>Kids</option><option>Unisex</option>
        </select>
        <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
        <input placeholder="Sizes (comma separated)" value={form.sizes.join(',')} onChange={e => setForm({ ...form, sizes: e.target.value.split(',').map(s => s.trim()) })} />
        <input type="number" placeholder="Stock" value={form.countInStock} onChange={e => setForm({ ...form, countInStock: Number(e.target.value) })} />
        <input placeholder="Image URL" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
        <button onClick={create}>Create</button>
      </div>
      {items.map(p => (
        <div key={p._id} className="row">
          <div>{p.name}</div>
          <div>${p.price}</div>
          <button onClick={() => update(p._id, { price: p.price + 1 })}>+1$</button>
          <button onClick={() => remove(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
