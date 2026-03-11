const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Avoid duplicate wishlist items for same user and event
wishlistSchema.index({ user: 1, event: 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);
