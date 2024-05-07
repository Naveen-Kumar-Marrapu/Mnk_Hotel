import Vendor from '../models/Vendor.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secreteKey = process.env.SECREATEKEY;
console.log(secreteKey)
const verifyToken = async(req,res,next)=>{
    const token = req.headers.token;

    if(!token){
        return res.status(401).json({errro:"Token is required"});
    }
    try{

        const decoded = jwt.verify(token,secreteKey);
        const vendor = await Vendor.findById(decoded.vendorId);
        if(!vendor){
            return res.status(404).json({error: "vendor not found"})
        }
        req.vendorId = vendor._id ;
        next();
    }catch(error){
        console.error(error);
        return res.status(500).json({error: "Invalid token"});
    }

}

export default verifyToken;