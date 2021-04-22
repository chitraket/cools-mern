const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const {isEmailValids, isPasswordValide} = require('../middlewares/validation')

const crypto = require('crypto');
const cloudinary = require('cloudinary');
const Product = require('../models/product');

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const users = await User.findOne({ email });
    const { isEmail , errors } = isEmailValids(email)
    const { isPassword, errors:passworderrors}  = isPasswordValide(password)
    if(!name){
        return next(new ErrorHandler('register.register_validation.name_required',400))
    }
    else if(!isEmail){
        return next(new ErrorHandler(errors,400))
    }
    else if(!isPassword){
        return next(new ErrorHandler(passworderrors,400))
    }
    if(users){
        return next(new ErrorHandler('register.register_validation.email_already_taken',400))
    }
    if(!req.body.avatar){
        return next(new ErrorHandler('register.register_validation.image_required',400))
    }
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: "scale",
        allowedFormats: ['jpg', 'jpeg', 'png'],
    },(err) => {
        if(err){
            return next(new ErrorHandler('register.register_validation.file_type_not', err.http_code));
        }
    })
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    sendToken(user, 200, res)

})


exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    const { isEmail , errors } = isEmailValids(email)
    const { isPassword, errors:passworderrors}  = isPasswordValide(password)
    if(!isEmail)
    {
        return next(new ErrorHandler(errors,400))
    }
    else if(!isPassword)
    {
        return next(new ErrorHandler(passworderrors,400))
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        return next(new ErrorHandler('login.login_validation.email_password_invalied', 401));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('login.login_validation.email_password_invalied', 401));
    }

    sendToken(user, 200, res)
})


exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });
    const { isEmail , errors } = isEmailValids(req.body.email)

    if(!isEmail)
    {
        return next(new ErrorHandler(errors,400))
    }
    if (!user) {
        return next(new ErrorHandler('forgot_password.forgot_password_validation.email_not_found', 404));
    }


    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });


    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {

        await sendEmail({
            email: user.email,
            subject: 'ShopIT Password Recovery',
            message
        })
        res.status(200).json({
            success: true,
            message: 'forgot_password.email_send_to'
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500))
    }

})


exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    const { isPassword, errors}  = isPasswordValide(req.body.password)
    const { isPassword:password, errors:passworderrors}  = isPasswordValide(req.body.confirmPassword)

    if(!isPassword){
        return next(new ErrorHandler(errors,400))
    }else if(!password){
        return next(new ErrorHandler(passworderrors,400))
    }
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {  
        return next(new ErrorHandler('reset_password.reset_password_validation.password_token', 400))
    }


    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('reset_password.reset_password_validation.password_match', 400))
    }

    
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)

})


exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})



exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
   
    const user = await User.findById(req.user.id).select('+password');   
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return next(new ErrorHandler('update_password.update_password_validation.old_password_incorrect'));
    }
    const { isPassword, errors}  = isPasswordValide(req.body.password)
    if(!isPassword){
        return next(new ErrorHandler(errors,400))
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res)

})



exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const { isEmail , errors } = isEmailValids(req.body.email)
    if(!req.body.name){
        return next(new ErrorHandler('update_profile.update_profile_validation.name_required',400))
    }
    else if(!isEmail){
        return next(new ErrorHandler(errors,400))
    }
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

   
    if (req.body.avatar !== '') {
        const user = await User.findById(req.user.id)
        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale",
            allowedFormats: ['jpg', 'jpeg', 'png'],
        },(err) => {
            if(err){
                return next(new ErrorHandler('register.register_validation.file_type_not', err.http_code));
            }
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})


exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
    })
})


exports.allUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})



exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})


exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

exports.addFavorite = catchAsyncErrors(async (req, res, next) => {
    const {productId} = req.body
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }
    const product = await Product.findById(productId);
    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }
    await User.findByIdAndUpdate(req.user._id,{
        $push:{favorite:productId}
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product,
        user
    })
})

exports.removeFavorite = catchAsyncErrors(async (req, res, next) => {
    const {productId} = req.body
    await User.findByIdAndUpdate(req.user._id,{
        $pull:{favorite:productId}
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true
    })
})
exports.getFavorite = catchAsyncErrors(async (req, res, next) => {
    const list = await User.findById(req.user._id)
    .populate("favorite")
    res.status(200).json({
        success: true,
        list
    })
})

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }
    const image_id = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(image_id);

    await user.remove();

    res.status(200).json({
        success: true,
    })
})