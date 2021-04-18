const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please enter Category name.'],
        trim:true,
        maxLength:[100,'Category name connot exceed 100 characters']
    },
    slug:{
        type:String,
        required: [true, 'Please enter Category slug.'],
        unique:true
    },
    images: {
        public_id: {
            type: String,
            required: [true, 'Please enter Images public_id.']
        },
        url: {
            type: String,
            required: [true, 'Please enter Images url.']
        }
    },
    sliders:[
        {
            public_id:{
                type:String,
                required:[true, 'Please enter Sliders public_id.']
            },
            url:{
                type:String,
                required:[true, 'Please enter Sliders url.']
            }
        }
    ],
    status:{
        type: String,
        default: 'false'
    }
},{timestamps:true})
module.exports=mongoose.model('Category',categorySchema);