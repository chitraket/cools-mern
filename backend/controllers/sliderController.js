const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary');
const Slider = require('../models/slider');

exports.newSlider = catchAsyncErrors (async (req,res,next) => {
    const { name,url } = req.body
    if(!req.body.name){
        return next(new ErrorHandler('Name is required.',400))
    }
    const result = await cloudinary.v2.uploader.upload(req.body.images, {
        folder: 'sliders',
        allowedFormats: ['jpg', 'jpeg', 'png'],
    },(err) => {
        if(err){
            return next(new ErrorHandler(err.message, err.http_code));
        }
    })
    const slider = await Slider.create({
        name,
        url,
        images :  {
            public_id: result.public_id,
            url: result.secure_url
        }

    });
    res.status(201).json({
        success:true,
        slider

    })
})

exports.getSingleSlider = catchAsyncErrors ( async (req,res,next) => {
    const slider = await Slider.findById(req.params.id);
    if(!slider){
        return next(new ErrorHandler('Slider not found', 404))
    }
    res.status(200).json({
        success: true,
        slider,
    })
})

exports.updateSlider = catchAsyncErrors(async (req, res, next) => {
    let sliders = await Slider.findById(req.params.id);
    if (!sliders) {
        return next(new ErrorHandler('Slider not found', 404));
    }
    if(!req.body.name){
        return next(new ErrorHandler('Name is required.',400))
    }
    const newUserData = {
        name: req.body.name,
        url: req.body.url
    }
    if (req.body.images !== '') {
        const image_id = sliders.images.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.images, {
            folder: 'sliders',
            allowedFormats: ['jpg', 'jpeg', 'png'],
        },(err) => {
            if(err){
                return next(new ErrorHandler(err.message, err.http_code));
            }
        })

        newUserData.images = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }
   
    slider = await Slider.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        slider
    })

})

exports.deleteSlider = catchAsyncErrors ( async (req,res,next) => {
    const slider = await Slider.findById(req.params.id);
    if(!slider){
        return next(new ErrorHandler('Slider not found', 404))
    }
    const image_id = slider.images.public_id;
    await cloudinary.v2.uploader.destroy(image_id);
    await slider.remove();
    res.status(200).json({
        success: true,
        message: 'Slider is deleted'
    })
})

exports.getAdminSlider = catchAsyncErrors(async (req,res,next) => {
    const slider= await Slider.find();
    res.status(200).json({
        success:true,
        slider
    })
})

exports.getSlider = catchAsyncErrors(async (req,res,next) => {
    const slider= await Slider.find({'status':{$ne:false}});
    res.status(200).json({
        success:true,
        slider
    })
})
exports.updateSliderStatus = catchAsyncErrors(async (req, res, next) => {
    let sliders = await Slider.findById(req.params.id);
    if (!sliders) {
        return next(new ErrorHandler('Slider not found', 404));
    }
    slider = await Slider.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        slider
    })

})