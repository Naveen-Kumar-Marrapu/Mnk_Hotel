import Product from '../models/Product.js';
import multer from 'multer';
import Firm from '../models/Firm.js';


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

  const addProduct = async (req,res)=>{
    try {
        const{productName, price, category,bestseller,description} =req.body;
        const image = req.file? req.file.filename : undefined;

        const firmId = req.params.firmId;
        console.log(firmId);
        const firm = await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error: "No firm Found"});
        }
        const product = new Product({
            productName, price, category,bestseller,description, image, firm: firm._id
        });
        const savedProduct = await product.save();
        firm.product.push(savedProduct);
        await firm.save();

        res.status(200).json({message:"product is added successfully",savedProduct});

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
  };

  const addProductMiddleware = [upload.single('image'), addProduct];
  
  const getProductByFirm = async(req,res)=>{
    try {
            const firmId = req.params.firmId;
            const firm = await Firm.findById(firmId);

            if(!firm){
                return res.status(404).json({error: "No firm found"});
            };
            const restaurantName= firm.firmName;
            const products = await Product.find();
            res.status(200).json({restaurantName,products});

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
  }

  const deleteProductById = async(req,res)=>{
    try {
      const productId = req.params.productId;
      const deletedProduct =  await Product.findByIdAndDelete(productId);
      if(!deletedProduct){
         return res.status(400).json({error: "No product found"});
      }

    } catch (error) {
      onsole.error(error);
      res.status(500).json({error: "Internal server error"});
    }
  }



export {addProductMiddleware,getProductByFirm, deleteProductById};