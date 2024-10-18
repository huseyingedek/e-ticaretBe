import express from 'express';
import { addProducts, updateProducts, deleteProducts, listProducts } from '../app/controllers/productsController';
import { checkRole, checkPermission } from '../app/middleware/roleMiddleware';
import { authMiddleware } from '../app/middleware/authMiddleware';
import validate from '../app/middleware/validate';


const router = express.Router();

router.post('/addproduct', authMiddleware, checkRole(['admin']), addProducts);
router.get('/listproducts', listProducts);
router.get('/listproducts/:productId', listProducts);
router.put('/updateproduct/:productId', authMiddleware, checkRole(['admin']), updateProducts);
router.delete('/deleteproduct/:productId', authMiddleware, checkRole(['admin']), deleteProducts);


export default router;