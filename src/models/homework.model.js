import {Schema,model} from 'mongoose';

const homeworkSchema = new Schema({
    name: {
        type:String,
        required: true,
    },
    description:{
        type: String,
        required: false,
        default: '',
    },
    creator:{
        type: Schema.Types.ObjectId ,
        ref: 'User',
        required : false,
    },
    startDate:{
        type: String,
        required: false,
        default: '',
    },
    endDate:{
        type: String,
        required: false,
        default: '',
    },
    fileAttachedURL:{
        type: String,
        required: false,
        default: '',
    },
    homeworkSent:[{
        type: Schema.Types.ObjectId ,
        ref: 'Classroom',
        required : false,
    }]

})

export default model('Homework',homeworkSchema)