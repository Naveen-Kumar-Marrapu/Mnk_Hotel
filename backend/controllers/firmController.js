import Firm from '../models/Firm.js';
import path from 'path';
import Vendor from '../models/Vendor.js';
import multer from 'multer';

    // Set up storage for uploaded images
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/') // Save uploaded images to the 'uploads' directory
        },
        filename: function (req, file, cb) {
          // Rename the uploaded file to ensure uniqueness
          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
      });
      
      // Initialize Multer with the specified storage settings
      const upload = multer({ storage: storage });

const addFirm = async(req,res)=>{
    try {
        const {firmName, area, category, region, offer} = req.body;
        const image = req.file? req.file.filename : undefined;
        const vendor = await Vendor.findById(req.vendorId); 
        if(!vendor){
            res.status(404).json({message: "vendor not found"});
        }
        const firm = new Firm({
            firmName, area, category, region, offer, image, vendor: vendor._id
        });
    
        await firm.save();
        return res.status(200).json({message: "Firm added successfully"});
        
    } catch (error) {
        
        console.error(error);
        res.status(500).json("internal server error");
    }

};
const addFirmMiddleware = [upload.single('image'), addFirm];

export default addFirmMiddleware;


