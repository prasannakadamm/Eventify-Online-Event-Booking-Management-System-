const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.ObjectId,
        ref: 'Booking',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'Please add an amount']
    },
    paymentMethod: {
        type: String,
        required: [true, 'Please add a payment method'],
        enum: ['credit_card', 'debit_card', 'upi', 'net_banking', 'wallet'],
        default: 'credit_card'
    },
    transactionId: {
        type: String,
        required: [true, 'Please add a transaction ID'],
        unique: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Payment', paymentSchema);
