const express = require('express');
const router = express.Router();
const { newCategory, getCategory, adminCategory , getSingleCategory, updateCategory, deleteCategory, updateCategoryStatus } = require('../controllers/categoryController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/category/:id').get(getSingleCategory); 
router.route('/admin/category/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateCategory)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCategory);
router.route('/admin/category/new').post(isAuthenticatedUser,authorizeRoles('admin'), newCategory);
router.route('/admin/category').get(adminCategory);
router.route('/categorys').get(getCategory);
router.route('/admin/category/status/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateCategoryStatus);
module.exports = router;