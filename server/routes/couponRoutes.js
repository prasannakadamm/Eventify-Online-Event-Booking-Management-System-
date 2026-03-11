const express = require('express');
const router = express.Router();
const { getCoupons, checkCoupon, createCoupon, deleteCoupon } = require('../controllers/couponController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getCoupons).post(protect, admin, createCoupon);
router.route('/:code').get(protect, checkCoupon);
router.route('/:id').delete(protect, admin, deleteCoupon);

module.exports = router;
