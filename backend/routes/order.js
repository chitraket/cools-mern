const express = require('express');
const router = express.Router();

const { newOrder, myOrders, getSingleOrder, allOrders, updateOrder, deleteOrder, updateUserOrder, alltotalOrders } = require('../controllers/orderController');
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth');

router.route('/order/new').post(isAuthenticatedUser,authorizeRoles('user'), newOrder);

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder)
        .put(isAuthenticatedUser,authorizeRoles('user'),updateUserOrder);
        
router.route('/orders/me').get(isAuthenticatedUser,authorizeRoles('user'), myOrders);

router.route('/admin/orders/').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders);
router.route('/admin/orderstotal').get(isAuthenticatedUser, authorizeRoles('admin'), alltotalOrders);
router.route('/admin/order/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);
module.exports= router;