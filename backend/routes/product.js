const express = require('express');
const router = express.Router();
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductReviews,deleteReview, gettopProduct, getAdminProducts, getProductCategory, getProductBrand, updateProductStatus } = require('../controllers/produtController');
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth');

router.route('/products').get(getProducts);
router.route('/admin/products').get(getAdminProducts)
router.route('/product/:id').get(getSingleProduct);
router.route('/product/category/:id').get(getProductCategory);
router.route('/product/brand/:id').get(getProductBrand);
router.route('/topproduct').get(gettopProduct);
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);
router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.route('/admin/product/status/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProductStatus);

router.route('/review').put(isAuthenticatedUser,authorizeRoles('user') ,createProductReview)
router.route('/reviews').get(isAuthenticatedUser, getProductReviews)
router.route('/reviews').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteReview)
module.exports = router;