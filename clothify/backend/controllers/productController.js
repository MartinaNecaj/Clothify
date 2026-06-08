import Product from '../models/Product.js';

export const getProducts = async (req, res, next) => {
  try {
    const { keyword, category, minPrice, maxPrice, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (keyword) filter.name = { $regex: keyword, $options: 'i' };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Product.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      Product.countDocuments(filter)
    ]);
    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) { next(err); }
};

export const getProductById = async (req, res, next) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) { res.status(404); throw new Error('Product not found'); }
    res.json(prod);
  } catch (err) { next(err); }
};

export const createProduct = async (req, res, next) => {
  try { res.status(201).json(await Product.create(req.body)); } catch (err) { next(err); }
};

export const updateProduct = async (req, res, next) => {
  try {
    const prod = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!prod) { res.status(404); throw new Error('Product not found'); }
    res.json(prod);
  } catch (err) { next(err); }
};

export const deleteProduct = async (req, res, next) => {
  try {
    if (!await Product.findByIdAndDelete(req.params.id)) {
      res.status(404); throw new Error('Product not found');
    }
    res.json({ message: 'Product removed' });
  } catch (err) { next(err); }
};
