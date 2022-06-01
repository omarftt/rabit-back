import {Schema,model} from 'mongoose';

const userSchema = new Schema({
    name: {
        type:String,
        required: true,
    },
    lastname: {
        type:String,
        required: true,
    },
    email:{
        type: String,
        required : true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    profileImg:{
        type: String,
        required: false,
    },
    roles:[{
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: false,
    }],
    ownTaller:[{
        type: Schema.Types.ObjectId ,
        ref: 'Taller',
        required : false,
    }],
    refreshToken:{
        type: String,
    }

})

export default model('User',userSchema)