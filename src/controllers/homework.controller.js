import Classroom from '../models/classroom.model';
import Homework from '../models/homework.model';
import cloudinary from "cloudinary";
import fs from "fs-extra";
const multer = require("multer");
import {v4 as uuidv4} from 'uuid';


export const getHomeworks = async (req,res) => {
    try{
        const homeworks = await Homework.find();
        res.status(200).json(homeworks)
    } catch(err){
        res.json(err);
    }
}

export const getHomeworkByCreator = async (req,res) => {
    try{
        const {user} = req.body;
        const userHomeworks = await Homework.find({creator:{$in:user}});
        res.status(200).json(userHomeworks)
    } catch(err){
        res.status(404).json(err)
    }
}

export const createHomework = async (req,res) => {

    const {user, classId, name, description, startDate,endDate,fileAttachedURL} = req.body;
    const homework = new Homework({
        name,
        description, 
        creator: user,
        startDate,
        endDate,
        fileAttachedURL
    });
    await homework.save()

    const currentClassroom = await Classroom.findOne({classId});
    currentClassroom.homeworks.push(homework);
    await currentClassroom.save();
    
    res.status(201).json({message:"Homework created successfully"})
}


export const getHomeworkByClass = async (req,res) => {
    try{
        const {classId} = req.body;
        const classroom = await Classroom.findOne({classId});
        const classroomHomeworks = await Homework.find({_id:{$in:classroom.homeworks}});
        res.status(200).json(classroomHomeworks)
    } catch(err){
        res.status(404).json(err)
    }
}

export const getHomeworkById = (req,res) => {
    try{
        const homework = Homework.findById(req.params.listId);
        res.status(200).json(homework)
    } catch(err){
        res.status(404).json(err)
    }
}

export const deleteHomeworkById = async (req,res) => {
    try{
        const homework = await Homework.findByIdAndDelete(req.params.listId);
        res.status(200).json(homework)
    } catch(err){
        res.status(404).json(err)
    }
}

export const updateHomeworkById = async (req,res) => {
    try{
        const homework = await Homework.findByIdAndUpdate(req.params.listId,req.body,{new:true,runValidators:true});
        res.status(200).json(homework)
    } catch(err){
        res.status(404).json(err)
    }
}

export const getHomeworkByStudent = async (req,res) => {
    try{
        const {user} = req.body;
        const userClassrooms = await Classroom.find({students:{$in:user}}).populate('homeworks');
        const userHomeworks = [];
        userClassrooms.forEach(classroom => {
            classroom.homeworks.forEach(homework => {
                userHomeworks.push(homework)
            })
        })
        res.status(200).json(userHomeworks)
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
      if (true
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("All format accepted"));
      }
    },
  });

exports.uploadImage = upload.single("fileAttachedURL");

exports.upload = async (req, res) => {
    try{
        const url = req.protocol + "://" + req.get("host");
        const name = req.body.name;
        const result = await cloudinary.v2.uploader.upload(req.file.path);

        await Homework.findOneAndUpdate(
            { name: name },
            {
                fileAttachedURL: result.url,
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