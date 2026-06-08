# Clothify — Full Stack Fashion Store

**By Martina Neçaj & Fjoralba Shehu**

A full-stack e-commerce app built with React + Vite (frontend) and Express + MongoDB (backend).

---

## Project Structure

```
clothify/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   ├── utils/generateToken.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── api/axiosClient.js
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── CartContext.jsx
    │   ├── pages/
    │   │   ├── AdminDashboard.jsx
    │   │   ├── AdminOrders.jsx
    │   │   ├── AdminProducts.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Checkout.jsx
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Orders.jsx
    │   │   ├── ProductDetails.jsx
    │   │   ├── Products.jsx
    │   │   └── Register.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── styles.css
    ├── .env
    ├── package.json
    └── vite.config.js
```

---

## Setup & Run

### 1. Backend
```bash
cd backend
npm install
# Edit .env — set MONGO_URI, JWT_SECRET, CLIENT_URL
npm run dev
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

---

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/auth/register | — | Register user |
| POST | /api/auth/login | — | Login |
| GET | /api/auth/me | user | Current user |
| GET | /api/products | — | List products (filter, paginate) |
| GET | /api/products/:id | — | Product detail |
| POST | /api/products | admin | Create product |
| PUT | /api/products/:id | admin | Update product |
| DELETE | /api/products/:id | admin | Delete product |
| POST | /api/orders | user | Place order |
| GET | /api/orders/mine | user | My orders |
| GET | /api/orders | admin | All orders |
| PUT | /api/orders/:id/deliver | admin | Mark delivered |
| PUT | /api/users/profile | user | Update profile |

---

## Notes
- JWT stored in localStorage, attached via Axios interceptor
- Cart persisted in localStorage
- Tax: 20% of items price; free shipping over $100
- Admin routes protected by `isAdmin` middleware
