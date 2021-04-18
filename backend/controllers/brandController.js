const Brand= require('../models/brand')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const slugify=require('slugify');
const cloudinary = require('cloudinary');

exports.newBrand = catchAsyncErrors(async (req,res,next) => {
    
    const { name , description } = req.body;
    const result = await cloudinary.v2.uploader.upload(req.body.images, {
        folder: 'brands',
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
            folder: 'sliders'
        });

        imagesLinks.push({
            public_id: results.public_id,
            url: results.secure_url
        })
    }
    const brand = await Brand.create({
        name,
        slug:slugify(name),
        description,
        sliders:imagesLinks,
        images :  {
        public_id: result.public_id,
        url: result.secure_url
    }
})
    
    res.status(201).json({
        success:true,
        brand
    })  
})

exports.getBrand = catchAsyncErrors( async (req,res,next) => {
    const brand= await Brand.find({'status':{$ne:false}});
    res.status(200).json({
        success: true,
        brand
    })
})

exports.adminBrand = catchAsyncErrors( async (req,res,next) => {
    const brand= await Brand.find();
    res.status(200).json({
        success: true,
        brand
    })
})

exports.getSingleBrand = catchAsyncErrors ( async (req,res,next) => {
    const brand = await Brand.findById(req.params.id);
    if(!brand){
        return next(new ErrorHandler('Brand not found', 404))
    }
    res.status(200).json({
        success: true,
        brand
    })
})

exports.updateBrand = catchAsyncErrors(async (req, res, next) => {
    let brand = await Brand.findById(req.params.id);
    if (!brand) {
        return next(new ErrorHandler('Brand not found', 404));
    }
    const newUserData = {
        name: req.body.name,
        slug: slugify(req.body.name),
        description: req.body.description
    }


    if (req.body.images !== '') {
        const image_id = category.images.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.images, {
            folder: 'brands',
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
        for (let i = 0; i < brand.sliders.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(brand.sliders[i].public_id)
        }
        let imagesLinks = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'sliders'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        newUserData.sliders = imagesLinks
    }

    brands = await Brand.findByIdAndUpdate(req.params.id, newUserData, 
        {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        brands
    })

})

exports.deleteBrand = catchAsyncErrors ( async (req,res,next) => {
    const brand = await Brand.findById(req.params.id);
    if(!brand){
        return next(new ErrorHandler('Brand not found', 404))
    }
    const image_id = brand.images.public_id;
    await cloudinary.v2.uploader.destroy(image_id);
    for(let i=0;i<brand.sliders.length; i++){
        const result = await cloudinary.v2.uploader.destroy(brand.sliders[i].public_id)
    }
    await brand.remove();
    res.status(200).json({
        success: true,
        message: 'Brand is deleted'
    })
})

exports.updateBrandStatus = catchAsyncErrors(async (req, res, next) => {
    let brands = await Brand.findById(req.params.id);
    if (!brands) {
        return next(new ErrorHandler('Brand not found', 404));
    }
    brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        brand
    })

})

