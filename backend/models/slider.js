const mongoose = require('mongoose')
const sliderSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please enter Slider name.'],
        trim:true,
        maxLength:[100,'Slider name connot exceed 100 characters']
    },
    url:{
        type:String,
        required: [true, 'Please enter Slider url.'],
        unique:true
    },
    images:{
            public_id:{
                type:String,
                required:[true, 'Please enter Images public_id.']
            },
            url:{
                type:String,
                required:[true, 'Please enter Images url.']
            }
        },
        status:{
            type: String,
            default: 'false'
        }
},{timestamps:true})
module.exports=mongoose.model('Slider',sliderSchema);