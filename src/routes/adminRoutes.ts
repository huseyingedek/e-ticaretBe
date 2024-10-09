import express from 'express';
import { listUsers } from '../app/controllers/adminController';
import { deleteUser } from '../app/controllers/adminController';
import { checkRole, checkPermission } from '../app/middleware/roleMiddleware';
import { authMiddleware } from '../app/middleware/authMiddleware';

const router = express.Router();

router.get('/listUsers', authMiddleware, checkRole(['admin']), listUsers);
router.delete('/deleteUser/:userId', authMiddleware, checkRole(['admin']), deleteUser);


export default router;