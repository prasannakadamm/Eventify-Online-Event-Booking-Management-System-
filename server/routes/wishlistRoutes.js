const express = require('express');
const router = express.Router();
const { getMyWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.route('/').get(getMyWishlist).post(addToWishlist);
router.route('/:eventId').delete(removeFromWishlist);

module.exports = router;
