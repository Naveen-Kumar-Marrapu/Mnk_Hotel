import Vendor from '../models/Vendor.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();;
const secreateKey = process.env.SECREATEKEY;

const vendorRegister = async(req, res) =>{
        const {username,email,password} = req.body;
    try{
        const vendorEmail = await Vendor.findOne({email})
        if(vendorEmail){
            return res.status(400).json("Email already taken");
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        });
        await newVendor.save();
        res.status(201).json({message: "Vendor registered successfully"});
        console.log('registered');

    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
}

const vendorLogin = async(req,res)=>{
    const {email, password} = req.body;

    try{
        const vendor = await Vendor.findOne({email});
        if(!vendor){
            return res.status(401).json({error: "invalid Username"})
        }
        else if(!(await bcrypt.compare(password, vendor.password))){
            return res.status(401).json({error: "invalid password"})
        } 
        const token = jwt.sign({vendorId: vendor._id},secreateKey,{expiresIn: "1h"});
        res.status(201).json({success: "Login successful", token});
        console.log(email, "this is token", token);


    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
}

const getAllVendors = async ( req,res)=>{
    try {
        const vendors = await Vendor.find().populate('firm'); //to show firm details in vendor table 
        res.json({vendors});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
    }

}

const getVendorById = async ( req,res)=>{
    const vendorId = req.params.id;
    try {
        const vendor = await Vendor.findById(vendorId).populate('firm');
        if(!vendor){
            return res.status(404).json({error: "Vendor not found"});
        }
        res.status(200).json({vendor});

    }catch(error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
}

export {vendorRegister, vendorLogin , getAllVendors, getVendorById }