import {Schema,model} from 'mongoose';

const productSchema = new Schema({
    name: {
        type:String,
        required: true,
    },
    category:[{
        type: Number,
        required : true,
    }],
    price:{
        type: Number,
        required: true,
        default: 0,
    },
    description:{
        type: String,
        required: false,
        default: '',
    },
    imgfront:{
        type: String,
        required: false,
        default: '',
    },
    imgmodal:{
        type: String,
        required: false,
        default: '',
    },
    isAvailable:{
        type: Boolean,
        required: false,
        default: false,
    }

})

export default model('Product',productSchema)