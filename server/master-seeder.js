const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Models
const User = require('./models/User');
const Event = require('./models/Event');
const Booking = require('./models/Booking');
const Review = require('./models/Review');
const Notification = require('./models/Notification');
const Payment = require('./models/Payment');
const Category = require('./models/Category');
const Venue = require('./models/Venue');
const Wishlist = require('./models/Wishlist');
const Coupon = require('./models/Coupon');
const SupportTicket = require('./models/SupportTicket');
const AuditLog = require('./models/AuditLog');
const Setting = require('./models/Setting');

dotenv.config({ path: path.join(__dirname, '.env') });

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // 1. Get a reference User and Event (or create if none exist)
        let user = await User.findOne();
        if (!user) {
            console.log('No user found, creating a dummy user...');
            user = await User.create({
                name: 'Seed User',
                email: 'seed@example.com',
                password: 'password123',
                role: 'admin'
            });
        }

        let event = await Event.findOne();
        if (!event) {
            console.log('No event found, creating a dummy event...');
            event = await Event.create({
                title: 'Seed Event',
                description: 'A sample event for seeding.',
                category: 'Concerts',
                date: new Date(Date.now() + 86400000),
                venue: 'Seed Venue',
                showTime: '18:00',
                ticketCategories: [{ name: 'General', price: 100, totalSeats: 50 }]
            });
        }

        let booking = await Booking.findOne();
        if (!booking) {
            console.log('No booking found, creating a dummy booking...');
            booking = await Booking.create({
                user: user._id,
                event: event._id,
                seatsBooked: 1,
                seatNumbers: ['S1'],
                totalAmount: 100
            });
        }

        console.log('Seeding new collections...');

        // Batch 1 Collections
        await Category.findOneAndUpdate({ name: 'Movies' }, { name: 'Movies', description: 'Cinema and film screenings.', icon: 'movie' }, { upsert: true });
        await Venue.findOneAndUpdate({ name: 'Grand Arena' }, { name: 'Grand Arena', address: '123 Stadium Way', city: 'Mumbai', capacity: 5000 }, { upsert: true });

        await Review.findOneAndUpdate(
            { user: user._id, event: event._id },
            { user: user._id, event: event._id, rating: 5, comment: 'Excellent seeding!' },
            { upsert: true }
        );

        await Notification.create({
            user: user._id,
            type: 'update',
            message: 'System initialization complete.'
        });

        await Payment.findOneAndUpdate(
            { transactionId: 'SEED_TXN_001' },
            { booking: booking._id, user: user._id, amount: 100, paymentMethod: 'upi', transactionId: 'SEED_TXN_001', status: 'completed' },
            { upsert: true }
        );

        // Batch 2 Collections
        await Wishlist.findOneAndUpdate(
            { user: user._id, event: event._id },
            { user: user._id, event: event._id },
            { upsert: true }
        );

        await Coupon.findOneAndUpdate(
            { code: 'WELCOME50' },
            { code: 'WELCOME50', discountType: 'percentage', discountValue: 50, expiryDate: new Date(Date.now() + 30 * 86400000) },
            { upsert: true }
        );

        await SupportTicket.create({
            user: user._id,
            subject: 'System Setup',
            description: 'Checking if support tickets are working.',
            status: 'resolved'
        });

        await AuditLog.create({
            user: user._id,
            action: 'SYSTEM_SEED',
            module: 'Admin',
            details: { message: 'Database seeded with sample data' }
        });

        await Setting.findOneAndUpdate(
            { key: 'site_name' },
            { key: 'site_name', value: 'Eventify Pro', description: 'The name of the application' },
            { upsert: true }
        );

        console.log('All 10 new collections seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
