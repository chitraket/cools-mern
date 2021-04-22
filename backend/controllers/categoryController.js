const Category= require('../models/category')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const slugify=require('slugify');
const cloudinary = require('cloudinary');

exports.newCategory = catchAsyncErrors(async (req,res,next) => {
     const { name,type } = req.body;
     if(!req.body.name){
        return next(new ErrorHandler('Name is required.',400))
    }
    const result = await cloudinary.v2.uploader.upload(req.body.images, {
        folder: 'categorys',
        width: 215,
        height:140,
        crop: "scale",
        allowedFormats: ['jpg', 'jpeg', 'png'],
    },(err) => {
        if(err){
            return next(new ErrorHandler(err.message, err.http_code));
        }
    })

    let images = []
    if (typeof req.body.sliders === 'string') {
        images.push(req.body.sliders)
    } else {
        images = req.body.sliders
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) { 
        const results = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'sliders',
            allowedFormats: ['jpg', 'jpeg', 'png'],
        },(err) => {
            if(err){
                return next(new ErrorHandler(err.message, err.http_code));
            }
        });

        imagesLinks.push({
            public_id: results.public_id,
            url: results.secure_url
        })
    }
    const category = await Category.create({
        name,
        type,
        slug:slugify(name),
        sliders:imagesLinks,
        images :  {
        public_id: result.public_id,
        url: result.secure_url
        }
})
    
    res.status(201).json({
        success:true,
        category
    })  
 })

exports.getCategory = catchAsyncErrors( async (req,res,next) => {
    const category= await Category.find({'status':{$ne:false}});
    res.status(200).json({
        success: true,
        category
    })
})

exports.adminCategory = catchAsyncErrors( async (req,res,next) => {
    const category= await Category.find();
    res.status(200).json({
        success: true,
        category
    })
})

exports.getSingleCategory = catchAsyncErrors ( async (req,res,next) => {
    const category = await Category.findById(req.params.id);
    if(!category){
        return next(new ErrorHandler('Category not found', 404))
    }
    res.status(200).json({
        success: true,
        category
    })
})

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
    let category = await Category.findById(req.params.id);
    if (!category) {
        return next(new ErrorHandler('Category not found', 404));
    }
    if(!req.body.name){
        return next(new ErrorHandler('Name is required.',400))
    }
    const newUserData = {
        name: req.body.name,
        type: req.body.type,
        slug: slugify(req.body.name)
    }


    if (req.body.images !== '') {
        const image_id = category.images.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.images, {
            folder: 'categorys',
            width: 215,
            height:140,
            crop: "scale",
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

    let images = []
    if (typeof req.body.sliders === 'string') {
        images.push(req.body.sliders)
    } else {
        images = req.body.sliders
    }
    if (images !== undefined) {
        for (let i = 0; i < category.sliders.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(category.sliders[i].public_id)
        }
        let imagesLinks = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'sliders',
                allowedFormats: ['jpg', 'jpeg', 'png'],
            },(err) => {
                if(err){
                    return next(new ErrorHandler(err.message, err.http_code));
                }
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        newUserData.sliders = imagesLinks
    }

    categorys = await Category.findByIdAndUpdate(req.params.id, newUserData, 
        {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        categorys
    })

})

exports.deleteCategory = catchAsyncErrors ( async (req,res,next) => {
    const category = await Category.findById(req.params.id);
    if(!category){
        return next(new ErrorHandler('Category not found', 404))
    }
    const image_id = category.images.public_id;
    await cloudinary.v2.uploader.destroy(image_id);
    for(let i=0;i<category.sliders.length; i++){
        const result = await cloudinary.v2.uploader.destroy(category.sliders[i].public_id)
    }
    await category.remove();
    res.status(200).json({
        success: true,
        message: 'Category is deleted'
    })
})

exports.updateCategoryStatus = catchAsyncErrors(async (req, res, next) => {
    let categorys = await Category.findById(req.params.id);
    if (!categorys) {
        return next(new ErrorHandler('Category not found', 404));
    }
    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        category
    })

})

