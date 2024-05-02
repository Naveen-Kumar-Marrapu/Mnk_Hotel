import {vendorRegister, vendorLogin} from '../controllers/vendorController.js';
import express from 'express';

const router = express.Router();

router.post('/register', vendorRegister);
router.post('/login', vendorLogin);

export default router;