import {Schema,model} from 'mongoose';

const classroomSchema = new Schema({
    name: {
        type:String,
        required: true,
    },
    description:{
        type: String,
        required: false,
        default: '',
    },
    zoomLink:{
        type: String,
        required: false,
        default: '',
    },
    timeStart:{
        type: String,
        required: false,
        default: '',
    },
    students:[{
        type: Schema.Types.ObjectId ,
        ref: 'User',
        required : false,
    }],
    homeworks:[{
        type: Schema.Types.ObjectId ,
        ref: 'Homework',
        required : false,
    }],

})

export default model('Classroom',classroomSchema)