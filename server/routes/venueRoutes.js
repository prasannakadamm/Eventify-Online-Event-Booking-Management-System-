const express = require('express');
const router = express.Router();
const {
    getVenues,
    getVenueById,
    createVenue,
    updateVenue,
    deleteVenue
} = require('../controllers/venueController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getVenues)
    .post(protect, admin, createVenue);

router.route('/:id')
    .get(getVenueById)
    .put(protect, admin, updateVenue)
    .delete(protect, admin, deleteVenue);

module.exports = router;
