const mongoose = require('mongoose')
const brandSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please enter Brand name.'],
        trim:true,
        maxLength:[100,'Brand name connot exceed 100 characters']
    },
    slug:{
        type:String,
        required: [true, 'Please enter Brand slug.'],
        unique:true
    },
    description:{
        type:String,
        required:[true,'Please enter Brand Description.'],
        unique:true
    },
    images: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    sliders:[
        {
            public_id:{
                type:String,
                required:[true, 'Please enter Brand public_id.']
            },
            url:{
                type:String,
                required:[true, 'Please enter Brand url.']
            }
        }
    ],
    status:{
        type: String,
        default: 'false'
    }
},{timestamps:true})
module.exports=mongoose.model('Brand',brandSchema);