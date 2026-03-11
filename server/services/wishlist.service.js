const Wishlist = require('../models/Wishlist');

const getMyWishlist = async (userId) => {
    return await Wishlist.find({ user: userId }).populate('event');
};

const addToWishlist = async (userId, eventId) => {
    return await Wishlist.create({ user: userId, event: eventId });
};

const removeFromWishlist = async (userId, eventId) => {
    const item = await Wishlist.findOneAndDelete({ user: userId, event: eventId });
    if (!item) throw new Error('Item not found in wishlist');
    return { success: true };
};

module.exports = { getMyWishlist, addToWishlist, removeFromWishlist };
