import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    brand: { type: String, default: 'Generic' },
    category: { type: String, required: true, enum: ['Men', 'Women', 'Kids', 'Unisex'] },
    price: { type: Number, required: true, min: 0 },
    sizes: [{ type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] }],
    countInStock: { type: Number, default: 0 },
    imageUrl: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
