import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;
    if (!orderItems?.length) { res.status(400); throw new Error('No order items'); }

    const itemsPrice = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 5;
    const taxPrice = Number((0.2 * itemsPrice).toFixed(2));
    const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

    for (const item of orderItems)
      await Product.findByIdAndUpdate(item.product, { $inc: { countInStock: -item.qty } });

    const order = await Order.create({
      user: req.user._id, orderItems, shippingAddress, paymentMethod,
      itemsPrice, shippingPrice, taxPrice, totalPrice
    });
    res.status(201).json(order);
  } catch (err) { next(err); }
};

export const getMyOrders = async (req, res, next) => {
  try {
    res.json(await Order.find({ user: req.user._id }).sort({ createdAt: -1 }));
  } catch (err) { next(err); }
};

export const getAllOrders = async (req, res, next) => {
  try {
    res.json(await Order.find().populate('user', 'name email').sort({ createdAt: -1 }));
  } catch (err) { next(err); }
};

export const markDelivered = async (req, res, next) => {
  try {
    const ord = await Order.findById(req.params.id);
    if (!ord) { res.status(404); throw new Error('Order not found'); }
    ord.isDelivered = true;
    ord.deliveredAt = new Date();
    await ord.save();
    res.json(ord);
  } catch (err) { next(err); }
};
