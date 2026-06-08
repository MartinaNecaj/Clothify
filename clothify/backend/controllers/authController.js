import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (await User.findOne({ email })) {
      res.status(400);
      throw new Error('User already exists');
    }
    const user = await User.create({ name, email, password, role: role || 'user' });
    const token = generateToken({ id: user._id, role: user.role });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role, token });
  } catch (err) { next(err); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error('Invalid credentials');
    }
    const token = generateToken({ id: user._id, role: user.role });
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token });
  } catch (err) { next(err); }
};

export const me = async (req, res, next) => {
  try { res.json(req.user); } catch (err) { next(err); }
};
