import jwt from 'jsonwebtoken';
import config from '../config';
import userModel from '../models/user.model';

export const isAuthenticated = async (req,res,next) => {
   try{
       const bearerHeader = req.headers['authorization'] || req.headers['Authorization']
       
       if(!bearerHeader){
           return res.status(403).json({message:"No token provided"})
       }
       const decoded = jwt.verify(bearerHeader,config.SECRET)

       const user = await userModel.findById(decoded.id , {password:0})

       if(!user){
           return res.status(403).json({message:"User not found"})
       }

       req.body.user = user
       
       next()
   } catch(err){
       return res.status(403).json({message:err})
   }

}