import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer ')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (err) {
      res.status(401);
      return next(new Error('Not authorized, token failed'));
    }
  }
  res.status(401);
  next(new Error('Not authorized, no token'));
};

export const isAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') return next();
  res.status(403);
  next(new Error('Forbidden: admin only'));
};
