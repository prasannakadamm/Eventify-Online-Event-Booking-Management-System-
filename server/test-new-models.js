const mongoose = require('mongoose');
const Review = require('./models/Review');
const Notification = require('./models/Notification');
const Payment = require('./models/Payment');
const Category = require('./models/Category');
const Venue = require('./models/Venue');

async function testModels() {
    console.log('--- Testing New Models ---');

    try {
        // Test Review
        const review = new Review({
            user: new mongoose.Types.ObjectId(),
            event: new mongoose.Types.ObjectId(),
            rating: 5,
            comment: 'Amazing event!'
        });
        console.log('Review model created successfully.');

        // Test Notification
        const notification = new Notification({
            user: new mongoose.Types.ObjectId(),
            type: 'booking',
            message: 'Your booking is confirmed.'
        });
        console.log('Notification model created successfully.');

        // Test Payment
        const payment = new Payment({
            booking: new mongoose.Types.ObjectId(),
            user: new mongoose.Types.ObjectId(),
            amount: 500,
            paymentMethod: 'upi',
            transactionId: 'TXN123456789'
        });
        console.log('Payment model created successfully.');

        // Test Category
        const category = new Category({
            name: 'Music Festival',
            description: 'Live music performances.'
        });
        console.log('Category model created successfully.');

        // Test Venue
        const venue = new Venue({
            name: 'Grand Arena',
            address: '123 Main St',
            city: 'Mumbai',
            capacity: 1000,
            location: {
                type: 'Point',
                coordinates: [72.8777, 19.0760]
            }
        });
        console.log('Venue model created successfully.');

        console.log('--- All models verified successfully (instantiation only) ---');
    } catch (err) {
        console.error('Error verifying models:', err.message);
        process.exit(1);
    }
}

testModels();
