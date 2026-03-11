const Venue = require('../models/Venue');

const getAllVenues = async () => {
    return await Venue.find().sort({ name: 1 });
};

const getVenueById = async (id) => {
    const venue = await Venue.findById(id);
    if (!venue) {
        throw new Error('Venue not found');
    }
    return venue;
};

const createVenue = async (venueData) => {
    return await Venue.create(venueData);
};

const updateVenue = async (id, updateData) => {
    const venue = await Venue.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!venue) {
        throw new Error('Venue not found');
    }
    return venue;
};

const deleteVenue = async (id) => {
    const venue = await Venue.findById(id);
    if (!venue) {
        throw new Error('Venue not found');
    }
    await venue.deleteOne();
    return { id };
};

module.exports = {
    getAllVenues,
    getVenueById,
    createVenue,
    updateVenue,
    deleteVenue
};
