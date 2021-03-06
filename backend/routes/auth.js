const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    logout,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser,
    addFavorite,
    removeFavorite,
    getFavorite,
    alladmin,
    updateAdmin,
    AddUser

} = require('../controllers/authController');


const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

router.route('/logout').get(logout);

router.route('/me').get(isAuthenticatedUser, getUserProfile)
router.route('/password/update').put(isAuthenticatedUser, updatePassword)
router.route('/me/update').put(isAuthenticatedUser, updateProfile)

router.route("/favorite").put(isAuthenticatedUser, authorizeRoles('user'), addFavorite);
router.route("/remove/favorite").put(isAuthenticatedUser, authorizeRoles('user'), removeFavorite);
router.route("/me/favorite").get(isAuthenticatedUser, authorizeRoles('user'), getFavorite);

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers)
router.route('/admin/add').post(isAuthenticatedUser, authorizeRoles('admin'), AddUser)
router.route('/admin/admins').get(isAuthenticatedUser, authorizeRoles('admin'), alladmin)
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)

module.exports = router;