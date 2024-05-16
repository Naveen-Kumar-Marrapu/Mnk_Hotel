import express from 'express';
import {addFirmMiddleware,getFirmById,getAllFirms,deleteFirmById} from '../controllers/firmController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();
const [uploadMiddleware, addFirm] = addFirmMiddleware;
router.post( '/add-firm',verifyToken, addFirm);
router.get('/all-firms',getAllFirms);
router.get('/single-firm/:id', getFirmById);
router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('Content-Type','image/jpg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));

});
router.delete('/:firmId',deleteFirmById);
export default router;
