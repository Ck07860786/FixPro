import express from 'express';
import { registerBusiness, registerUser,loginUser } from '../controllers/auth/auth.controller.js';

const router = express.Router();

router.post('/register/customer',registerUser)
router.post('/register/business',registerBusiness)
router.post('/login',loginUser)

export default router;