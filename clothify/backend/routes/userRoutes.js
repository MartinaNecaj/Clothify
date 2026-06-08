import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { updateProfile } from '../controllers/userController.js';

const router = Router();
router.put('/profile', protect, updateProfile);
export default router;
