const Product= require('../models/product')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const slugify=require('slugify');
const cloudinary = require('cloudinary');
const Category= require('../models/category');
const Brand= require('../models/brand');
exports.newProduct = catchAsyncErrors (async (req,res,next) => {
  
    if(!req.body.name){
        return next(new ErrorHandler('Name is required.',400))
    }
    else if(!req.body.price){
        return next(new ErrorHandler('Price is required.',400))
    }
    else if(!req.body.images){
        return next(new ErrorHandler('Image is required.',400))
    }
  else if(!req.body.description){
        return next(new ErrorHandler('Description is required.',400))
    }
   else if(!req.body.stock){
        return next(new ErrorHandler('Stock is required.',400))
    }
    else if(!req.body.seller){
        return next(new ErrorHandler('Seller is required.',400))
    }

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
    let imagesLinks = [];
    for (let i = 0; i < images.length; i++) { 
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products',
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
   
    req.body.images = imagesLinks
    req.body.slug = slugify(req.body.name);
    req.body.user = req.user.id;
    
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})


exports.getProducts = catchAsyncErrors ( async (req,res,next) => {
    const resPerPage = 8;
    const productsCount  = await Product.countDocuments();
    const apiFeatures = new APIFeatures(Product.find({'status':{$ne:false}}).populate('category').populate('brand'), req.query)
    .search()
    .filter()
    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

    apiFeatures.pagination(resPerPage)
    products = await apiFeatures.query;
    res.status(200).json({
        success:true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products,
    })
})

exports.getProductCategory = catchAsyncErrors ( async (req,res,next) => {
    const product = await Product.find({category: req.params.id,'status':{$ne:false}});
    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }
    const category = await Category.findById(req.params.id)
    if(!category){
        return next(new ErrorHandler('Category not found', 404))
    }
    res.status(200).json({
        success: true,
        category,
        productsByPrice :{
            under5k:product.filter(products => products.price <= 5000),
            under10k:product.filter(products => products.price > 5000 && products.price <= 10000)
        }
    })
})

exports.getProductBrand = catchAsyncErrors ( async (req,res,next) => {
    const product = await Product.find({brand: req.params.id,'status':{$ne:false}});
    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }
    const brand = await Brand.findById(req.params.id)
    if(!brand){
        return next(new ErrorHandler('Brand not found', 404))
    }
    res.status(200).json({
        success: true,
        brand,
        productsByPrice :{
            new_product:await Product.find({brand: req.params.id,'status':{$ne:false}}).sort([["createdAt","desc"]]),
            top_product:await Product.find({brand: req.params.id,'status':{$ne:false}}).sort([["sold","desc"]]),
        }
    })
})

exports.getSingleProduct = catchAsyncErrors ( async (req,res,next) => {
    
    const product = await Product.findOne({'_id':req.params.id,'status':{$ne:false}}).populate('category').populate('brand');
    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }
    const related_product= await Product.find({'category':product.category,'_id':{$ne:product._id},'status':{$ne:false}});
    res.status(200).json({
        success: true,
        product,
        related_product
    })
})
exports.gettopProduct = catchAsyncErrors( async (req,res,next) => {
   const {sort,order} = req.query
    const top_product= await Product.find({'status':{$ne:false}}).populate('category').populate('brand').sort([[sort,order]]);
    res.status(200).json({
        success: true,
        top_product
    })
})

exports.getAdminProducts = catchAsyncErrors(async (req,res,next) => {
    const products= await Product.find();
    res.status(200).json({
        success:true,
        products
    })
})

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    if(!req.body.name){
        return next(new ErrorHandler('Name is required.',400))
    }
    else if(!req.body.price){
        return next(new ErrorHandler('Price is required.',400))
    }
    else if(!req.body.description){
        return next(new ErrorHandler('Description is required.',400))
    }
     else if(!req.body.stock){
        return next(new ErrorHandler('Stock is required.',400))
    }
    else if(!req.body.seller){
        return next(new ErrorHandler('Seller is required.',400))
    }
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
    if (images !== undefined) {
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }
        let imagesLinks = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products',
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
        req.body.images = imagesLinks

    }
    req.body.slug = slugify(req.body.name);
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })

})

exports.deleteProduct = catchAsyncErrors ( async (req,res,next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }
    for(let i=0;i<product.images.length; i++){
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: 'Product is deleted'
    })
})

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    if(!comment){
        return next(new ErrorHandler('Comment must not be emapty',400))
    }
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        product.reviews.push(review);
        product.numofReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

})

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());
    const numOfReviews = reviews.length;
    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

exports.updateProductStatus = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })

})