import { Router } from 'express';
import { protect, isAdmin } from '../middleware/auth.js';
import { createOrder, getMyOrders, getAllOrders, markDelivered } from '../controllers/orderController.js';

const router = Router();
router.post('/', protect, createOrder);
router.get('/mine', protect, getMyOrders);
router.get('/', protect, isAdmin, getAllOrders);
router.put('/:id/deliver', protect, isAdmin, markDelivered);
export default router;
