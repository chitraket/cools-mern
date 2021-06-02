const Order = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;
    orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity, item.color)
        await sold(item.product)
    })
    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })
    res.status(200).json({
        success: true,
        order
    })
})
async function updateStock(id, quantity, color) {
    const product = await Product.findById(id);
    product.attribute && product.attribute
        .filter((p) => color && p.color && p.color.name === color)
        .map((item) => {
            item.qty = item.qty - quantity
        })
    await product.save({ validateBeforeSave: false })
}
async function sold(id) {
    const product = await Product.findById(id);
    product.sold = Number(product.sold) + 1;
    await product.save({ validateBeforeSave: false })
}
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))
    }
    res.status(200).json({
        success: true,
        order
    })

})

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })
    res.status(200).json({
        success: true,
        orders
    })
})

exports.allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find()
    res.status(200).json({
        success: true,
        orders
    })
})
exports.alltotalOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ 'orderStatus': { $ne: "Cancel" }, 'paymentInfo.status': { $ne: "padding" } })
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})
exports.allDatetotalOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find({
        'orderStatus': { $ne: "Cancel" }, 'paymentInfo.status': { $ne: "padding" },
        'paidAt': {
            "$gte": new Date(new Date(req.query.startdate).setHours(00, 00, 00)),
            "$lt": new Date(new Date(req.query.enddate).setHours(23, 59, 59))
        }
    })
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (order.orderStatus == 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }
    if (order.orderStatus == 'Cancel') {
        return next(new ErrorHandler('You have already Cancel this order', 400))
    }
    if (req.body.status == 'Cancel') {
        order.orderItems.forEach(async item => {
            await updateCancelStock(item.product, item.quantity)
        })
        order.cancelAt = Date.now();
    }
    if (req.body.status == 'Delivered') {
        if (order.paymentInfo.mode == "cash") {
            order.paymentInfo.status = "succeeded"
        }
        order.deliverdAt = Date.now();
    }
    order.orderStatus = req.body.status,
        await order.save()
    res.status(200).json({
        success: true,
    })
})

exports.updateUserOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (req.body.status == 'Cancel') {
        order.orderStatus = req.body.status,
            order.cancelAt = Date.now()
        order.orderItems.forEach(async item => {
            await updateCancelStock(item.product, item.quantity, item.color)
        })
        await order.save()
        res.status(200).json({
            success: true,
        })
    }
})
async function updateCancelStock(id, quantity, color) {
    const product = await Product.findById(id);
    product.attribute && product.attribute
        .filter((p) => color && p.color && p.color.name === color)
        .map((item) => {
            item.qty = Number(item.qty) + Number(quantity)
        })
    // product.stock = Number(product.stock) + Number(quantity);
    await product.save({ validateBeforeSave: false })
}

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))
    }
    await order.remove()
    res.status(200).json({
        success: true,
    })

})