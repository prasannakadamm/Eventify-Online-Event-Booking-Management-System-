const express = require('express');
const router = express.Router();
const {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getReviews)
    .post(protect, createReview);

router.route('/:id')
    .get(getReviewById)
    .put(protect, updateReview)
    .delete(protect, deleteReview);

module.exports = router;
