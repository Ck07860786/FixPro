import express from 'express';
import { registerBusiness, registerUser, loginUser, changePassword } from '../controllers/auth/auth.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register/customer', registerUser)
router.post('/register/business', registerBusiness)
router.post('/login', loginUser)
router.put('/change-password', authMiddleware, changePassword)

export default router;