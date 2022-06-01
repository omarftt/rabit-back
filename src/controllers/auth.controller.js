import User from '../models/user.model';
import Role from '../models/role.model';
import jwt from 'jsonwebtoken';
import config from '../config';
import bcrypt from 'bcryptjs';

export const signUp = async (req,res) => {

    const {name,lastname,email,password,roles, profileImg} = req.body
    const existedEmail = await User.findOne({email})
    if(existedEmail){
        return res.status(400).json({message:"Email already exists"})
    }
 
    const encryptPassword = await bcrypt.hash(password, 8);

    const newUser = new User({
        name,
        lastname,
        email,
        password : encryptPassword,
        profileImg: ''
    })

    let foundRole = '';
    if(roles.includes('Admin')){
        foundRole = await Role.find({name:'Admin'}).lean()
    } else if(roles.includes('Teacher')){
        foundRole = await Role.find({name:'Teacher'}).lean()
    } else {
        foundRole = await Role.find({name: 'Student'}).lean()
    }
    const roleId = foundRole[0]._id
    newUser.roles = [roleId]

    const userSaved = await newUser.save()
    const token = jwt.sign({id:userSaved._id},config.SECRET,{expiresIn:86400})

    res.status(200).json(token)

}


export const signIn = async (req,res) => {
    const {email,password} = req.body

    if (!email || !password) {
        return res.status(400).json({message: "Enter an email and password"})
    }

    const user = await User.findOne({email}).populate('roles')
    if(!user){
        return res.status(400).json({message:"User not found"})
    }

    const matchPassword = await bcrypt.compare(password,user.password)

    if(!matchPassword){
        return res.status(401).json({message:"Password incorrect"}) 
    }

    const role = user.roles.map(role => role.name)
    const token = jwt.sign({id:user._id, "roles":role},config.SECRET,{expiresIn:'10s'})
    const refreshToken = jwt.sign({id:user._id},config.SECRET,{expiresIn:'1d'})

    user.refreshToken = refreshToken
    const result = await user.save()
    console.log(result)
    console.log(role)

    res.cookie('refreshToken',refreshToken,{httpOnly:true,maxAge:24 * 60 * 60 * 1000})

    res.status(200).json({token,role})
}

export const handleLogout = async (req,res) => {
    const cookies = req.cookies;
    if(!cookies.refreshToken) return res.status(204);
    const refreshToken = cookies.refreshToken;

    const user = await User.findOne({refreshToken}).populate('roles').exec()
    if(!user){
        res.clearCookie('refreshToken',{httpOnly:true})
        res.sendStatus(204)
    }

    user.refreshToken = '';
    const result = await user.save();

    res.clearCookie('refreshToken',{httpOnly:true})
    res.sendStatus(204)
}