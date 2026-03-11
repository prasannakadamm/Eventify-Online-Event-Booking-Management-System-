const Notification = require('../models/Notification');

const getAllNotifications = async (filter = {}) => {
    return await Notification.find(filter).sort({ createdAt: -1 });
};

const getNotificationById = async (id) => {
    const notification = await Notification.findById(id);
    if (!notification) {
        throw new Error('Notification not found');
    }
    return notification;
};

const createNotification = async (notificationData) => {
    return await Notification.create(notificationData);
};

const markAsRead = async (id) => {
    const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    if (!notification) {
        throw new Error('Notification not found');
    }
    return notification;
};

const deleteNotification = async (id) => {
    const notification = await Notification.findById(id);
    if (!notification) {
        throw new Error('Notification not found');
    }
    await notification.deleteOne();
    return { id };
};

module.exports = {
    getAllNotifications,
    getNotificationById,
    createNotification,
    markAsRead,
    deleteNotification
};
