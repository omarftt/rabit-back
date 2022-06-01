import User from '../models/user.model';
import cloudinary from "cloudinary";
import fs from "fs-extra";
const multer = require("multer");
import {v4 as uuidv4} from 'uuid';

export const getAllUsers = async (req,res) => {
    try{
        const users = await User.find();
        res.status(200).json(users)
    } catch(err){
        res.json(err);
    }
}

export const getCurrentUser = async (req,res) => {
    try{
        const user = req.body
        res.status(200).json(user)
    } catch(err){
        console.log(err)
        res.json(err);
    }
}

export const updateUser = async (req,res) => {
    try{
        const {user,name,lastname} = req.body;
        const userUpdated = await User.findByIdAndUpdate(user._id,{name,lastname});
        res.status(200).json(userUpdated)
    } catch(err){
        res.status(404).json(err)
    }
}

export const getUserById = async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch(err){
        res.status(404).json(err);
    }
}

export const deleteUserById = async (req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(user);
    } catch(err){
        res.status(404).json(err);
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

exports.uploadImage = upload.single("profileImg");

exports.upload = async (req, res) => {
    try{
        const url = req.protocol + "://" + req.get("host");
        const userId = req.body.userId;
        console.log(req.body)
        const result = await cloudinary.v2.uploader.upload(req.file.path);

        await User.findOneAndUpdate(
            { _id: userId },
            {
                profileImg: result.url,
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