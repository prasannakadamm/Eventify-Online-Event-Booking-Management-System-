const venueService = require('../services/venue.service');

// @desc    Get all venues
// @route   GET /api/venues
// @access  Public
const getVenues = async (req, res, next) => {
    try {
        const venues = await venueService.getAllVenues();
        res.status(200).json(venues);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single venue
// @route   GET /api/venues/:id
// @access  Public
const getVenueById = async (req, res, next) => {
    try {
        const venue = await venueService.getVenueById(req.params.id);
        res.status(200).json(venue);
    } catch (error) {
        next(error);
    }
};

// @desc    Create new venue
// @route   POST /api/venues
// @access  Private/Admin
const createVenue = async (req, res, next) => {
    try {
        const venue = await venueService.createVenue(req.body);
        res.status(201).json(venue);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

// @desc    Update venue
// @route   PUT /api/venues/:id
// @access  Private/Admin
const updateVenue = async (req, res, next) => {
    try {
        const updatedVenue = await venueService.updateVenue(req.params.id, req.body);
        res.status(200).json(updatedVenue);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete venue
// @route   DELETE /api/venues/:id
// @access  Private/Admin
const deleteVenue = async (req, res, next) => {
    try {
        const result = await venueService.deleteVenue(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getVenues,
    getVenueById,
    createVenue,
    updateVenue,
    deleteVenue
};
