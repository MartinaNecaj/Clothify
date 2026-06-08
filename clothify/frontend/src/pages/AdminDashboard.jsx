import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div>
      <h2>Admin</h2>
      <ul>
        <li><Link to="/admin/products">Manage Products</Link></li>
        <li><Link to="/admin/orders">Manage Orders</Link></li>
      </ul>
    </div>
  );
}
