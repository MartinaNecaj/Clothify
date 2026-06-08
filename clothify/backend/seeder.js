import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import Product from './models/Product.js';

dotenv.config();
await connectDB();

const products = [
  { name: 'Classic White Tee', description: 'Comfortable everyday cotton t-shirt.', brand: 'Clothify', category: 'Unisex', price: 19.99, sizes: ['S','M','L','XL'], countInStock: 50, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' },
  { name: 'Black Slim Jeans', description: 'Modern slim fit black denim jeans.', brand: 'Clothify', category: 'Men', price: 49.99, sizes: ['S','M','L','XL','XXL'], countInStock: 30, imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400' },
  { name: 'Floral Summer Dress', description: 'Light and elegant floral print dress.', brand: 'Clothify', category: 'Women', price: 39.99, sizes: ['XS','S','M','L'], countInStock: 25, imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400' },
  { name: 'Kids Striped Hoodie', description: 'Warm and fun striped hoodie for kids.', brand: 'Clothify', category: 'Kids', price: 24.99, sizes: ['XS','S','M'], countInStock: 40, imageUrl: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400' },
  { name: 'Oversized Beige Hoodie', description: 'Cozy oversized hoodie for all seasons.', brand: 'Clothify', category: 'Unisex', price: 44.99, sizes: ['S','M','L','XL','XXL'], countInStock: 35, imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400' },
  { name: 'Women Leather Jacket', description: 'Stylish faux leather jacket.', brand: 'Clothify', category: 'Women', price: 89.99, sizes: ['XS','S','M','L'], countInStock: 15, imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400' },
  { name: 'Men Polo Shirt', description: 'Classic polo shirt for a smart casual look.', brand: 'Clothify', category: 'Men', price: 29.99, sizes: ['S','M','L','XL'], countInStock: 45, imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400' },
  { name: 'Unisex Cap', description: 'Adjustable cotton cap for everyday wear.', brand: 'Clothify', category: 'Unisex', price: 14.99, sizes: [], countInStock: 60, imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400' },
];

await Product.deleteMany();
await Product.insertMany(products);
console.log('✅ Products seeded!');
process.exit();
