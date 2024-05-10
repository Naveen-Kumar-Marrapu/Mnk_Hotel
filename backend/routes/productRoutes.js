import express from 'express';
import {addProductMiddleware,getProductByFirm}from '../controllers/productController.js';
import Product from '../models/Product.js';

const router = express.Router();
const [uploadMiddleware, addProduct] = addProductMiddleware;

router.post('/add-product/:firmId',addProduct);
router.get('/:firmid/products',getProductByFirm);

export default router;