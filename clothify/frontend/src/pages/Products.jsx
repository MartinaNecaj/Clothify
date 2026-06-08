import { useEffect, useState } from 'react';
import api from '../api/axiosClient';
import { Link } from 'react-router-dom';

export default function Products() {
  const [q, setQ] = useState({ keyword: '', category: '', minPrice: '', maxPrice: '' });
  const [data, setData] = useState({ items: [], page: 1, pages: 1, total: 0 });

  const fetchData = async (page = 1) => {
    const params = new URLSearchParams({ ...q, page });
    const { data } = await api.get(`/products?${params.toString()}`);
    setData(data);
  };

  useEffect(() => { fetchData(1); }, []);

  return (
    <div>
      <h2>Products</h2>
      <div className="filters">
        <input placeholder="Search" value={q.keyword} onChange={e => setQ({ ...q, keyword: e.target.value })} />
        <select value={q.category} onChange={e => setQ({ ...q, category: e.target.value })}>
          <option value="">All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
          <option value="Unisex">Unisex</option>
        </select>
        <input placeholder="Min" type="number" value={q.minPrice} onChange={e => setQ({ ...q, minPrice: e.target.value })} />
        <input placeholder="Max" type="number" value={q.maxPrice} onChange={e => setQ({ ...q, maxPrice: e.target.value })} />
        <button onClick={() => fetchData(1)}>Apply</button>
      </div>
      <div className="grid">
        {data.items.map(p => (
          <Link key={p._id} to={`/products/${p._id}`}>
            <div className="card">
              <img src={p.imageUrl} alt={p.name} />
              <div>{p.name}</div>
              <div>${p.price}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: data.pages }, (_, i) => i + 1).map(pg => (
          <button key={pg} onClick={() => fetchData(pg)} disabled={pg === data.page}>{pg}</button>
        ))}
      </div>
    </div>
  );
}
