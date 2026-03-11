const Review = require('../models/Review');

const getAllReviews = async (filter = {}) => {
    return await Review.find(filter).populate('user', 'name').populate('event', 'title');
};

const getReviewById = async (id) => {
    const review = await Review.findById(id).populate('user', 'name').populate('event', 'title');
    if (!review) {
        throw new Error('Review not found');
    }
    return review;
};

const createReview = async (reviewData) => {
    const review = await Review.create(reviewData);
    return review;
};

const updateReview = async (id, updateData) => {
    const review = await Review.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });
    if (!review) {
        throw new Error('Review not found');
    }
    return review;
};

const deleteReview = async (id) => {
    const review = await Review.findById(id);
    if (!review) {
        throw new Error('Review not found');
    }
    await review.deleteOne();
    return { id };
};

module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
};
