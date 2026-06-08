import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <>
          {cart.map(item => (
            <div key={item.product + item.size} className="row">
              <img src={item.imageUrl} alt={item.name} width={60} />
              <div>{item.name} - {item.size}</div>
              <div>${item.price}</div>
              <div>x{item.qty}</div>
              <button onClick={() => removeFromCart(item.product, item.size)}>Remove</button>
            </div>
          ))}
          <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
          <button onClick={() => nav(user ? '/checkout' : '/login?redirect=/checkout')}>
            Proceed to Checkout
          </button>
        </>
      )}
      <Link to="/products">Continue shopping</Link>
    </div>
  );
}
