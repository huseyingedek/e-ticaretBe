import express from 'express';
import { register, login, logout, getProfileInfo } from '../app/controllers/authController';
import { registerSchema, loginSchema } from '../app/validations/authValidation';
import validate from '../app/middleware/validate';
import { refreshToken } from '../app/controllers/refreshToken';
import { authMiddleware } from '../app/middleware/authMiddleware';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh-token', refreshToken);
router.get('/profile/:userId',authMiddleware, getProfileInfo)
router.post('/logout', logout);

export default router;