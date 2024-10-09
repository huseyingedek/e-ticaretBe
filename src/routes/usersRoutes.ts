import express from 'express';
import { getProfileInfo } from '../app/controllers/usersController';
import { updateProfileInfo } from '../app/controllers/usersController';
import { authMiddleware } from '../app/middleware/authMiddleware';
import validate from '../app/middleware/validate';
import { userSchema } from '../app/validations/usersValidation';

const router = express.Router();

router.get('/profile/:userId', authMiddleware, getProfileInfo);
router.put('/profileUpdate/:userId', authMiddleware, validate(userSchema), updateProfileInfo);


export default router;