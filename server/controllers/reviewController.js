const reviewService = require('../services/review.service');

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
const getReviews = async (req, res, next) => {
    try {
        const reviews = await reviewService.getAllReviews(req.query);
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
const getReviewById = async (req, res, next) => {
    try {
        const review = await reviewService.getReviewById(req.params.id);
        res.status(200).json(review);
    } catch (error) {
        if (error.message === 'Review not found') res.status(404);
        next(error);
    }
};

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res, next) => {
    try {
        req.body.user = req.user.id; // From protect middleware
        const review = await reviewService.createReview(req.body);
        res.status(201).json(review);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = async (req, res, next) => {
    try {
        const review = await reviewService.getReviewById(req.params.id);
        if (review.user && review.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized to update this review' });
        }
        const updatedReview = await reviewService.updateReview(req.params.id, req.body);
        res.status(200).json(updatedReview);
    } catch (error) {
        if (error.message === 'Review not found') res.status(404);
        next(error);
    }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res, next) => {
    try {
        const review = await reviewService.getReviewById(req.params.id);
        if (review.user && review.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized to delete this review' });
        }
        const result = await reviewService.deleteReview(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === 'Review not found') res.status(404);
        next(error);
    }
};

module.exports = {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
};
