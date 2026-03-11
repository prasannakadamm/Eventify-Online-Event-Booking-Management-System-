const wishlistService = require('../services/wishlist.service');

const getMyWishlist = async (req, res, next) => {
    try {
        const wishlist = await wishlistService.getMyWishlist(req.user.id);
        res.status(200).json(wishlist);
    } catch (error) { next(error); }
};

const addToWishlist = async (req, res, next) => {
    try {
        const item = await wishlistService.addToWishlist(req.user.id, req.body.eventId);
        res.status(201).json(item);
    } catch (error) { next(error); }
};

const removeFromWishlist = async (req, res, next) => {
    try {
        const result = await wishlistService.removeFromWishlist(req.user.id, req.params.eventId);
        res.status(200).json(result);
    } catch (error) { next(error); }
};

module.exports = { getMyWishlist, addToWishlist, removeFromWishlist };
