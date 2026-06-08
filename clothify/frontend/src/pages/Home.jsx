import { Link } from 'react-router-dom';
import '../styles.css';

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Welcome to <span>Clothify</span></h1>
        <p>Discover the latest trends in fashion. Quality apparel for every style.</p>
        <div className="hero-btns">
          <Link className="btn-primary" to="/products">Browse products</Link>
          <Link className="btn-secondary" to="/register">Create account</Link>
        </div>
      </section>

      <div className="section">
        <p className="section-title">Shop by category</p>
        <p className="section-sub">Find what suits you best</p>
        <div className="cats">
          <div className="cat-card"><div className="cat-icon">👕</div><h3>T-Shirts</h3><p>Casual & everyday</p></div>
          <div className="cat-card"><div className="cat-icon">👗</div><h3>Dresses</h3><p>For every occasion</p></div>
          <div className="cat-card"><div className="cat-icon">🧥</div><h3>Jackets</h3><p>Stay warm in style</p></div>
          <div className="cat-card"><div className="cat-icon">👜</div><h3>Accessories</h3><p>Complete the look</p></div>
        </div>
      </div>

      <div className="features-section">
        <div className="section">
          <p className="section-title">Why Clothify?</p>
          <p className="section-sub">We care about your experience</p>
          <div className="features">
            <div className="feat"><div className="feat-icon">🚚</div><div><h4>Free shipping</h4><p>Free on all orders over $100</p></div></div>
            <div className="feat"><div className="feat-icon">🔒</div><div><h4>Secure checkout</h4><p>Your data is always protected</p></div></div>
            <div className="feat"><div className="feat-icon">🔄</div><div><h4>Easy returns</h4><p>30-day hassle-free returns</p></div></div>
            <div className="feat"><div className="feat-icon">🎧</div><div><h4>24/7 support</h4><p>We're always here to help</p></div></div>
          </div>
        </div>
      </div>

      <div className="cta">
        <h2>Ready to shop?</h2>
        <p>Join thousands of happy customers today.</p>
        <div className="hero-btns">
          <Link className="btn-primary" to="/products">Start shopping</Link>
          <Link className="btn-secondary" to="/login">Sign in</Link>
        </div>
      </div>
    </>
  );
}
