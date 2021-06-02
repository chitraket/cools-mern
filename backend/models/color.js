const mongoose = require('mongoose')
const colorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter Color name.'],
        trim: true,
        maxLength: [100, 'Brand name connot exceed 100 characters']
    },
    code: {
        type: String,
        required: [true, 'Please enter Color code.'],
        unique: true
    }
}, { timestamps: true })
module.exports = mongoose.model('Color', colorSchema);