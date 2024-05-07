import express from 'express';
import {addFirmMiddleware,getFirmById,getAllFirms} from '../controllers/firmController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();
const [uploadMiddleware, addFirm] = addFirmMiddleware;
router.post( '/add-firm',verifyToken, addFirm);
router.get('/all-firms',getAllFirms);
router.get('/single-firm/:id', getFirmById);

export default router;
