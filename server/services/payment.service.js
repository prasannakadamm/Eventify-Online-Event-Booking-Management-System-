const Payment = require('../models/Payment');

const getAllPayments = async (filter = {}) => {
    return await Payment.find(filter).populate('user', 'name email').populate('booking');
};

const getPaymentById = async (id) => {
    const payment = await Payment.findById(id).populate('user', 'name email').populate('booking');
    if (!payment) {
        throw new Error('Payment not found');
    }
    return payment;
};

const createPayment = async (paymentData) => {
    return await Payment.create(paymentData);
};

const updatePaymentStatus = async (id, status) => {
    const payment = await Payment.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
    if (!payment) {
        throw new Error('Payment not found');
    }
    return payment;
};

module.exports = {
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePaymentStatus
};
