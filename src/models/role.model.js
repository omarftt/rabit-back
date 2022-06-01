import {Schema,model} from 'mongoose';

const roleSchema = new Schema({
    name: {
        type:String,
    }
})

export default model('Role',roleSchema)