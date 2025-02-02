import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.delete('/:productId',ProductController.deleteProductById)
router.put('/:productId', ProductController.updateProductById);
router.get('/:productId', ProductController.getProductById);
router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllProduct);

export const ProductRouter = router;
