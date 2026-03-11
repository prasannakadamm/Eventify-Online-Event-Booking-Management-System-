const express = require('express');
const router = express.Router();
const {
    getPayments,
    getMyPayments,
    getPaymentById,
    createPayment,
    updatePaymentStatus
} = require('../controllers/paymentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
    .get(admin, getPayments)
    .post(createPayment);

router.route('/my').get(getMyPayments);

router.route('/:id')
    .get(getPaymentById);

router.route('/:id/status')
    .put(admin, updatePaymentStatus);

module.exports = router;
