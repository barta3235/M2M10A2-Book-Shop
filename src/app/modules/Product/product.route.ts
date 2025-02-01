import express from 'express';
import { ProductController } from './product.controller';

const router= express.Router()

router.post('/create-book',ProductController.createProduct)

export const ProductRouter=router