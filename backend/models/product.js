const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please enter product name.'],
        trim:true,
        maxLength:[100,'Product name connot exceed 100 characters']
    },
    slug:{
        type:String, 
        required: [true, 'Please enter slug.'],
        unique:true,    
    },
    price:{
        type:Number,
        required: [true, 'Please enter product price.'],
        trim:true,
        maxLength:[5,'Product price connot exceed 5 characters'],
        default:0.0
    },
    description:{
        type:String,
        required: [true, 'Please enter product description.'],
    },
    material:{
        type:String,
        required: [true, 'Please enter product material.'],
    },
    size:{
        type:String,
        required: [true, 'Please enter product size.'],
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category', 
        required: [true,'Please select category for this product']
    },
    brand:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref:'Brand', 
        required: [true,'Please select brand for this product']
    },
    seller : {
        type:String,
        required : [true,'Please enter product seller']
    },
    stock:{
        type:Number,
        required: [true,'Please enter product stock'],
        maxLength:[5,'Product stock cannot exceed 5 characters'],
        default:0
    },
    numofReviews:{
        type:Number,
        default:0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default: 'false'
    },
    sold:{
        type: String,
        default: 0
    },
},{timestamps:true})

module.exports = mongoose.model('Product',productSchema);