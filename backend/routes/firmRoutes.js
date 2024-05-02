import express from 'express';
import addFirmMiddleware from '../controllers/firmController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();
const [uploadMiddleware, addFirm] = addFirmMiddleware;
router.post( '/add firm',verifyToken, addFirm);

export default router;
