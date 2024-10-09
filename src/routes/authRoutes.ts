import express from 'express';
import { register, login, logout } from '../app/controllers/authController';
import { registerSchema, loginSchema } from '../app/validations/authValidation';
import validate from '../app/middleware/validate';
import { refreshToken } from '../app/controllers/refreshToken';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

export default router;