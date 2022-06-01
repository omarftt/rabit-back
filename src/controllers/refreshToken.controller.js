import User from '../models/user.model'
import config from '../config'
import jwt from 'jsonwebtoken'

export const handleRefreshToken = async (req,res) => {
    const cookies = req.cookies
    if(!cookies.refreshToken) return res.status(401).json({message:"No refresh token"})
    const refreshToken = cookies.refreshToken;

    const user = await User.findOne({refreshToken}).populate('roles').exec()
    if(!user) return res.status(403).json({message:"User not found"})

    jwt.verify(
        refreshToken,
        config.SECRET,
        async (err,decoded) => {
            const decodedUser = await User.findById(decoded.id).populate('roles').exec()
            console.log(decodedUser)
            if (err || user.email !== decodedUser.email) return res.sendStatus(403);
            const role = user.roles.map(role => role.name)
            const token = jwt.sign({id:user._id, "roles":role},config.SECRET,{expiresIn:'10s'})
            res.json({token,role})
        }
    )
}

