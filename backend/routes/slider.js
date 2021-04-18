const express = require('express');
const { getSlider, getAdminSlider, getSingleSlider, newSlider, updateSlider, deleteSlider, updateSliderStatus } = require('../controllers/sliderController');
const router = express.Router();
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth');

router.route('/sliders').get(getSlider);
router.route('/admin/slider').get(getAdminSlider)
router.route('/slider/:id').get(getSingleSlider);

router.route('/admin/slider/new').post(isAuthenticatedUser, authorizeRoles('admin'), newSlider);
router.route('/admin/slider/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateSlider)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteSlider);
router.route('/admin/slider/status/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateSliderStatus);
  
module.exports = router;