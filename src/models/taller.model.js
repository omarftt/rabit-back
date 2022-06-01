import {Schema,model} from 'mongoose';

const tallerSchema = new Schema({
    name: {
        type:String,
        required: true,
    },
    edadCode:[{
        type: String,
        required : true,
    }],
    description:{
        type: String,
        required: false,
        default: '',
    },
    descriptionModal:{
        type: String,
        required: false,
        default: '',
    },
    duration:{
        type: String,
        required: false,
        default: '',
    },
    imgfront:{
        type: String,
        required: false,
        default: '',
    },
    inversion:{
        type: String,
        required: false,
        default : '',
    },
    startDate:{
        type: String,
        required: false,
        default: '',
    },
    isVisible:{
        type: Boolean,
        required: false,
        default: false,
    },
    classrooms:[{
        type: Schema.Types.ObjectId ,
        ref: 'Classroom',
        required : false,
    }],


})

export default model('Taller',tallerSchema)