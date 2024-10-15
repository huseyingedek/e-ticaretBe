import express from 'express';
import { addUsers,updateUser,listUsers,deleteUser } from '../app/controllers/adminController';
import { checkRole, checkPermission } from '../app/middleware/roleMiddleware';
import { authMiddleware } from '../app/middleware/authMiddleware';
import validate from '../app/middleware/validate';
import { adminSchema } from '../app/validations/adminValidation';


const router = express.Router();

router.post('/addUsers', authMiddleware, checkRole(['admin']), validate(adminSchema), addUsers);
router.put('/updateUser/:userId', authMiddleware, checkRole(['admin']), validate(adminSchema), updateUser);
router.get('/listUsers', authMiddleware, checkRole(['admin']), listUsers);
router.delete('/deleteUser/:userId', authMiddleware, checkRole(['admin']), deleteUser);

export default router;