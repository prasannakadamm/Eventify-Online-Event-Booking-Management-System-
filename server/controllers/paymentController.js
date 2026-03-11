const paymentService = require('../services/payment.service');

// @desc    Get all payments
// @route   GET /api/payments
// @access  Private/Admin
const getPayments = async (req, res, next) => {
    try {
        const payments = await paymentService.getAllPayments(req.query);
        res.status(200).json(payments);
    } catch (error) {
        next(error);
    }
};

// @desc    Get user's payments
// @route   GET /api/payments/my
// @access  Private
const getMyPayments = async (req, res, next) => {
    try {
        const payments = await paymentService.getAllPayments({ user: req.user.id });
        res.status(200).json(payments);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single payment
// @route   GET /api/payments/:id
// @access  Private
const getPaymentById = async (req, res, next) => {
    try {
        const payment = await paymentService.getPaymentById(req.params.id);
        if (payment.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }
        res.status(200).json(payment);
    } catch (error) {
        next(error);
    }
};

// @desc    Create new payment record
// @route   POST /api/payments
// @access  Private
const createPayment = async (req, res, next) => {
    try {
        req.body.user = req.user.id;
        const payment = await paymentService.createPayment(req.body);
        res.status(201).json(payment);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

// @desc    Update payment status
// @route   PUT /api/payments/:id/status
// @access  Private/Admin
const updatePaymentStatus = async (req, res, next) => {
    try {
        const payment = await paymentService.updatePaymentStatus(req.params.id, req.body.status);
        res.status(200).json(payment);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPayments,
    getMyPayments,
    getPaymentById,
    createPayment,
    updatePaymentStatus
};
