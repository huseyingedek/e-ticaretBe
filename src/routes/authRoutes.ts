import express from 'express';
import { register, login } from '../app/controllers/authController';
import { registerSchema, loginSchema } from '../app/validations/authValidation';
import validate from '../app/middleware/validate';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;