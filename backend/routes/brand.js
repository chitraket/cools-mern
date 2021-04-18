const express = require('express');
const { getSingleBrand, updateBrand, deleteBrand, newBrand, adminBrand, getBrand, updateBrandStatus } = require('../controllers/brandController');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/brand/:id').get(getSingleBrand); 
router.route('/admin/brand/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateBrand)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteBrand);
router.route('/admin/brand/new').post(isAuthenticatedUser,authorizeRoles('admin'), newBrand);
router.route('/admin/brand').get(adminBrand);
router.route('/brands').get(getBrand);
router.route('/admin/brand/status/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateBrandStatus);
module.exports = router;