import Product from '../models/products.model';
import cloudinary from "cloudinary";
import fs from "fs-extra";
const multer = require("multer");
import {v4 as uuidv4} from 'uuid';


export const createProduct = async (req,res) => {
    const {name,category,price,description,imgfront,imgmodal,isAvailable} = req.body;
    const product = new Product({
        name,
        category,
        price,
        description,
        imgfront, 
        imgmodal,
        isAvailable
    });
    await product.save()

    res.status(201).json({message:"Product created successfully"})

}

export const getProducts = async (req,res) => {
    const currentProducts = await Product.find();

    res.status(200).json(currentProducts)
}

export const getProductById = (req,res) => {
    try{
        const product = Product.findById(req.params.listId);
        res.status(200).json(product)
    } catch(err){
        res.status(404).json(err)
    }
}
export const updateProductById = async (req,res) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.listId,req.body,{new:true,runValidators:true});
        res.status(200).json(product)
    } catch(err){
        res.status(404).json(err)
    }

}
export const deleteProductById = async (req,res) => {
    try{
        console.log(req.params.listId)
        const product = await Product.findByIdAndDelete(req.params.listId);
        res.status(200).json(product)
    } catch(err){
        res.status(404).json(err)
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const filenName = file.originalname
        .toLocaleLowerCase()
        .split(" ")
        .join("-");
      cb(null, uuidv4() + "-" + filenName);
    },
  });

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only .png, .jpg and .jpeg format allowed"));
      }
    },
  });

exports.uploadImageFront = upload.single("imgfront");
exports.uploadImageModal = upload.single("imgmodal");

exports.uploadFront = async (req, res) => {
    try{
        const url = req.protocol + "://" + req.get("host");
        const name = req.body.name;

        const result = await cloudinary.v2.uploader.upload(req.file.path);
        await Product.findOneAndUpdate(
            { name: name },
            {
                imgfront: result.url,
            }
        );
        await fs.unlink(req.file.path);
        
        res.status(200).json({
            success: "Success",
        });
    } catch(err){
        console.log(err)
        res.status(404).json({
            error: err,
        });
    }

};

exports.uploadModal = async (req, res) => {
    try{
        const url = req.protocol + "://" + req.get("host");
        const name = req.body.name;
        const result = await cloudinary.v2.uploader.upload(req.file.path);

        await Product.findOneAndUpdate(
            { name: name },
            {
                imgmodal: result.url,
            }
        );
        await fs.unlink(req.file.path);
        
        res.status(200).json({
            success: "Success",
        });
    } catch(err){
        console.log(err)
        res.status(404).json({
            error: err,
        });
    }

};