import express from 'express';
import {addProductMiddleware,getProductByFirm,deleteProductById}from '../controllers/productController.js';
import Product from '../models/Product.js';

const router = express.Router();
const [uploadMiddleware, addProduct] = addProductMiddleware;

router.post('/add-product/:firmId',addProduct);
router.get('/:firmId/products',getProductByFirm);

router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('Content-Type','image/jpg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));

});
router.delete('/:productId',deleteProductById)
export default router;