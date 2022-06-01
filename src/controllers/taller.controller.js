import Taller from '../models/taller.model';
import User from '../models/user.model';
import cloudinary from "cloudinary";
import fs from "fs-extra";
const multer = require("multer");
import {v4 as uuidv4} from 'uuid';


export const createTaller = async (req,res) => {
    const {name,edadCode, description, descriptionModal,duration,imgfront,inversion,startDate,isVisible} = req.body;
    const taller = new Taller({
        name,
        edadCode,
        description,
        descriptionModal,
        duration,
        imgfront,
        inversion,
        startDate,
        isVisible,
    });
    await taller.save()

    res.status(201).json({message:"Taller created successfully"})

}

export const getTalleres = async (req,res) => {
    const currentTalleres = await Taller.find();

    res.status(200).json(currentTalleres)
}

export const getTallerById = (req,res) => {
    try{
        const taller = Taller.findById(req.params.listId);
        res.status(200).json(taller)
    } catch(err){
        res.status(404).json(err)
    }
}
export const updateTallerById = async (req,res) => {
    try{
        const taller = await Taller.findByIdAndUpdate(req.params.listId,req.body,{new:true,runValidators:true});
        res.status(200).json(taller)
    } catch(err){
        res.status(404).json(err)
    }

}
export const deleteTallerById = async (req,res) => {
    try{
        console.log(req.params.listId)
        const taller = await Taller.findByIdAndDelete(req.params.listId);
        res.status(200).json(taller)
    } catch(err){
        console.log(err)
        res.status(404).json(err)
    }
}

export const getTallerByUser = async (req,res) => {
    try{
        const {user} = req.body;
        const userTaller = await Taller.find({_id:{$in:user.ownTaller}});
        res.status(200).json(userTaller)
    } catch(err){
        console.log(err)
        res.status(404).json(err)
    }
}

export const enrollTaller = async (req,res) => {
    try{
        const codigoTaller = req.params.tallerId;
        const {user} = req.body;
        const currentUser = await User.findOne({user});
        
        console.log(currentUser)

        const currentTaller = await Taller.findById(codigoTaller);
        currentUser.ownTaller.push(currentTaller._id);
        await currentUser.save();
        console.log('here')
        
        res.status(200).json({message:"Taller enrolled successfully"})
    } catch(err){
        //console.log(err)
        res.status(404).json(err)
    }
}

export const unenrollTaller = async (req,res) => {
    try{
        const codigoTaller = req.params.tallerId;
        const {user} = req.body;
        const currentUser = await User.findOne({user});

        const currentTaller = await Taller.findById(codigoTaller);
        currentUser.ownTaller.pull(currentTaller._id);
        await currentUser.save();

        res.status(200).json({message:"Taller unenrolled successfully"})
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

exports.uploadImage = upload.single("tallerImage");

exports.upload = async (req, res) => {
    try{
        const url = req.protocol + "://" + req.get("host");
        const email = req.body.email;
        const result = await cloudinary.v2.uploader.upload(req.file.path);

        await User.findOneAndUpdate(
            { email: email },
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