import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Clothify</h1>
      <p>Discover our latest apparel.</p>
      <Link to="/products">Browse products</Link>
    </div>
  );
}
